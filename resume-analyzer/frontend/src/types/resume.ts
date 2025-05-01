export interface Skill {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
  category?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  location?: string;
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | 'Present';
  location?: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
  url?: string;
}

export interface ContactInfo {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
}

export interface ParsedResume {
  contactInfo?: ContactInfo;
  summary?: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  projects?: Project[];
  certifications?: Certification[];
  rawText: string;
}

export interface ParseError {
  field: string;
  message: string;
  severity: 'warning' | 'error';
}

export interface ParseResponse {
  data: ParsedResume;
  errors: ParseError[];
  processingNotes?: string[];
} 