import { z } from "zod";

export const candidateValidation = z.object({
  name: z
    .string({ required_error: "Candidate Name is required." })
    .nonempty({ message: "Candidate Name is required." }),
  role: z
    .string({ required_error: "Role is required." })
    .nonempty({ message: "Role is required." }),
  jobId: z
    .string({ required_error: "Job Id is required." })
    .nonempty({ message: "Job Id is required." }),
  exprerienceYears: z
    .number({
      required_error: "Candidate experience is required.",
    })
    .nonnegative({ message: "Invalid Candidate Experience." }),
  experienceMonths: z
    .number({
      required_error: "Candidate experience is required.",
    })
    .nonnegative({ message: "Invalid Candidate Experience." }),
  jobDescription: z
    .string({ required_error: "Job description is mandatory." })
    .nonempty({ message: "Job description is mandatory." }),
  //.min(100, { message: "Minimum 100 characters." }),
});

export type TCandidateInformation = z.infer<typeof candidateValidation>;
