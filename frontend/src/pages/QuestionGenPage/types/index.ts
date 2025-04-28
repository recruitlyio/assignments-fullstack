export interface FormErrors {
    jobDescription?: string;
    jobTitle?: string;
    industry?: string;
    experience?: string;
  }
  
  export interface FormData {
    jobDescription: string;
    jobTitle: string;
    industry: string;
    experienceLower: string;
    experienceUpper: string;
  }
  