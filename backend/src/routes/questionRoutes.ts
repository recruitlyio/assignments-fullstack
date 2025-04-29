import { Router } from 'express';
import {
  generateQuestions,
  getQuestionById,
  getAllQuestions,
  searchQuestions,
  submitFeedback,
  recalibrateQuestion,
  generateJobSpecificQuestions
} from '../controllers/questionController';

export const createQuestionRouter = (): Router => {
  const router = Router();

  // Generate new questions
  router.post('/generate', generateQuestions);
  
  // Generate job-specific questions
  router.post('/generate-job-match', generateJobSpecificQuestions);
  
  // Get question by ID
  router.get('/:id', getQuestionById);
  
  // Get all questions
  router.get('/', getAllQuestions);
  
  // Search questions based on criteria
  router.post('/search', searchQuestions);
  
  // Submit feedback for a question // we will use this later
  router.post('/feedback', submitFeedback);
  
  // Recalibrate question difficulty // we will use this later
  router.post('/:id/recalibrate', recalibrateQuestion);

  return router;
};
