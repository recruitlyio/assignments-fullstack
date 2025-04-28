import { v4 as uuidv4 } from 'uuid';
import { SkillArea, DifficultyLevel, ExperienceLevel, EvaluationCriteria } from '../types';

// Generate evaluation criteria based on skill area and difficulty
export const evaluationCriteriaGenerator = (
  skillArea: SkillArea,
  difficultyLevel: DifficultyLevel,
  experienceLevel: ExperienceLevel
): EvaluationCriteria[] => {
  const criteria: EvaluationCriteria[] = [];
  
  // Common criteria for code quality
  const codeQualityCriteria: EvaluationCriteria = {
    id: uuidv4(),
    description: 'Code Quality and Readability',
    passingCriteria: 'Code is structured logically, follows basic conventions, and includes some documentation.',
    excellentCriteria: 'Code is highly readable, follows best practices, uses meaningful variable names, and is well-documented with clear comments.',
  };
  
  // Problem-solving criteria
  const problemSolvingCriteria: EvaluationCriteria = {
    id: uuidv4(),
    description: 'Problem-Solving Approach',
    passingCriteria: 'Candidate demonstrates understanding of the problem and applies a working solution.',
    excellentCriteria: 'Candidate breaks down the problem effectively, considers multiple approaches, and implements an optimal solution.',
  };
  
  // Technical knowledge criteria based on skill area
  const technicalKnowledgeCriteria: EvaluationCriteria = {
    id: uuidv4(),
    description: `${skillArea.name} Knowledge`,
    passingCriteria: `Demonstrates basic understanding of ${skillArea.name} concepts required for the solution.`,
    excellentCriteria: `Shows deep understanding of ${skillArea.name}, including advanced patterns, edge cases, and best practices.`,
  };
  
  // Add general criteria
  criteria.push(codeQualityCriteria);
  criteria.push(problemSolvingCriteria);
  criteria.push(technicalKnowledgeCriteria);
  
  // Add difficulty-specific criteria
  if (difficultyLevel === 'hard' || difficultyLevel === 'expert') {
    criteria.push({
      id: uuidv4(),
      description: 'Optimization and Performance',
      passingCriteria: 'Solution functions correctly with acceptable performance for typical inputs.',
      excellentCriteria: 'Solution is optimized for both time and space complexity, with considerations for edge cases and scalability.',
    });
  }
  
  // Add senior/lead level criteria
  if (experienceLevel.id === 'senior' || experienceLevel.id === 'lead') {
    criteria.push({
      id: uuidv4(),
      description: 'System Design Considerations',
      passingCriteria: 'Demonstrates awareness of how the solution fits into a larger system.',
      excellentCriteria: 'Articulates design decisions, trade-offs, and how the solution would scale or evolve in a production environment.',
    });
  }
  
  return criteria;
};