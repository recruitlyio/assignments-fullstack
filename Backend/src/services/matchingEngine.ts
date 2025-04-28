import { Candidate, Job, MatchResult, TransferableSkill, CandidateSkill } from '../types/index';
import { generateContent } from './ai.service';
import { KnowledgeModel } from './knowledgeModel';

export class MatchingEngine {
  private readonly FALLBACK_SCORE = 0.5; // Default score when LLM fails
  private knowledgeModel: KnowledgeModel;

  constructor() {
    this.knowledgeModel = KnowledgeModel.getInstance();
  }

  private normalizeSkills(skills: CandidateSkill[]): CandidateSkill[] {
    return skills.map(skill => ({
      ...skill,
      name: this.knowledgeModel.normalizeSkill(skill.name)
    }));
  }

  private normalizeJobRequirements(job: Job): Job {
    return {
      ...job,
      requirements: job.requirements.map(req => ({
        ...req,
        skill: this.knowledgeModel.normalizeSkill(req.skill)
      }))
    };
  }

  private calculateBasicScore(candidate: Candidate, job: Job): number {
    const requiredSkills = job.requirements.filter(req => req.required);
    const matchingSkills = candidate.skills.filter(skill => 
      requiredSkills.some(req => req.skill === skill.name && skill.years >= req.minYears)
    );
    
    return matchingSkills.length / requiredSkills.length;
  }

  private async calculateSkillMatchScore(candidate: Candidate, job: Job): Promise<number> {
    try {
      // Normalize skills before matching
      const normalizedCandidate = {
        ...candidate,
        skills: this.normalizeSkills(candidate.skills)
      };
      const normalizedJob = this.normalizeJobRequirements(job);

      // Calculate basic score first
      const basicScore = this.calculateBasicScore(normalizedCandidate, normalizedJob);
      
      // If basic score is 0, no need to call LLM
      if (basicScore === 0) {
        return 0;
      }

      const prompt = `
        Analyze the match between this candidate and job:
        Candidate Skills: ${JSON.stringify(normalizedCandidate.skills)}
        Job Requirements: ${JSON.stringify(normalizedJob.requirements)}
        
        Consider:
        1. Skill overlap
        2. Experience level
        3. Skill importance
        
        Return a score between 0 and 1.
      `;

      console.log('Calculating match score for:', {
        candidate: normalizedCandidate.name,
        job: normalizedJob.title,
        basicScore
      });

      const response = await generateContent(prompt);
      console.log('LLM Score Response:', response);
      
      const llmScore = parseFloat(response);
      
      if (isNaN(llmScore)) {
        console.error('Invalid score from LLM:', response);
        return basicScore; // Return basic score if LLM fails
      }

      // Combine basic score and LLM score with weights
      const finalScore = (basicScore * 0.6) + (llmScore * 0.4);
      
      // Update skill usage in knowledge model
      normalizedCandidate.skills.forEach(skill => {
        this.knowledgeModel.updateSkillUsage(skill.name, finalScore > 0.5);
      });
      
      return Math.min(Math.max(finalScore, 0), 1);
    } catch (error) {
      console.error('Error calculating skill match score:', error);
      // Return basic score if LLM fails
      return this.calculateBasicScore(candidate, job);
    }
  }

  private async analyzeTransferableSkills(candidate: Candidate, job: Job): Promise<TransferableSkill[]> {
    try {
      // Normalize skills before analysis
      const normalizedCandidate = {
        ...candidate,
        skills: this.normalizeSkills(candidate.skills)
      };
      const normalizedJob = this.normalizeJobRequirements(job);

      // Get related skills from knowledge model
      const relatedSkills = normalizedCandidate.skills
        .filter(skill => !normalizedJob.requirements.some(req => req.skill === skill.name))
        .flatMap(skill => this.knowledgeModel.getRelatedSkills(skill.name))
        .filter((skill, index, array) => array.indexOf(skill) === index); // Remove duplicates

      const prompt = `
        Analyze how these candidate skills could transfer to the job requirements.
        For each candidate skill that doesn't exactly match a job requirement,
        explain how it could be valuable for the role.
        
        Candidate Skills: ${JSON.stringify(normalizedCandidate.skills)}
        Job Requirements: ${JSON.stringify(normalizedJob.requirements)}
        Related Skills: ${JSON.stringify(relatedSkills)}
        
        Return a list of skills with their transfer potential and explanation.
        Format each skill as: "SKILL_NAME | POTENTIAL_SCORE | EXPLANATION"
        Example: "Python | 0.8 | Python experience can help with backend development and automation tasks"
      `;

      const response = await generateContent(prompt);
      return this.parseTransferableSkills(response);
    } catch (error) {
      console.error('Error analyzing transferable skills:', error);
      return this.getBasicTransferableSkills(candidate, job);
    }
  }

  private parseTransferableSkills(response: string): TransferableSkill[] {
    const lines = response.split('\n');
    return lines
      .map(line => {
        const parts = line.split('|').map(part => part.trim());
        if (parts.length === 3) {
          const potential = parseFloat(parts[1]);
          if (!isNaN(potential)) {
            return {
              skill: parts[0],
              potential: Math.min(Math.max(potential, 0), 1),
              explanation: parts[2]
            };
          }
        }
        return null;
      })
      .filter((skill): skill is TransferableSkill => skill !== null);
  }

  private getBasicTransferableSkills(candidate: Candidate, job: Job): TransferableSkill[] {
    return candidate.skills
      .filter(skill => !job.requirements.some(req => req.skill === skill.name))
      .map(skill => ({
        skill: skill.name,
        potential: 0.5,
        explanation: `Basic transfer potential for ${skill.name} based on ${skill.years} years of experience`
      }));
  }

  private async generateMatchExplanation(candidate: Candidate, job: Job, score: number): Promise<string> {
    try {
      const prompt = `
        Provide a detailed analysis of this candidate-job match:
        Candidate: ${JSON.stringify(candidate)}
        Job: ${JSON.stringify(job)}
        Match Score: ${score}
        
        Include:
        1. Strengths
        2. Areas for growth
        3. Specific recommendations
      `;

      return await generateContent(prompt);
    } catch (error) {
      console.error('Error generating match explanation:', error);
      return this.getBasicMatchExplanation(candidate, job, score);
    }
  }

  private getBasicMatchExplanation(candidate: Candidate, job: Job, score: number): string {
    const matches = candidate.skills.filter(skill => 
      job.requirements.some(req => req.skill === skill.name)
    );
    const missing = job.requirements.filter(req => 
      !candidate.skills.some(skill => skill.name === req.skill)
    );

    return `
      Basic Match Analysis:
      - Score: ${score}
      - Matching Skills: ${matches.map(s => s.name).join(', ')}
      - Missing Skills: ${missing.map(r => r.skill).join(', ')}
    `;
  }

  public async matchCandidateToJob(candidate: Candidate, job: Job): Promise<MatchResult> {
    try {
      // Normalize skills before matching
      const normalizedCandidate = {
        ...candidate,
        skills: this.normalizeSkills(candidate.skills)
      };
      const normalizedJob = this.normalizeJobRequirements(job);

      console.log('Starting match process for:', {
        candidate: normalizedCandidate.name,
        job: normalizedJob.title
      });

      const score = await this.calculateSkillMatchScore(normalizedCandidate, normalizedJob);
      const transferableSkills = await this.analyzeTransferableSkills(normalizedCandidate, normalizedJob);
      const explanation = await this.generateMatchExplanation(normalizedCandidate, normalizedJob, score);

      const matches = normalizedCandidate.skills.filter(skill => 
        normalizedJob.requirements.some(req => req.skill === skill.name)
      );

      const missingSkills = normalizedJob.requirements
        .filter(req => !normalizedCandidate.skills.some(skill => skill.name === req.skill))
        .map(req => req.skill);

      // Evolve knowledge model periodically
      if (Math.random() < 0.1) { // 10% chance to evolve on each match
        this.knowledgeModel.evolveKnowledgeGraph();
      }

      const result = {
        candidateId: candidate.id,
        jobId: job.id,
        score,
        matches: matches.map(skill => skill.name),
        missingSkills,
        transferableSkills,
        explanation
      };

      console.log('Match result:', result);
      return result;
    } catch (error) {
      console.error('Error in matchCandidateToJob:', error);
      return {
        candidateId: candidate.id,
        jobId: job.id,
        score: this.calculateBasicScore(candidate, job), // Use basic score on error
        matches: [],
        missingSkills: job.requirements.map(req => req.skill),
        transferableSkills: this.getBasicTransferableSkills(candidate, job),
        explanation: 'Error occurred during matching process'
      };
    }
  }
} 