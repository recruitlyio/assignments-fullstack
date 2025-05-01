export interface SkillArea {
  name: string;
}

export interface DifficultySettings {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  consistency: boolean; // Whether to maintain consistent difficulty across domains
}

export interface FormData {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  skillAreas: SkillArea[];
  difficulty: DifficultySettings;
  practicalFocus: boolean; // Whether to focus on practical application
  additionalNotes: string;
}