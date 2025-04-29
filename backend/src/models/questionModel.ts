export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export enum QuestionCategory {
  ALGORITHMS = 'algorithms',
  DATA_STRUCTURES = 'data_structures',
  SYSTEM_DESIGN = 'system_design',
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DATABASE = 'database',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  NODE_JS = 'node_js',
  REACT = 'react',
  SECURITY = 'security',
  TESTING = 'testing',
  DEVOPS = 'devops',
}

export enum SeniorityLevel {
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  STAFF = 'staff',
  PRINCIPAL = 'principal',
}

export interface CandidateProfile {
  yearsOfExperience: number;
  skills: string[];
  experienceDescription: string;
}

export interface JobRequirements {
  requiredSkills: string[];
  minimumYearsExperience: number;
  jobDescription: string;
  preferredQualifications?: string[];
}

export interface JobMatchQuestionRequest {
  candidateProfile: CandidateProfile;
  jobRequirements: JobRequirements;
  difficulty: QuestionDifficulty;
  count?: number;
}

export interface Question {
  id: string;
  content: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory[];
  seniorityLevel: SeniorityLevel[];
  expectedAnswer?: string;
  hints?: string[];
  evaluationCriteria?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  feedbackScore: number;
  calibrationScore: number;
}

export interface QuestionGenerationParams {
  categories?: QuestionCategory[];
  seniorityLevel?: SeniorityLevel;
  difficulty?: QuestionDifficulty;
  keywords?: string[];
  count?: number;
  excludeIds?: string[];
  searchTerm?: string;
}

export interface QuestionFeedback {
  questionId: string;
  relevanceScore: number; // 1-10
  difficultyPerception: QuestionDifficulty;
  comments?: string;
  candidatePerformance?: number; // 1-10
}
