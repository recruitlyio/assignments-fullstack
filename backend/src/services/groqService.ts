

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

export async function generateInterviewQuestion(prompt: string) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `You are an expert technical interviewer.
Return ONLY a strict JSON array.
Each object must have:
- "question" (string)
- "topic" (string)
- "difficulty" (Easy, Medium, Hard)
- "evaluationCriteria" (array of strings)

Make sure keys and string values use double quotes (") only. No single quotes (').`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.6
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const generatedText = response.data.choices[0].message.content;
    return generatedText;
  } catch (error) {
    console.error('Error generating interview question:', error);
    throw error;
  }
}
