// src/types.ts

// Structure for individual skill items
export interface Skill {
    name: string;
    proficiency?: string;
  }
  
  // Structure for individual work experience items
  export interface WorkExperience {
    role: string;
    company: string;
    startDate?: string;
    endDate?: string;
    duration?: string;
    description?: string;
  }
  
  // Structure for individual education items
  export interface Education {
    degree: string;
    institution: string;
    graduationDate?: string;
    details?: string;
  }
  
  // Structure of the final validated resume data from the API
  export interface ValidatedResume {
    skills?: Skill[];
    workExperience?: WorkExperience[];
    education?: Education[];
    validationNotes?: string[];
  }