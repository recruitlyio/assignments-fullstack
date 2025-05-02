import { Request, Response } from "express";
import { getGeminiResponse } from "../services/geminiService";
import jobDescription from "../data/jobDescription.json";

export const handleChat = async (req: Request, res: Response) => {
  const { message } = req.body;

  const prompt = `
Job Description: ${JSON.stringify(jobDescription, null, 2)}

Candidate Question: ${message}
`;

  try {
    const reply = await getGeminiResponse(prompt);
    if (reply) {
      res.json({ reply });
    } else {
      res.status(500).json({ reply: "Sorry, no response could be generated." });
    }
  } catch (err: any) {
    console.error("Gemini Error:", err.message, err.stack);
    res.status(500).json({ reply: "Error processing request." });
  }
};
