import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getGeminiResponse(prompt: string): Promise<string> {
  const res = await axios.post(
    GEMINI_API_URL,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      }
    }
  );
  return res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}
