import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
import cors from "cors";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("No API_KEY Found");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { role, experience, skills } = req.body;
  const result = await generateQuestions(role, experience, skills);
  res.json(result);
});

const generateQuestions = async (
  role: string,
  experience: string,
  skills: string[]
) => {
  const prompt = `You are a professional technical recruiter. Your task is to generate high-quality interview questions based on job role, experience level, and required skills. The questions must be suitable for a ${experience} level candidate applying for a ${role} position focusing on ${JSON.stringify(
    skills
  )}. Generate exactly 10 questions. Avoid yes/no questions. Focus on practical knowledge and real-world scenarios. Format output as a numbered list.`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = (await model).generateContent(prompt);
  const response = (await result).response;
  const text = response.text();

  // Step 1: Remove the first intro line if needed
  const cleaned = text.replace(/^Here.*?\n\n/, "");

  // Step 2: Split by numbered questions (regex: "1.", "2.", etc.)
  const questionsRaw = cleaned.split(/\n\d+\.\s*/).filter(Boolean);

  const questions = questionsRaw.slice(1).map(
    (q) =>
      q
        .replace(/\*\*/g, "") // Remove all ** (bold formatting)
        .replace(/\n/g, "") // Remove all newline characters
        .trim() // Remove extra spaces
  );
  // Result: array of strings
  return questions;
};

app.listen(3000, () => {
  console.log("server is running on port : 3000");
});
