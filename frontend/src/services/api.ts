import axios, { AxiosError } from 'axios';

const API_BASE_URL =  'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data?.message || 'An error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('An error occurred while setting up the request.');
    }
  }
);

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

export interface QuestionFeedback {
  questionId: string;
  relevanceScore: number; // 1-10
  difficultyPerception: QuestionDifficulty;
  comments?: string;
  candidatePerformance?: number; // 1-10
}

export const questionService = {
  generateQuestions: async (data: QuestionGenerationParams) => {
    const response = await api.post('/questions/generate', data);
    return response.data.data;
  },

  generateJobSpecificQuestions: async (data: JobMatchQuestionRequest) => {
    const response = await api.post('/questions/generate-job-match', data);
    return response.data.data;
  },

  getQuestionById: async (id: string) => {
    const response = await api.get(`/questions/${id}`);
    return response.data.data;
  },

  getAllQuestions: async () => {
    const response = await api.get('/questions');
    return response.data.data;
  },

  searchQuestions: async (criteria: QuestionGenerationParams) => {
    const response = await api.post('/questions/search', criteria);
    return response.data.data;
  },

  submitFeedback: async (
    questionId: string,
    feedback: Omit<QuestionFeedback, 'questionId'>
  ) => {
    const response = await api.post('/questions/feedback', {
      questionId,
      ...feedback,
    });
    return response.data.data;
  },


};
