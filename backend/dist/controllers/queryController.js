"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQuery = void 0;
const geminiResponse_1 = require("../lib/geminiResponse");
const prompt_1 = require("../lib/prompt");
const dotenv = require("dotenv");
dotenv.config();
const sendQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobTitle, jobDescription, companyName, experience, difficulty, practicalFocus, additionalNotes } = req.body;
    const rawSkills = req.body.skillAreas || [];
    const skillAreas = rawSkills.map((skill) => skill.name || "");
    if (!jobTitle || !jobDescription || !companyName) {
        res.status(400).json({ error: "Invalid input Data" });
    }
    const interviewData = { jobTitle, jobDescription, companyName, skillAreas, experience, difficulty, practicalFocus, additionalNotes };
    const prompt = (0, prompt_1.buildPrompt)(interviewData);
    try {
        const response = yield generateQuestion(prompt);
        res.status(200).json({ response });
    }
    catch (err) {
        console.error("Error generating question", err);
        res.status(500).json({ error: "internal server error" });
    }
});
exports.sendQuery = sendQuery;
function generateQuestion(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!prompt) {
            return console.error("Wrong Form uploaded");
        }
        try {
            const response = yield (0, geminiResponse_1.fetchGeminiResponse)(prompt);
            console.log("This is the response from Gemini", response);
            return response[0];
        }
        catch (err) {
            console.log(err);
        }
    });
}
