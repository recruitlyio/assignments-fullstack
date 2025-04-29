// src/controllers/parse.controller.ts

import { Request, Response, NextFunction } from 'express';
import { parseResumeWithLLM } from '../services/llm.service';
import { validateAndStandardizeResume } from '../services/validation.service';
import { ParseRequest } from '../types/resume.types';

/**
 * Handles the resume parsing request.
 * 1. Extracts resume text from the request body.
 * 2. Calls the LLM service to parse the resume.
 * 3. Calls the validation service to clean the raw data.
 * 4. Sends the validated data or an error response.
 */
export const parseResumeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { resumeText } = req.body as ParseRequest;

    // 1. Basic Input Validation
    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      res.status(400).json({ message: 'Bad Request: resumeText is required and must be a non-empty string.' });
      return;
    }

    // Limit input size to prevent excessive costs/long processing times (adjust limit as needed)
    const MAX_RESUME_LENGTH = 20000; // Approx 4-5 pages
    if (resumeText.length > MAX_RESUME_LENGTH) {
        res.status(413).json({ message: `Bad Request: Resume text exceeds maximum length of ${MAX_RESUME_LENGTH} characters.` });
        return;
    }


    console.log(`Received request to parse resume (length: ${resumeText.length})`);

    // 2. Call LLM Service
    const rawParsedData = await parseResumeWithLLM(resumeText);
    console.log("LLM parsing completed.");

    console.log("--- Raw Data from LLM ---"); // ADD THIS LOG
console.log(JSON.stringify(rawParsedData, null, 2)); // ADD THIS LOG (stringify for better readability)
console.log("-------------------------"); // ADD THIS LOG

    // 3. Call Validation Service - ADD AWAIT HERE!
    const validatedData = await validateAndStandardizeResume(rawParsedData); // <--- Added await!
    console.log("Validation and standardization completed."); // This log now runs AFTER validation finishes
    console.log("--- Final Data before sending response ---"); // ADD THIS LOG
console.log(JSON.stringify(validatedData, null, 2)); // ADD THIS LOG
console.log("--------------------------------------"); // ADD THIS LOG

    // 4. Send Success Response (with the actual data, not a promise)
    res.status(200).json(validatedData);

  } catch (error) {
      console.error("Error in parseResumeController:", error);
      // Pass the error to the global error handler
       next(error);
  }
};