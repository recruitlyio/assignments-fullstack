import { Router } from 'express';
import { generateQuestions } from '../controllers/question.controller';

export const router = Router();
router.post('/generate-questions', generateQuestions);
