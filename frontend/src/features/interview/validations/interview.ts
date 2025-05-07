import { z } from "zod";

export const interviewValidations = z.object({
  questionsAndAnswers: z.array(
    z.object({
      question: z.string(),
      answers: z.string(),
      maxMarks: z.number(),
      marksObtained: z.number(),
    })
  ),
  candidateId: z.string(),
  interviewId: z.string(),
});

export type TInterviewValidation = z.infer<typeof interviewValidations>;
