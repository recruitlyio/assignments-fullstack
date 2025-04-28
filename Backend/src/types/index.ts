export interface CandidateSkill {
  name: string;
  years: number;
}

export interface JobRequirement {
  skill: string;
  minYears: number;
  required: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  skills: CandidateSkill[];
  experience: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: JobRequirement[];
}

export interface TransferableSkill {
  skill: string;
  potential: number;
  explanation: string;
}

export interface MatchResult {
  candidateId: string;
  jobId: string;
  score: number;
  matches: string[];
  missingSkills: string[];
  transferableSkills: TransferableSkill[];
  explanation: string;
} 