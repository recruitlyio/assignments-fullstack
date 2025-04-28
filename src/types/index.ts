export type SkillArea = {
  id: string;
  name: string;
  description: string;
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type ExperienceLevel = {
  id: string;
  name: string;
  yearsOfExperience: string;
  description: string;
};

export type EvaluationCriteria = {
  id: string;
  description: string;
  passingCriteria: string;
  excellentCriteria: string;
};

export type Question = {
  id: string;
  title: string;
  description: string;
  skillArea: SkillArea;
  difficultyLevel: DifficultyLevel;
  evaluationCriteria: EvaluationCriteria[];
  sampleAnswer?: string;
  timeEstimate: string;
};

export type JobRequirements = {
  title: string;
  description: string;
  selectedSkills: SkillArea[];
  additionalNotes?: string;
};