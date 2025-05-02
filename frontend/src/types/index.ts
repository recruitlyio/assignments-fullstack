export interface QuestionInput {
  jobRequirements: string;
    experience: "junior" | "mid" | "senior";
  }
  
  export interface GeneratedQuestion {
    question: string;
    difficulty: string;
    evaluationCriteria: string;
  }
  