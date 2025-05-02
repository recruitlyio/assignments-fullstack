import express from "express";
import { generateQuestion } from "../controllers/questionController";

const router = express.Router();

router.post("/generate", generateQuestion);

export default router;
