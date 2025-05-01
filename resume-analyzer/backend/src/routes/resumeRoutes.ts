import { Router } from 'express';
import { parseResume } from '../controllers/resumeController';

const router = Router();

router.post('/parse', parseResume);

export default router; 