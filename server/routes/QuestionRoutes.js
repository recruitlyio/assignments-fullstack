import express from 'express';
import QuestionController from '../controller/QuestionsController.js';

const router = express.Router();


router.post('/generate-questions', QuestionController.generateQuestions);

export default router;