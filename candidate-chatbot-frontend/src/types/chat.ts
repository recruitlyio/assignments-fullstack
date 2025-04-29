export type Sender = 'user' | 'bot';

export interface Message {
  sender: Sender;
  text: string;
}

export interface CandidateProfile {
  name?: string;
  email?: string;
  yearsOfExperience?: number;
  skills?: string[];
  education?: string;

  [key: string]: any;
}