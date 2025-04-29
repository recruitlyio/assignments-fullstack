export interface CandidateInfo {
    name: string;
    experience: string;
    skills: string;
  }
  
  export const conversationState = {
    candidateInfo: {} as CandidateInfo,
    conversationStage: 0
  };
  