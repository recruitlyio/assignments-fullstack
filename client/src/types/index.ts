// Message Types
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

// Conversation Types
export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// Candidate Profile Types
export interface Skill {
  name: string;
  level?: string; // e.g. "beginner", "intermediate", "expert"
  yearsOfExperience?: number;
  lastUsed?: string;
}

export interface Experience {
  company?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  isCurrentRole?: boolean;
}

export interface Education {
  institution?: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
}

export interface CandidateProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  availableFrom?: string;
  salaryExpectation?: string;
  confidenceScore: number; // How confident is the system about the extracted data (0-100)
  lastUpdated: number;
}

// Job Description Types
export interface JobRequirement {
  type: "skill" | "experience" | "education" | "other";
  description: string;
  isRequired: boolean;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  description: string;
  responsibilities: string[];
  requirements: JobRequirement[];
  benefits?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chat Context Types
export interface ChatContextType {
  conversation: Conversation;
  isLoading: boolean;
  candidateProfile: CandidateProfile | null;
  jobDescription: JobDescription | null;
  sendMessage: (content: string) => Promise<void>;
  resetConversation: () => void;
}
