import { z } from "zod";
export const MatcherFormSchema = z.object({
    role: z.string().min(1),
    description: z.string().min(50, { message: "Description should not be less than 100 character" })
});
