import { Router } from 'express';
import { generateQuestions } from '../controllers/question.controller';

const router = Router();
router.post('/generate', generateQuestions);

export default router;
