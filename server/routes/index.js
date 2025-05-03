import express from 'express';
import QuestionRoutes from './QuestionRoutes.js';

const router = express.Router();

router.use("/questions", QuestionRoutes);

export default router;