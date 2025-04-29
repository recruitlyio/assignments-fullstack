export interface Message {
    sender: 'user' | 'bot';
    text: string;
  }
  
  export interface CandidateProfile {
    name?: string;
    experience?: string;
    skills?: string[];
  }