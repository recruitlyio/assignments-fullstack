import { z } from "zod";

export const questionsAndAnswers = z.object({
  question: z.string(),
  answers: z.string(),
  maxMarks: z.number(),
  marksObtained: z.number(),
});

export const saveInterviewValidations = z.object({
  questionsAndAnswers: z.array(questionsAndAnswers),
  interviewId: z.string(),
});

export type TQuestionsAndAnswers = z.infer<typeof questionsAndAnswers>;
