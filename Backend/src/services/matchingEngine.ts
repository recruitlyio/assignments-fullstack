import { Candidate, Job, MatchResult, TransferableSkill, CandidateSkill } from '../types';
import { SkillExtractor } from './skillExtractor';
import { generateContent } from './ai.service';

export class MatchingEngine {
  private readonly FALLBACK_SCORE = 0.5; // Default score when LLM fails
  private skillExtractor: SkillExtractor;

  constructor() {
    this.skillExtractor = new SkillExtractor();
  }

  private async calculateSkillMatchScore(candidate: Candidate, job: Job): Promise<number> {
    try {
      const prompt = `
        Analyze the match between this candidate and job:
        Candidate Skills: ${JSON.stringify(candidate.skills)}
        Job Requirements: ${JSON.stringify(job.requirements)}
        
        Consider:
        1. Skill overlap
        2. Experience level
        3. Skill importance
        
        Return a score between 0 and 1.
      `;

      const response = await generateContent(prompt);
      const score = parseFloat(response);
      
      return isNaN(score) ? this.FALLBACK_SCORE : Math.min(Math.max(score, 0), 1);
    } catch (error) {
      console.error('Error calculating skill match score:', error);
      return this.FALLBACK_SCORE;
    }
  }

  private async analyzeTransferableSkills(candidate: Candidate, job: Job): Promise<TransferableSkill[]> {
    try {
      const prompt = `
        Analyze how these candidate skills could transfer to the job requirements.
        For each candidate skill that doesn't exactly match a job requirement,
        explain how it could be valuable for the role.
        
        Candidate Skills: ${JSON.stringify(candidate.skills)}
        Job Requirements: ${JSON.stringify(job.requirements)}
        
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
      const score = await this.calculateSkillMatchScore(candidate, job);
      const transferableSkills = await this.analyzeTransferableSkills(candidate, job);
      const explanation = await this.generateMatchExplanation(candidate, job, score);

      const matches = candidate.skills.filter(skill => 
        job.requirements.some(req => req.skill === skill.name)
      );

      const missingSkills = job.requirements
        .filter(req => !candidate.skills.some(skill => skill.name === req.skill))
        .map(req => req.skill);

      return {
        candidateId: candidate.id,
        jobId: job.id,
        score,
        matches: matches.map(skill => skill.name),
        missingSkills,
        transferableSkills,
        explanation
      };
    } catch (error) {
      console.error('Error in matchCandidateToJob:', error);
      return {
        candidateId: candidate.id,
        jobId: job.id,
        score: this.FALLBACK_SCORE,
        matches: [],
        missingSkills: job.requirements.map(req => req.skill),
        transferableSkills: this.getBasicTransferableSkills(candidate, job),
        explanation: 'Error occurred during matching process'
      };
    }
  }
} 