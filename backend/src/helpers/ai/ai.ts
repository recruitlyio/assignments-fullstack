import { OpenAI } from "openai";
import { QuestionAndAnswer } from "../../types/helpers";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callAI(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  return res.choices[0].message.content?.trim() || "";
}

export function parseAIResponse(raw: string): QuestionAndAnswer[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Not an array");

    return parsed.filter(
      (q: any) =>
        typeof q.question === "string" &&
        typeof q.answer === "string" &&
        typeof q.maxMarks === "number"
    );
  } catch (err) {
    console.error("Failed to parse AI response:", err);
    return [];
  }
}
