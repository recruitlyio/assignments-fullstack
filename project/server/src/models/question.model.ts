export interface Question {
  id: number;
  question: string;
  skillArea: string;
  difficulty: 'easy' | 'medium' | 'hard';
  evaluationCriteria: string;
}

export let questions: Question[] = [];
