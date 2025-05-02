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
}

export interface ValidationError {
  field: string;
  message: string;
  level: 'warning' | 'error';
  details?: any;
}

export interface RawLLMOutput {
  skills?: Array<{ name: string; proficiency?: string | null }>;
  workExperience?: Array<{
    title?: string;
    company?: string;
    location?: string | null;
    dateRangeText?: string | null;
    responsibilities?: string[] | null;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    location?: string | null;
    yearText?: string | null;
    fieldOfStudy?: string | null;
  }>;
}

export interface ParsedResumeData {
  skills: Skill[];
  workExperience: any[];
  education: any[];
}

export interface PreprocessingFindings {
  identifiedSections: { name: string; startIndex: number; endIndex: number }[];
  potentialDates: { text: string; lineNumber: number }[];
  potentialCompanies: { text: string; lineNumber: number }[];
  potentialInstitutions: { text: string; lineNumber: number }[];
  potentialSkills: { text: string; lineNumber: number }[];
}
