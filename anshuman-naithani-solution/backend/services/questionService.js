const { generateQuestions } = require("../utils/cohereAiClient"); // Import OpenAI client

const MAX_REQUESTS_PER_WINDOW = 10; // Maximum requests allowed
const TIME_WINDOW_MS = 60000; // Time window in milliseconds (e.g., 1 minute)
let requestCount = 0; // Track the number of requests
let rateLimitResetTimeout;

// Function to reset the request count after the time window
const resetRateLimit = () => {
  requestCount = 0;
  clearTimeout(rateLimitResetTimeout); // Clear any existing timeout
  rateLimitResetTimeout = setTimeout(resetRateLimit, TIME_WINDOW_MS); // Restart the timer
};

// Start the timer when the service is loaded
resetRateLimit();

const getQuestions = async (jobTitle, experienceLevel) => {
  // Check if the rate limit is exceeded
  if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
    throw new Error(
      `Rate limit exceeded. Please wait ${
        TIME_WINDOW_MS / 1000
      } seconds before making another request.`
    );
  }

  try {
    // Increment the request count
    requestCount++;

    const questions = await generateQuestions(jobTitle, experienceLevel);
    return questions;
  } catch (error) {
    console.error("Error in question generation service:", error);
    throw new Error("Failed to generate questions.");
  }
};

module.exports = { getQuestions };
