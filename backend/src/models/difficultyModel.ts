import { QuestionDifficulty } from "./questionModel";

export interface DifficultyMetrics {
    averageTimeToSolve: number; // in minutes
    successRate: number; // 0-1
    averageFeedbackScore: number; // 1-10
    calibratedDifficulty: QuestionDifficulty;
  }
  
  export interface CalibrationData {
    questionId: string;
    metrics: DifficultyMetrics;
    lastCalibrated: Date;
  }
  
  // src/utils/promptTemplates.ts
  export const QUESTION_GENERATION_PROMPT = `
  Generate a technical interview question with the following parameters:
  - Category: {{categories}}
  - Seniority Level: {{seniorityLevel}}
  - Difficulty: {{difficulty}}
  - Keywords: {{keywords}}
  
  The question should test a candidate's understanding and ability to implement solutions
  related to the specified categories. Include:
  1. The question text
  2. Expected answer or approach
  3. 2-3 hints that could be provided if the candidate struggles
  4. Evaluation criteria for the interviewer
  5. Keywords or tags that describe the concepts being tested
  
  Format the output as a structured JSON object with the following properties:
  {
    "content": "The question text",
    "expectedAnswer": "The expected answer or approach",
    "hints": ["Hint 1", "Hint 2", "Hint 3"],
    "evaluationCriteria": ["Criteria 1", "Criteria 2", "Criteria 3"],
    "tags": ["tag1", "tag2", "tag3"],
    "metadata": {
      "conceptsTested": ["concept1", "concept2"],
      "estimatedTimeMinutes": 15,
      "potentialFollowups": ["followup1", "followup2"]
    }
  }
  `;
  
  export const DIFFICULTY_CALIBRATION_PROMPT = `
  Based on the following data about a technical interview question, calibrate the difficulty level:
  
  Question: {{questionContent}}
  Current difficulty rating: {{currentDifficulty}}
  Average time to solve: {{avgTimeToSolve}} minutes
  Success rate: {{successRate}}%
  Average feedback score: {{avgFeedbackScore}}/10
  Candidate seniority levels who attempted: {{seniorityLevels}}
  Feedback comments: {{feedbackComments}}
  
  Please analyze this data and determine the most appropriate difficulty level (EASY, MEDIUM, HARD, EXPERT).
  Provide your reasoning and any suggestions for modifying the question to better match the intended difficulty.
  
  Format your response as:
  {
    "calibratedDifficulty": "DIFFICULTY_LEVEL",
    "reasoning": "Your detailed reasoning",
    "suggestedModifications": "Suggestions to adjust difficulty if needed"
  }
  `;
  