export function buildPrompt({
  jobDescription,
  experienceYears,
  experienceMonths,
  difficulty,
}: {
  jobDescription: string;
  experienceYears: number;
  experienceMonths: number;
  difficulty?: string;
}): string {
  return `Act as an expert technical interviewer.

Based on the following job description and candidate experience, generate 5 technical interview questions. For each question, include a concise model answer and assign a maximum mark (e.g., 10).

Return the result in **valid JSON** format like this:
[
  {
    "question": "string",
    "answer": "string",
    "maxMarks": number
  }
]

Job Description:
${jobDescription}

${difficulty ? difficulty : ""}

Candidate Experience: ${experienceYears} years ${experienceMonths} months

Return only the JSON array. Do not include any extra text.`;
}
