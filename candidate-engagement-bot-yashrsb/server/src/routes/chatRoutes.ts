import express from "express";
import { handleChat } from "../controllers/chatController";

const router = express.Router();

router.post("/job-assistant", handleChat);

export default router;
