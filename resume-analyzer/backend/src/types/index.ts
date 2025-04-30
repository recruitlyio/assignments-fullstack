export interface Skill {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: string;
  endYear: string;
}

export interface ParsedResume {
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  INVALID_RESUME?: boolean
}
