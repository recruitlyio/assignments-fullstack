import express from "express";
import cors from "cors";
import { generateQuestions } from "./services/generate-question";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/questions", async (req, res) => {
  const currentTitle = req.body.currentTitle;
  const experienceYears = Number(req.body.experienceYears);
  const skills = req.body.skills;
  const preferredRoles = req.body.preferredRoles;
  const jobType = req.body.jobType;

  const experienceLevel =
    experienceYears <= 2 ? "beginner" : experienceYears <= 5 ? "mid" : "senior";

  const questions = await generateQuestions(
    currentTitle,
    experienceYears,
    skills,
    preferredRoles,
    jobType,
    experienceLevel
  );

  res.json({
    questions,
  });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
