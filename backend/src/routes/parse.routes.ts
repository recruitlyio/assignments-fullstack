import { Router } from 'express';
import { parseResumeController } from '../controllers/parse.controller';

const router = Router();

// Define the POST endpoint for parsing resumes
// POST /api/parse
router.post('/parse', parseResumeController);

export default router;