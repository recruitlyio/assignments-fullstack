import express from 'express';
import { sendQuery } from '../controllers/queryController';
const router = express.Router();

router.post('/query', sendQuery);

export default router;