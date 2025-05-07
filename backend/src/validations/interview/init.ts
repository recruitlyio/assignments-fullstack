import { z } from "zod";

export const initInterviewValidation = z.object({
  candidateId: z.string(),
  difficultyLevel: z.string().optional(),
});
