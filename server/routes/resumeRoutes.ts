import { Router } from 'express'
import { parseResumeController } from '../controllers/resumeController'
const router = Router()

// index.ts -> routes/resumeRoutes.ts -> controllers/resumeController.ts -> services/resumeParser.ts

// Route: POST /api/resume/parse
router.post('/parse', parseResumeController)

export default router
