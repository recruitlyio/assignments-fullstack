export interface Skill {
  name: string;
  proficiency?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | 'Present';
  duration?: string;
  responsibilities?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  graduationDate?: string;
  fieldOfStudy?: string;
  yearText: string;
}

export interface ValidationError {
  field: string;
  message: string;
  level: 'warning' | 'error';
}

export interface ParsedResumeData {
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  validationErrors: ValidationError[];
}

export interface ApiError {
  message: string;
}

export interface ApiError {
  status?: number;
  message: string;
  data?: any;
}

export interface ParsedResumeData {
  [key: string]: any;
}
