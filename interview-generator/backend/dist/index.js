var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const openai = new OpenAI({
    apiKey: process.env.APIKEY,
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
function parseJobRequirement(jobReq) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        });
        const reply = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        if (!reply)
            throw new Error("No response from LLM");
        console.log(reply);
        return reply.split(",");
    });
}
function generateQuestions(skills, experienceLevel) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });
        const reply = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        if (!reply)
            throw new Error("No response from LLM");
        return JSON.parse(reply);
    });
}
app.post("/generate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobReq, experience } = req.body;
        const skills = yield parseJobRequirement(jobReq);
        const questions = yield generateQuestions(skills, experience);
        res.json({ questions });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: e });
    }
}));
app.listen(3000, () => {
    console.log("Running server on port 3000");
});
