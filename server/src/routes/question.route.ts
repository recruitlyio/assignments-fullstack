import express from "express";
import { generateQuestions } from "../controllers/question.controller";

const router = express.Router();

// genType: "initial" | "regenerate"
router.get("/:interviewId/:genType", generateQuestions);

export default router;