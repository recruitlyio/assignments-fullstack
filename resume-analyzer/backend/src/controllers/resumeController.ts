import { Request, Response } from 'express';
import { ResumeParser } from '../services/resumeParser';

const resumeParser = new ResumeParser();

export const parseResume = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Resume text is required'
      });
    }

    const result = await resumeParser.parseResume(text);
    res.json(result);
  } catch (error) {
    console.error('Error in parseResume controller:', error);
    res.status(500).json({
      error: 'Failed to parse resume'
    });
  }
}; 