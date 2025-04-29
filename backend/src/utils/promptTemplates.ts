export const QUESTION_GENERATION_PROMPT = `
Please generate a technical interview question with the following parameters:
- Categories: {{categories}}
- Seniority Level: {{seniorityLevel}}
- Difficulty: {{difficulty}}
- Keywords: {{keywords}}

The response should be in JSON format with the following structure:
{
  "content": "The question text",
  "expectedAnswer": "The expected answer or solution",
  "hints": ["Hint 1", "Hint 2", ...],
  "evaluationCriteria": ["Criterion 1", "Criterion 2", ...],
  "tags": ["tag1", "tag2", ...],
  "metadata": {
    "estimatedTimeMinutes": number,
    "prerequisites": ["prerequisite1", "prerequisite2", ...],
    "followUpQuestions": ["question1", "question2", ...]
  }
}`;

export const DIFFICULTY_CALIBRATION_PROMPT = `
Please analyze this interview question and calibrate its difficulty based on the following data:

Question Content:
{{questionContent}}

Current Difficulty: {{currentDifficulty}}
Average Time to Solve: {{avgTimeToSolve}} minutes
Success Rate: {{successRate}}%
Average Feedback Score: {{avgFeedbackScore}}
Candidate Seniority Levels: {{seniorityLevels}}

Feedback Comments:
{{feedbackComments}}

Please provide your analysis in JSON format:
{
  "calibratedDifficulty": "easy|medium|hard|expert",
  "reasoning": "Explanation for the calibration",
  "suggestedModifications": "Suggestions to better align with the target difficulty"
}`; 