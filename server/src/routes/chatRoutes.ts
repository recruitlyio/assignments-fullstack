import { Router } from "express";
import { processChat } from "../controllers/chatController";
import { getJobDescription } from "../controllers/profileController";

const router = Router();

router.post("/chat", processChat);

router.get("/job-description", getJobDescription);

export default router;
