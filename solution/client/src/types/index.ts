export type FilterDifficulty = "easy" | "medium" | "hard" | "";

export interface Questions {
  question: string;
  evaluationCriteria: string;
  difficulty: "easy" | "medium" | "hard";
  skills: string;
}

export interface FilterProps {
  skill: string;
  difficulty: string;
  questions: Questions[];
}
