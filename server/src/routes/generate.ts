import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
});

interface InterviewRequest {
  jobRole: string;
  experience: string;
  skills?: string;
  jobDescription?: string;
  noOfQuestions: number;
}

interface QA {
  question: string;
  answer: string;
}

router.post(
  "/",
  async (req: Request<{}, {}, InterviewRequest>, res: Response) => {
    try {
      const { jobRole, experience, skills, jobDescription, noOfQuestions } =
        req.body;

      const prompt = `
You are an expert technical interviewer.
Generate ${noOfQuestions} technical interview questions along with their brief answers for a candidate applying for the role of ${jobRole}.
The candidate has ${experience} of relevant experience.
${skills ? `The candidate's key skills are: ${skills}.` : ""}
${jobDescription ? `Here is the job description: ${jobDescription}.` : ""}
The questions should focus on core technical concepts, tools, best practices, and real-world problem-solving relevant to this role.
Return the output as a numbered list. Format each as:
Que: ...
Ans: ...
    `.trim();

      const chatResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const rawOutput = chatResponse.choices[0].message.content;
      if (!rawOutput)
        return res.status(500).json({ error: "No response from OpenAI" });

      const lines = rawOutput
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const result: QA[] = [];
      let currentQA: Partial<QA> = {};

      for (const line of lines) {
        if (line.startsWith("Q:")) {
          if (currentQA.question && currentQA.answer) {
            result.push(currentQA as QA);
            currentQA = {};
          }
          currentQA.question = line.replace(/^Que:\s*/, "");
        } else if (line.startsWith("A:")) {
          currentQA.answer = line.replace(/^Ans:\s*/, "");
        }
      }

      if (currentQA.question && currentQA.answer) {
        result.push(currentQA as QA);
      }

      res.json({ result });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to generate interview Q&A" });
    }
  }
);

export default router;
