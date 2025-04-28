import { GoogleGenerativeAI } from '@google/generative-ai';

// Validate API key
if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error('GOOGLE_GEMINI_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
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
    console.log('Sending prompt to LLM:', prompt);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log('Received response from LLM:', response);
    return response;
  } catch (error) {
    console.error('Error generating content:', error);
    if (error instanceof Error) {
      throw new Error(`LLM Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while generating content');
  }
} 