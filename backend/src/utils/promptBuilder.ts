import { JobRequest } from "../interfaces/api.types";

export function buildPrompt(data: JobRequest): string {
  const industry = data.industry || "Technology";
  return `Pretend you're a senior developer reviewing a job candidate. I'll provide job details, and I need you to generate 5 technical interview questions tailored to this role.
Based on the following information:
- Title: ${data.jobTitle}
- Industry: ${industry}
- Experience Level: ${data.experienceLower} to ${data.experienceUpper} years
- Description: ${data.jobDescription}

Please:
1. Extract the key technical skills and requirements from the job description
2. Create 5 technical questions that assess these skills at the appropriate experience level
3. For each question, provide evaluation guidelines for the interviewer

Return your response as a JSON array with the following structure for each question:
{
  "question": "The interview question text",
  "evaluationGuidelines": "What the interviewer should look for in a good answer",
  "skillsAssessed": ["skill1", "skill2"]
}`;
}
