import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { RawParsedResume } from '../types/resume.types';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not defined in the environment variables.");
  // In a real app, you might throw or handle this more gracefully depending on startup needs
  // For this demo, i will let it potentially fail later if called without a key.
}

// Ensure API_KEY is defined before initializing
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Or use 'gemini-pro' or other appropriate model

/**
 * Defines the desired JSON schema structure for the LLM response.
 * Providing this structure within the prompt helps the LLM adhere to the format.
 */
const JSON_SCHEMA_DESCRIPTION = `
{
  "skills": [ { "name": "string", "proficiency": "string (e.g., 'proficient', 'experienced', 'familiar')" } ],
  "workExperience": [ { "role": "string", "company": "string", "startDate": "string (YYYY-MM)", "endDate": "string (YYYY-MM or 'Present')", "duration": "string", "description": "string" } ],
  "education": [ { "degree": "string (Standardized Name, e.g., 'Bachelor of Science')", "institution": "string", "graduationDate": "string (YYYY-MM)" } ]
}
`;

/**
 * Creates the prompt for the Gemini API to parse the resume text.
 * @param resumeText - The raw text content of the resume.
 * @returns The formatted prompt string.
 */
const createPrompt = (resumeText: string): string => {
  // Enhanced prompt focusing on accuracy, structure, and constraints
  return `
You are an expert resume parser AI assistant. Your task is to meticulously analyze the following resume text and extract structured information about the candidate's skills, work experience, and education.

**Instructions:**
1.  **Parse Thoroughly:** Read the entire resume text carefully.
2.  **Extract Key Information:** Identify and extract details for skills, work experience (including roles, companies, dates, and descriptions), and education (degrees, institutions, dates).
3.  **Standardize:** Where possible, standardize common names (e.g., 'BSc' to 'Bachelor of Science', 'js' to 'JavaScript'). Infer proficiency for skills if context allows (e.g., 'expert in Python' -> proficiency: 'expert'). Use YYYY-MM format for dates if possible, otherwise use the format present in the text. If only year is present use YYYY. If end date indicates current employment use "Present".
4.  **Strict JSON Output:** Respond ONLY with a single, valid JSON object. Do NOT include any introductory text, explanations, apologies, or markdown formatting like \`\`\`json ... \`\`\` before or after the JSON object.
5.  **Adhere to Schema:** The JSON object MUST strictly follow this structure:
    \`\`\`json
    ${JSON_SCHEMA_DESCRIPTION}
    \`\`\`
6.  **Handle Missing Information:** If specific information for a field (e.g., proficiency for a skill, end date for a job) is not found in the text, omit the field or use a reasonable placeholder like null ONLY if appropriate for the schema, but prefer omitting the field. Do not invent information.
7.  **Accuracy is Paramount:** Prioritize extracting information accurately as presented in the text.

**Resume Text to Parse:**
--- START RESUME TEXT ---
${resumeText}
--- END RESUME TEXT ---

**Your JSON Output:**
`;
};

/**
 * Parses resume text using the Gemini API.
 * @param resumeText - The raw text content of the resume.
 * @returns A promise that resolves to the parsed resume data (RawParsedResume).
 * @throws Throws an error if the API call fails or the response is invalid.
 */
export const parseResumeWithLLM = async (resumeText: string): Promise<RawParsedResume> => {
  if (!model) {
    throw new Error("Gemini AI Model not initialized. Check API Key.");
  }
  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error("Resume text cannot be empty.");
  }

  const prompt = createPrompt(resumeText);

  console.log("Sending request to Gemini API..."); // Basic logging

  try {
     const generationConfig = {
      // Adjust temperature for more deterministic output if needed (e.g., 0.2)
      temperature: 0.3,
      // You might adjust topK, topP if needed, but defaults are often fine
      // maxOutputTokens: 2048, // Set if you anticipate very long outputs
      responseMimeType: "application/json", // Request JSON output directly!
    };

     // Safety settings to block harmful content - adjust as needed
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];


    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });


    // Check for safety blocks before accessing response
    // Reference: https://ai.google.dev/gemini-api/docs/safety-settings#safety_feedback
    if (!result.response) {
       console.error("Gemini API Error: No response received. Safety settings might have blocked the request/response.");
       // You can inspect result.promptFeedback here if needed
       throw new Error("Failed to get response from AI. Potential safety block or API issue.");
    }
    // Updated access based on Gemini API structure (as of early 2024)
     const response = result.response;
     const candidate = response.candidates?.[0];

     if (!candidate || candidate.finishReason !== 'STOP') {
        // Log the finish reason if available
        console.error("Gemini API Error: Response generation stopped unexpectedly.", candidate?.finishReason, candidate?.safetyRatings);
        throw new Error(`AI response generation failed or was stopped. Reason: ${candidate?.finishReason}`);
     }

    // Use responseMimeType "application/json" means the text should already be JSON
     const text = response.text();

    console.log("Received raw response from Gemini API."); // Avoid logging potentially large 'text' in production

    // Attempt to parse the response text as JSON
    try {
      const parsedData: RawParsedResume = JSON.parse(text);
      console.log("Successfully parsed JSON response from Gemini API.");
      // Basic sanity check - does it look like our structure?
      if (!parsedData || (typeof parsedData !== 'object')) {
          throw new Error("Parsed data is not a valid object.");
      }
      // Check for at least one expected top-level key
       if (!parsedData.skills && !parsedData.workExperience && !parsedData.education) {
           console.warn("Parsed data seems empty or doesn't match expected top-level keys (skills, workExperience, education).");
           // Decide if this is an error or just an empty parse result
           // For now, we'll allow it but warn.
       }

      return parsedData;
    } catch (parseError) {
      console.error("Error parsing JSON response from Gemini API:", parseError);
      console.error("Raw non-JSON response received:", text); // Log the invalid response for debugging
      throw new Error("Failed to parse AI response as valid JSON.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Rethrow a more generic error or handle specific API errors if possible
    throw new Error("Failed to process resume with AI service.");
  }
};