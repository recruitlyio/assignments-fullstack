// Define the structure for individual extracted items
export interface Skill {
    name: string;
    /** Estimated proficiency based on context, e.g., "mentioned", "advanced", "beginner". Keep simple for LLM. */
    proficiency?: string;
  }
  
  export interface WorkExperience {
    role: string;
    company: string;
    /** Start date, ideally in YYYY-MM format if possible */
    startDate?: string;
    /** End date, ideally in YYYY-MM format or "Present" */
    endDate?: string;
    /** Duration, can be extracted or calculated */
    duration?: string;
    /** Brief description or responsibilities mentioned */
    description?: string;
  }
  
  export interface Education {
    /** Standardized degree name */
    degree: string;
    institution: string;
    /** Graduation date or period, ideally YYYY-MM format */
    graduationDate?: string;
    /** GPA or honors if mentioned */
    details?: string;
  }
  
  // Define the main structure for the parsed resume data from the LLM
  export interface RawParsedResume {
    skills?: Skill[];
    workExperience?: WorkExperience[];
    education?: Education[];
    /** Sometimes LLMs add summary notes, capture if needed, but schema should discourage it */
    otherNotes?: string;
  }
  
  // Define the final structure including validation feedback
  export interface ValidatedResume extends RawParsedResume {
    /** Notes added during the validation process */
    validationNotes: string[];
  }
  
  // Define the expected request body for the API endpoint
  export interface ParseRequest {
    resumeText: string;
  }

  // Add this alongside your other interfaces
export type EmbeddingVector = number[];