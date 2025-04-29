// src/types/index.ts

export interface GeminiChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface CandidateProfile {
  name?: string;
  email?: string;
  yearsOfExperience?: number;
  skills?: string[];
  education?: string;

  [key: string]: any;
}