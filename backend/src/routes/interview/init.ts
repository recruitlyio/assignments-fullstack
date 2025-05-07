import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/request-validator";
import { Request, Response } from "express";
import { Candidate } from "../../models/candidate/candidate";
import { initInterviewValidation } from "../../validations/interview/init";
import { Interview } from "../../models/interview/interview";
import { ObjectId } from "../../types/mongoose";
import { buildPrompt } from "../../helpers/ai/build-prompt";
import { callAI, parseAIResponse } from "../../helpers/ai/ai";

const route = Router();

route.get(
  "/init",
  validateRequest(undefined, initInterviewValidation, undefined),
  async (req: Request, res: Response) => {
    try {
      const candidate = await Candidate.findById(req.query.candidateId);
      const difficultyLevel = req.query.difficultyLevel || "easy";
      if (!candidate) {
        throw new BadRequestError("Candidate not found.");
      }
      let interview = await Interview.findOne({
        candidateId: new ObjectId(req.query.candidateId as string),
      });
      if (!interview)
        interview = await Interview.create({
          candidateId: new ObjectId(req.query.candidateId as string),
        });
      const prompt = buildPrompt({
        jobDescription: candidate.jobDescription as string,
        experienceYears: candidate.exprerienceYears as number,
        experienceMonths: candidate.experienceMonths as number,
        difficulty: difficultyLevel as string,
      });

      const rawOutput = await callAI(prompt);

      const questionsAndAnswers = parseAIResponse(rawOutput);

      const data = {
        interview,
        candidate,
        questionsAndAnswers: questionsAndAnswers,
        difficultyLevel,
      };

      res.status(200).json({ message: "Success", data });
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Cound not Initialize Interview.");
    }
  }
);
export { route as initInterviewRouter };
