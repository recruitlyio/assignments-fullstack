import { z } from "genkit";
import { ai } from "./genkit";

// Defining the schema for the input data (resume text)
const ResumeInputDataSchema = z.object({
    resumeText: z.string().min(1, "Resume text is required").describe("The text of the resume to be parsed."),
});

export type ResumeInputData = z.infer<typeof ResumeInputDataSchema>;

// Defining the schema for the parsed resume data
const ParsedResumeDataSchema = z.object({
    isResume: z.boolean().describe("Whether the input text is a valid resume."),
    error: z.string().optional().describe("Error message if any error occurs during parsing or any missing fields or data."),
    personalInfo: z.object({
        name: z.string().optional().describe("Name of the resume holder."),
        email: z.string().optional().describe("Email address of the resume holder."),
        phone: z.string().optional().describe("Phone number of the resume holder."),
        location: z.string().optional().describe("Location of the resume holder."),
        linkedIn: z.string().optional().describe("LinkedIn profile URL of the resume holder."),
        github: z.string().optional().describe("GitHub profile URL of the resume holder."),
        website: z.string().optional().describe("Website of the resume holder."),
    }).optional().describe("Personal information and contact of the resume holder."),
    skills: z.array(z.object({
        name: z.string(),
        proficiency: z.string().optional()
    })).describe("A list of skills and their proficiency levels."),
    experience: z.array(z.object({
        role: z.string(),
        duration: z.string(),
        location: z.string().optional(),
        company: z.string().optional(),
        description: z.string().optional(),
    })).optional().describe("A list of work experiences with roles and durations."),
    education: z.array(z.object({
        degree: z.string().describe("Standardized degree name"),
        institution: z.string().optional(),
        duration: z.string(),
        location: z.string()
    })).describe("A list of education details with standardized degree names.")
})

export type ParsedResumeData = z.infer<typeof ParsedResumeDataSchema>;

// Defining the AI prompt for extracting structured data from a resume
export const extractResumeDataPrompt = ai.definePrompt({
    name: "ExtractResumeData",
    description: "Extracts structured data from a resume.",
    input: { schema: ResumeInputDataSchema },
    output: { schema: ParsedResumeDataSchema },
    prompt: `You are an AI resume parser. Your task is to extract structured data from the given resume text. The output should be in JSON format. The fields to extract are as follows:
    - Personal Information (name, email, phone, location, LinkedIn, GitHub)
    - Skills (name, proficiency)
    - Work Experience (job title, company, location, duration, description)
    - Education (standardized degree, institution, location, duration)
    - Error message if any error occurs during parsing or any missing fields or data
    - A boolean field indicating whether the input text is a valid resume or not

    Ensure that the extracted information is accurate and consistent.
    Name should be in Pascal Case

    Here is the resume text:
    {{resumeText}}`
})

export const extractResumeDataFlow = ai.defineFlow(
    {
        name: "ExtractResumeDataFlow",
        inputSchema: ResumeInputDataSchema,
        outputSchema: ParsedResumeDataSchema,
    },
    async (input) => {
        const { output } = await extractResumeDataPrompt(input);
        return ParsedResumeDataSchema.parse(output);
    }
)

export const extractResumeData = async (input: ResumeInputData): Promise<ParsedResumeData> => {
    return extractResumeDataFlow(input);
}
