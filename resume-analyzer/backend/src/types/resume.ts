export interface Skill {
  name: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
  category?: string; // Frontend, Backend, DevOps, etc.
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  location?: string;
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
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
  twitter?: string;
  instagram?: string;
  medium?: string;
  stackoverflow?: string;
  otherProfiles?: { platform: string; url: string }[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Achievement {
  title: string;
  description: string;
  date?: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  url?: string;
  authors?: string[];
  description?: string;
}

export interface Patent {
  title: string;
  patentNumber: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Volunteer {
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
  location?: string;
}

export interface PersonalInfo {
  citizenship?: string;
  visaStatus?: string;
  availability?: string;
  relocation?: boolean;
  driverLicense?: boolean;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
}

export interface ParsedResume {
  contactInfo: ContactInfo;
  summary?: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  interests: string[];
  publications?: Publication[];
  patents?: Patent[];
  volunteer?: Volunteer[];
  personalInfo?: PersonalInfo;
  rawText: string;
}

export interface ParseError {
  field: string;
  message: string;
  severity: 'warning' | 'error';
} 