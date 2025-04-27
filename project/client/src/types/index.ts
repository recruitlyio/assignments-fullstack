export type ExperienceLevel = "Junior" | "Mid" | "Senior";

export interface FormData {
  jobTitle: string;
  primarySkills: string[];
  experienceLevel: ExperienceLevel;
  numberOfQuestions: number;
  skillAreas: string[];
}

export interface Question {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  skillArea: string;
  evaluationCriteria: string[];
}
