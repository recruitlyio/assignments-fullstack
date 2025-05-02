import { parserController } from '../controllers/parserController';
const { Router } = require('express');

const router = Router();

router.post('/parse', parserController.parseResume);

export default router;
