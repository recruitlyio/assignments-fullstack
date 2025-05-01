import OpenAI from "openai";
import { config } from "dotenv";

config({ path: "./src/config/config.env" });

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function generateQuestions(role: string, experience: string) {
  const prompt = `
You are a technical interviewer. Generate 3 data science interview questions for a "${role}" position.
Make the difficulty appropriate for a candidate with "${experience}" experience.
For each question, also provide evaluation criteria.

Respond in JSON:
[
  {
    "question": "...",
    "difficulty": "easy|medium|hard",
    "evaluationCriteria": "..."
  },
  ...
]`;

  const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0]?.message?.content || "[]";
  const cleaned = text.replace(/^```json\s*|```$/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse response:", text);
    throw e;
  }
}
