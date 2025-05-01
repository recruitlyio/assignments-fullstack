export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface CandidateInfo {
  skills?: string[];
  experience?: string;
  education?: string;
  otherQualifications?: string;
}
