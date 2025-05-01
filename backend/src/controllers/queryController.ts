import { Request, Response } from "express";
import { fetchGeminiResponse } from "../lib/geminiResponse";
import { buildPrompt, InterviewPromptData } from "../lib/prompt";
const dotenv = require("dotenv")
dotenv.config();


export const sendQuery = async (req: Request, res: Response) => {
    const { jobTitle, jobDescription, companyName, experience, difficulty, practicalFocus, additionalNotes } = req.body;
    const rawSkills = req.body.skillAreas || [];
    const skillAreas = rawSkills.map((skill: any) => skill.name || "");
    if (!jobTitle || !jobDescription || !companyName) {
        res.status(400).json({ error: "Invalid input Data" });
    }
    const interviewData: InterviewPromptData = { jobTitle, jobDescription, companyName, skillAreas, experience, difficulty, practicalFocus, additionalNotes };
    const prompt = buildPrompt(interviewData);
    try {
        const response = await generateQuestion(prompt);
        res.status(200).json({ response });
    } catch (err) {
        console.error("Error generating question", err);
        res.status(500).json({ error: "internal server error" });
    }
}

async function generateQuestion(prompt: string) {
    if (!prompt) { return console.error("Wrong Form uploaded") }
    try {
        const response = await fetchGeminiResponse(prompt);
        console.log("This is the response from Gemini", response);
        return response[0];
    } catch (err) {
        console.log(err);

    }
}