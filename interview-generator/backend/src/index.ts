import express from "express"
import OpenAI from "openai"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const openai = new OpenAI({
  apiKey: process.env.APIKEY,
})
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

async function parseJobRequirement(jobReq: string) {
  const prompt = `
    You are an expert technical recruiter.
    Given the following job requirements, extract and group the requirements into core skill areas 
    like Frontend Development, Backend Development, Database Management, Cloud/DevOps, etc.
    
    Give an array as response
    

    Job Description:
    """ 
    ${jobReq}
    """
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const reply = response.choices[0].message?.content;
  if (!reply) throw new Error("No response from LLM");
  console.log(reply)
  return reply.split(",")
}

async function generateQuestions(skills: string[], experienceLevel: string) {
  const prompt = `
    You are an AI specialized in generating technical interview questions.

    TASK:
    - Given these core skill areas: [${skills.join(", ")}]
    - Experience level: "${experienceLevel}"

    Generate 5-7 **practical, real-world** technical interview questions for **each skill area**.
    - Questions should **test practical application** (how candidates would use skills in real projects).
    - Difficulty and depth must match the candidate's **experience level**.
    - Progressively increase difficulty while maintaining alignment with the candidate’s experience level.
    - For each question, provide clear evaluation criteria that explain what constitutes a strong response. The criteria should outline the key points or skills the candidate should demonstrate in their answer.
    OUTPUT FORMAT (strict JSON):
    {
      "Skill Area 1": [
        {
          "question": "question text here",
          "evaluationCriteria": "what a good answer should include"
        },
        ...
      ],
      "Skill Area 2": [
        ...
      ]
    }

    Keep questions concise, realistic, and avoid theoretical-only questions. 
    No extra commentary outside of the JSON.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const reply = response.choices[0].message?.content;

  if (!reply) throw new Error("No response from LLM");

  return JSON.parse(reply);
}

app.post("/generate", async (req, res) => {
  const { jobReq, experience } = req.body;
  const skills = await parseJobRequirement(jobReq);
  const questions = await generateQuestions(skills, experience)
  res.json({ questions })
})

app.listen(3000, () => {
  console.log("Running server on port 3000")
})
