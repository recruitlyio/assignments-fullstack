import { Router } from "express";
import { createThread } from "../controllers/threadController";
import { sendMessage } from "../controllers/messageController";

const router = Router();

router.post("/thread", createThread);
router.post("/message", sendMessage);

export default router;
