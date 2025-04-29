// src/services/api.ts

import axios from 'axios';
import { ValidatedResume } from '../types'; // Adjust path if your types file is elsewhere

// !!! IMPORTANT: Make sure this URL points to your running backend !!!
const API_BASE_URL = 'http://localhost:5001/api'; // Change port if needed

/**
 * Calls the backend API to parse the resume text.
 * @param resumeText The plain text of the resume.
 * @returns A Promise resolving to the ValidatedResume data.
 * @throws An error with a user-friendly message if the API call fails.
 */
export const parseResumeApi = async (resumeText: string): Promise<ValidatedResume> => {
  try {
    // Make POST request to the /parse endpoint
    const response = await axios.post<ValidatedResume>(`${API_BASE_URL}/parse`, {
      resumeText: resumeText, // Send data in the expected { resumeText: "..." } format
    });
    // Return the data part of the response
    return response.data;
  } catch (error: any) {
    // Handle different types of errors
    let errorMessage = 'An unknown error occurred while parsing the resume.';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Use the error message from the backend API response if available
        errorMessage = error.response.data?.message || `API Error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Error reaching the server (network issue, server down)
        errorMessage = 'Could not connect to the parsing service. Please ensure the backend is running.';
      } else {
        // Other Axios setup errors
        errorMessage = `Axios error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      // Generic JavaScript errors
      errorMessage = error.message;
    }
    console.error("API Error:", error); // Log the original error for debugging
    // Throw a new error with the user-friendly message
    throw new Error(errorMessage);
  }
};