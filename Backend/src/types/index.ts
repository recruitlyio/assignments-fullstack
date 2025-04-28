export interface Skill {
  name: string;
  aliases: string[];
  related: string[];
  category: string;
}

export interface SkillUsage {
  count: number;
  lastUsed: Date;
  successfulMatches: number;
  failedMatches: number;
  confidence: number;  // 0-1 confidence in this skill's relationships
}

export interface EvolvingSkill extends Skill {
  usage: SkillUsage;
  lastUpdated: Date;
  version: number;
}

export interface NormalizationPattern {
  original: string;
  normalized: string;
  count: number;
  lastUsed: Date;
  successRate: number;
}

export interface KnowledgeGraphEvolution {
  skills: Record<string, EvolvingSkill>;
  normalizationPatterns: NormalizationPattern[];
  lastEvolution: Date;
  version: number;
}

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