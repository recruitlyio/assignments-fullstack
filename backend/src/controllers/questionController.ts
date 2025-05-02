import { Request, Response } from "express";
import { generateInterviewQuestions } from "../services/openaiService";

export const generateQuestion = async (req: Request, res: Response) => {
  try {
    const data = await generateInterviewQuestions(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate question" });
  }
};
