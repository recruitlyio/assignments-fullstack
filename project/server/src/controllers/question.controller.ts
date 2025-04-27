import { generateQuestionsFromOpenAI } from '../utils/generateQuestion';
import { Request, Response, NextFunction } from 'express';

// Define a type for the expected request body
interface GenerateQuestionsRequestBody {
  jobTitle: string;
  primarySkills: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | string;
  numberOfQuestions: number;
  skillAreas: string[];
}

// Controller function
export const generateQuestions = async (
  req: Request,
  res: any,
  next: NextFunction,
) => {
  try {
    const {
      jobTitle,
      primarySkills,
      experienceLevel,
      numberOfQuestions,
      skillAreas,
    } = req.body;

    if (
      !jobTitle ||
      !primarySkills.length ||
      !experienceLevel ||
      !numberOfQuestions ||
      !skillAreas.length
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const questions = await generateQuestionsFromOpenAI({
      jobTitle,
      primarySkills,
      experienceLevel,
      numberOfQuestions,
      skillAreas,
    });

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ error: 'Failed to generate questions' });
  }
};
