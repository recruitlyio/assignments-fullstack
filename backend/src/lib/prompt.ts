export interface InterviewPromptData {
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    difficulty: {
        level:"beginner" | "intermediate" | "advanced";
        consistency: boolean;
    }
    experience: string | number;
    skillAreas: string[];
    practicalFocus : boolean;
    additionalNotes: string | null;
  }  


export function buildPrompt({jobTitle, jobDescription, companyName, experience, skillAreas, difficulty, practicalFocus, additionalNotes}: InterviewPromptData): string {
    return `You are an AI system designed to generate high-quality technical interview questions.

Role: ${jobTitle}
Skill: ${skillAreas}
Company: ${companyName}
Job Description: ${jobDescription}
Difficulty Level: ${difficulty.level}
Difficulty Consistency: ${difficulty.consistency}
Experience Level: ${experience}

Instructions:
1. Break down the job role into core skill areas.
2. Maintain a consistent question difficulty based on the specified experience level.
3. Generate questions that test the candidate's **practical application of skills**, not just theoretical knowledge.
4. Ensure questions are relevant to real-world software development challenges.
5. For each question, include:
   - The Question
   - Skill being tested
   - Difficulty (Easy, Medium, Hard)
   - Evaluation Criteria (how to judge a good answer)

Return 3 to 5 well-structured questions as JSON objects.
`
};