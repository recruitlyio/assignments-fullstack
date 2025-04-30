import { NextFunction, Request, Response } from "express";
import {
   generateNewQuestions,
   getAllQuestions,
   saveQuestionsInInterview,
} from "../services/question.service";

export const generateQuestions = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { interviewId, genType } = req.params;
      if (genType === "regenerate") {
         const newQuestions = await generateNewQuestions(interviewId);
         if (newQuestions === null) {
            res.status(404).json({ message: "No questions found" });
         }

         const saveInInterview = await saveQuestionsInInterview(
            interviewId,
            JSON.stringify(newQuestions)
         );
         if (saveInInterview === null) {
            res.status(404).json({ message: "No questions found" });
         }
      }
      const allSavedQuestions = await getAllQuestions(interviewId);
      if (allSavedQuestions === null) {
         res.status(404).json({ message: "No questions found" });
      }
      res.status(200).json(allSavedQuestions);
   } catch (error) {
      next(error);
   }
};
