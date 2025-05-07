import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/request-validator";
import { Request, Response } from "express";

import {
  TQuestionsAndAnswers,
  saveInterviewValidations,
} from "../../validations/interview/save";
import { Interview } from "../../models/interview/interview";

const route = Router();

route.post(
  "/save",
  validateRequest(saveInterviewValidations, undefined, undefined),
  async (req: Request, res: Response) => {
    try {
      let totaObtainedlMarks = 0,
        totalMarks = 0;
      req.body.questionsAndAnswers?.forEach((element: TQuestionsAndAnswers) => {
        totaObtainedlMarks = totaObtainedlMarks + element.marksObtained;
        totalMarks = totalMarks + element.maxMarks;
      });

      const savedInterview = await Interview.findById(req.body.interviewId);
      if (!savedInterview) {
        throw new BadRequestError("Interview Not Found.");
      }
      savedInterview.questionsAndAnswers = req.body.questionsAndAnswers;
      savedInterview.totalMarks = totalMarks;
      savedInterview.totalObtainedMarks = totaObtainedlMarks;
      await savedInterview.save();
      res.status(200).json({ message: "Success", data: savedInterview });
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Cound not Save Interview.");
    }
  }
);
export { route as saveInterviewRouter };
