"use server";
import { extractResumeData, ParsedResumeData, ResumeInputData } from "@/lib/ai/resumeparser";

export const parseResume = async (resumeText: string): Promise<ParsedResumeData> => {
    if (!resumeText.trim()) {
        throw new Error("Resume text cannot be empty.")
    }

    try {

        const resumeInput: ResumeInputData = { resumeText };
        const extractedData = await extractResumeData(resumeInput);

        if (!extractedData) {
            // This case might occur if the AI flow itself fails or returns nothing.
            throw new Error("Failed to extract data from resume.")
        }

        if (!extractedData.isResume) {
            throw new Error("Invalid Resume.")
        }

        return extractedData

    } catch (error: Error | unknown) {
        console.error("Error parsing resume:", error);
        throw error
    }
}