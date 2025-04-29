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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("./client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.post("/api/questions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const relocate = req.query.relocate;
    const remote = req.query.remote;
    const currentTitle = req.query.currentTitle;
    const experienceYears = Number(req.query.experienceYears);
    const skills = req.query.skills;
    const preferredRoles = req.query.preferredRoles;
    const jobType = req.query.jobType;
    const startDate = req.query.startDate;
    const experienceLevel = experienceYears <= 2 ? "beginner" : experienceYears <= 5 ? "mid" : "senior";
    const response = yield client_1.client.messages.create({
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
        The difficulty of question should be according to ${experienceLevel} level. And the questions should practical application and not just knowledge. Just generate the questions, no other text. Don't ask questions about stuff that are already answered in the details. Each question should have an evaluation criteria for assessing the answers. The output should be an array of objects with the following structure and it should have a variety of easy, medium and hards:\n
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
    const questions = JSON.parse(response.content[0].text);
    console.log(questions);
    res.json({
        questions,
    });
}));
app.listen(8000, () => {
    console.log("Listening on port 8080");
});
