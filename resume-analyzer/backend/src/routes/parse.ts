import express from "express";
import { parseResumeController } from "../controllers/resume.controller";

const router = express.Router();

router.post("/parse", parseResumeController);

export default router;