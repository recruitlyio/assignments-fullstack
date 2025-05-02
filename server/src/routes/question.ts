import { Router } from "express";
import { generateQuestions } from "../services/openaiService";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { role, experience } = req.body;
    const data = await generateQuestions(role, experience);
    res.json(data);
  } catch (error) {
    console.error("Error generating question:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
