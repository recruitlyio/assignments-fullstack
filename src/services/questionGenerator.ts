import { v4 as uuidv4 } from 'uuid';
import { Question, JobRequirements, ExperienceLevel, SkillArea, DifficultyLevel } from '../types';
import { questionTemplates } from './questionTemplates';
import { evaluationCriteriaGenerator } from './evaluationCriteriaGenerator';
import { calculateDifficultyLevel } from './difficultyCalibrator';
import { generateQuestionWithLLM } from './llmService';

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a single question
const generateSingleQuestion = async (
  skillArea: SkillArea,
  experienceLevel: ExperienceLevel,
  jobRequirements: JobRequirements,
  index: number,
  usedTemplates: Set<string>
): Promise<Question | null> => {
  const difficultyLevel = calculateDifficultyLevel(experienceLevel, index);
  
  try {
    // First attempt to generate a question using LLM
    const llmQuestion = await generateQuestionWithLLM({
      skillArea,
      difficultyLevel,
      experienceLevel,
      jobContext: jobRequirements.description
    });

    const criteria = evaluationCriteriaGenerator(skillArea, difficultyLevel, experienceLevel);
    
    return createQuestion(llmQuestion, skillArea, difficultyLevel, experienceLevel);
  } catch (error) {
    console.error('Error generating question with LLM, falling back to templates:', error);
    
    // Fallback to templates if LLM fails
    const templates = questionTemplates[skillArea.id];
    if (!templates || templates.length === 0) {
      return null;
    }
    
    const availableTemplates = templates.filter(t => 
      t.difficultyLevel === difficultyLevel && !usedTemplates.has(t.title)
    );
    
    if (availableTemplates.length === 0) {
      return null;
    }
    
    const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
    usedTemplates.add(template.title);
    
    return createQuestion(template, skillArea, difficultyLevel, experienceLevel);
  }
};

// Helper function to create a question object
const createQuestion = (
  template: { title: string; description: string; sampleAnswer?: string },
  skillArea: SkillArea,
  difficultyLevel: DifficultyLevel,
  experienceLevel: ExperienceLevel
): Question => {
  const criteria = evaluationCriteriaGenerator(skillArea, difficultyLevel, experienceLevel);
  
  const timeEstimates = {
    easy: '5-10',
    medium: '10-15',
    hard: '15-25',
    expert: '25-40'
  };

  return {
    id: uuidv4(),
    title: template.title,
    description: template.description,
    skillArea,
    difficultyLevel,
    evaluationCriteria: criteria,
    timeEstimate: `${timeEstimates[difficultyLevel]} minutes`,
    sampleAnswer: template.sampleAnswer
  };
};

// Main question generation function
export const generateQuestions = async (
  jobRequirements: JobRequirements,
  experienceLevel: ExperienceLevel
): Promise<Question[]> => {
  const questions: Question[] = [];
  const usedTemplates = new Set<string>();
  
  const totalSkills = jobRequirements.selectedSkills.length;
  const questionsPerSkill = Math.max(2, Math.min(3, Math.floor(10 / totalSkills)));
  
  // Generate questions for each skill area
  for (const skillArea of jobRequirements.selectedSkills) {
    let questionsForSkill = 0;
    let attempts = 0;
    const maxAttempts = questionsPerSkill * 2;
    
    while (questionsForSkill < questionsPerSkill && attempts < maxAttempts) {
      const question = await generateSingleQuestion(
        skillArea,
        experienceLevel,
        jobRequirements,
        questionsForSkill,
        usedTemplates
      );
      
      if (question) {
        questions.push(question);
        questionsForSkill++;
      }
      attempts++;
    }
  }
  
  return shuffleArray(questions).slice(0, 10);
};