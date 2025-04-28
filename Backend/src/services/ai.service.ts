import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY || '');
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
    You are a technical recruiter assistant specializing in matching candidates to jobs.
    Your task is to analyze skills, experience, and job requirements to provide
    accurate and insightful matching recommendations.
  `
});

export async function generateContent(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
} 