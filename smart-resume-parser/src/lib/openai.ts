import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper to validate if input looks like a resume
function isLikelyResume(text: string): boolean {
  const lower = text.toLowerCase();
  const keywords = [
    "experience",
    "education",
    "skills",
    "work",
    "professional",
  ];
  const matches = keywords.filter((k) => lower.includes(k));
  return matches.length >= 3;
}

export async function parseResumeWithGemini(resumeText: string) {
  if (!isLikelyResume(resumeText)) {
    throw new Error("Input does not appear to be a valid resume.");
  }

  const prompt = `
Extract structured resume data in this JSON stringified format (no additional text) and remove any extra space, and extra symbol or comma and if something is missing send null Output Format (strict JSON, no additional text),Standardize inconsistent naming. If duration is mentioned vaguely (e.g., "Summer Internship 2021"), reformat it into standard readable duration ("June 2021 - August 2021"). And also make workExperience description summarized so that we get only fruitful points and also add best suggestions to improve the resume if any.
{
  name: string,
  skills: [string],
  email: string,
  phone: string,  
  workExperience: {
    company: string,
    title: string,
    start_date: string,
    end_date: string,
    description: string
  }[],
  education: {
    school: string,
    degree: string,
    start_date: string,
    end_date: string,
  }[]
    suggestions: [string]
}

Resume:
${resumeText}
`;

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents,
  });

  const jsonString = response.text
    ?.replace("```json", "")
    .replace("```", "")
    .trim();

  return JSON.parse(jsonString || "{}");
}
