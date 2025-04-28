

import express from 'express';
import { generateInterviewQuestion } from '../services/groqService';

const router = express.Router();

router.post('/generate', async (req: any, res: any) => {
  try {
    const { jobRole, experienceLevel } = req.body;

    if (!jobRole || !experienceLevel) {
      return res.status(400).json({ error: "Job role and experience level are required." });
    }

    const prompt = `Generate 10 technical interview questions for a ${experienceLevel} candidate applying for ${jobRole} role. Categorize questions by relevant technical skill topics and assign difficulty levels.`;

    const generatedQuestionsText = await generateInterviewQuestion(prompt);

    let questions;
    try {
      questions = JSON.parse(generatedQuestionsText);
    } catch (parseError) {
      console.error("Failed to parse questions JSON:", parseError);
      return res.status(500).json({ error: "Invalid JSON format received from Groq." });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error in /generate route:', error);
    return res.status(500).json({ error: "Something went wrong while generating the question." });
  }
});

export default router;
