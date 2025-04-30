import type { Request, Response } from "express";
import { parseResume } from "../services/parser-service";

export const parseResumeController = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "Resume text is required." });
    return;
  }

  try {
    const parsedData = await parseResume(text);
    if (parsedData?.INVALID_RESUME) {
      res.status(500).json({ error: "INVALID RESUME." });
      return
    }
    res.json(parsedData);
  } catch (error) {
    console.error("Error parsing resume:", error);
    res.status(500).json({ error: "Failed to parse resume." });
  }
};
