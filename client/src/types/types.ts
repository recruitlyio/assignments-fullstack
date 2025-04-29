export interface Message {
  message: string;
  message_id: string;
  role: "ai" | "human";
}

export interface Profile {
  name?: string;
  contact?: string;
  yearsOfExperience?: number;
  skills?: string[];
  education?: string[];
  currentTitle?: string;
}
