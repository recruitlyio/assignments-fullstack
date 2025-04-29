import express from "express";
import { createInterview, getAllInterviews } from "../controllers/interview.controller";

const router = express.Router();
router.get("/", getAllInterviews);

router.post("/", createInterview);

export default router;