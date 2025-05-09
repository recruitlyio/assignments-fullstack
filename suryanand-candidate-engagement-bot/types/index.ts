export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export interface CandidateInfo {
  name?: string
  experience?: string
  skills?: string[]
  education?: string
  currentRole?: string
  location?: string
  availability?: string
  salaryExpectations?: string
  interests?: string[]
  questions?: string[]
  strengths?: string[]
  workStyle?: string
  relevantProjects?: string[]
  confidence: Record<string, number>
}

export interface ExtractedInfo {
  candidateInfo: CandidateInfo
  lastUpdated: string
}
