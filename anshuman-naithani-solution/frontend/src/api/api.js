// Update the API endpoint to your backend's URL
const API_URL = "http://localhost:5000/api/generate-questions";

export const generateInterviewQuestions = async (jobTitle, experienceLevel) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobTitle, experienceLevel }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error("Error in frontend:", error);
    throw error;
  }
};
