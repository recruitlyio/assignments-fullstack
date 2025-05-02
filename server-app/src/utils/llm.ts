import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { RawLLMOutput } from '../types';

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Sends resume text to the LLM with a generated prompt and requests structured data extraction.
 * @param prompt The dynamic prompt generated based on preprocessing.
 * @returns A promise resolving to the raw JSON object from the LLM.
 * @throws Error if the API call fails or the response is not valid JSON.
 */
export const generateStructuredData = async (prompt: string): Promise<RawLLMOutput> => {
  try {
    const response = (await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    })) as { text: string };

    const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : response.text;

    const rawData: RawLLMOutput = JSON.parse(jsonString);

    if (
      typeof rawData !== 'object' ||
      rawData === null ||
      (!('skills' in rawData) && !('workExperience' in rawData) && !('education' in rawData))
    ) {
      console.warn('LLM response did not contain expected top-level keys:', rawData);

      return { skills: [], workExperience: [], education: [] };
    }

    return rawData;
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);

    throw new Error(`LLM API call failed: ${error.message}`);
  }
};
