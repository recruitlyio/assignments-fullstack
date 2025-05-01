import { ParseResponse } from '../types/resume';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Parse resume text using the backend API
 * @param text The resume text to parse
 * @returns Promise with the parsed resume data
 */
export const parseResume = async (text: string): Promise<ParseResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
}; 