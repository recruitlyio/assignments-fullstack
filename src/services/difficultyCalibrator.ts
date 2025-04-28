import { ExperienceLevel, DifficultyLevel } from '../types';

// Calculate the appropriate difficulty level based on experience and position in the question set
export const calculateDifficultyLevel = (
  experienceLevel: ExperienceLevel,
  questionIndex: number
): DifficultyLevel => {
  // Base difficulty mapping - ensure each experience level gets a mix of difficulties
  const experienceToDifficultyMap: Record<string, DifficultyLevel[]> = {
    'junior': ['easy', 'easy', 'medium', 'medium', 'hard'],
    'mid': ['easy', 'medium', 'medium', 'hard', 'hard'],
    'senior': ['medium', 'hard', 'hard', 'expert', 'expert'],
    'lead': ['medium', 'hard', 'expert', 'expert', 'expert'],
  };

  const difficultyOptions = experienceToDifficultyMap[experienceLevel.id] || ['easy', 'medium', 'hard', 'expert'];
  
  // Normalize the index to ensure we don't go out of bounds
  const normalizedIndex = Math.min(questionIndex, difficultyOptions.length - 1);
  return difficultyOptions[normalizedIndex] as DifficultyLevel;
};

// Calculate the score range for a given experience level and difficulty
export const calculateScoreRange = (
  experienceLevel: ExperienceLevel,
  difficultyLevel: DifficultyLevel
): { min: number; max: number } => {
  // Base score ranges (out of 100)
  const baseRanges: Record<DifficultyLevel, { min: number; max: number }> = {
    easy: { min: 70, max: 100 },
    medium: { min: 60, max: 90 },
    hard: { min: 50, max: 85 },
    expert: { min: 40, max: 80 },
  };
  
  // Adjust based on experience level
  const experienceModifier: Record<string, number> = {
    'junior': -10,
    'mid': 0,
    'senior': 10,
    'lead': 15,
  };
  
  const modifier = experienceModifier[experienceLevel.id] || 0;
  const range = baseRanges[difficultyLevel];
  
  return {
    min: Math.max(Math.min(range.min + modifier, 100), 0),
    max: Math.max(Math.min(range.max + modifier, 100), 0),
  };
};