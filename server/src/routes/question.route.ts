import express from "express";
import { generateQuestions } from "../controllers/question.controller";

const router = express.Router();

router.get("/:interviewId", generateQuestions);

export default router;