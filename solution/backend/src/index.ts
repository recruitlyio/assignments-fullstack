import express from "express";
import { client } from "./client";
import cors from "cors";

const app = express();
app.use(cors());

app.post("/api/questions", async (req, res) => {
  const relocate = req.query.relocate;
  const remote = req.query.remote;
  const currentTitle = req.query.currentTitle;
  const experienceYears = Number(req.query.experienceYears);
  const skills = req.query.skills;
  const preferredRoles = req.query.preferredRoles;
  const jobType = req.query.jobType;
  const startDate = req.query.startDate;
  const experienceLevel =
    experienceYears <= 2 ? "beginner" : experienceYears <= 5 ? "mid" : "senior";

  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are an excellent interviewer who asks technical interview questions. Generate a list of 10 questions, TECHNICAL ONLY, about the skills mentioned - ${skills}, for a job seeker with the following details:\n
        Current Job Title: ${currentTitle}\n
        Experience Years: ${experienceYears}\n
        Willing to Relocate: ${relocate}\n
        Remote Work: ${remote}\n
        Skills: ${skills}\n
        Preferred Roles: ${preferredRoles}\n
        Job Type: ${jobType}\n
        Available Date: ${startDate}
        The difficulty of question should be according to ${experienceLevel} level. And the questions should be of practical application and not just knowledge. Just generate the questions, no other text. Don't ask questions about stuff that are already answered in the details. Each question should have an evaluation criteria for assessing the answers. The output should be an array of objects with the following structure and it should have a variety of easy, medium and hards:\n
          {
          question: string,
          evaluationCriteria: string
          difficulty: "easy" | "medium" | "hard"
          skills: string (list of technologies involved)
          }`,
      },
    ],
  });

  //@ts-ignore
  const questions = JSON.parse(response.content[0].text!);

  res.json({
    questions,
  });
});

app.listen(8000, () => {
  console.log("Listening on port 8080");
});
