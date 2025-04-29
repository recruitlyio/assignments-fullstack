import { Request, Response, NextFunction } from 'express';
import { processJobRequest } from '../services/api.service';

export async function generateQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const questions = await processJobRequest(payload);
    res.json(questions);
  } catch (err) {
    next(err);
  }
}