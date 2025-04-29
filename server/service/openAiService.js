const { GoogleGenAI } = require("@google/genai");
const { MESSAGES } = require("../utils/constants");
require("dotenv").config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const formatRes = (data) => {
  let rawText = data.trim().replace(/^```json\s*|\s*```$/g, "");

  return JSON.parse(rawText);
};

const generate = async (payload) => {
  const { jobTitle, skill, experienceLevel } = payload;

  const prompt = `
You are a technical interviewer.
Generate **10 unique** technical interview question for a ${experienceLevel} ${jobTitle} focused on the skill: ${skill}.

Return JSON like:
{
  "skill": "${skill}",
  "question": "The interview question",
  "difficulty": "easy/medium/hard",
  "evaluationCriteria": "How to assess the answer"
}
  `;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const content = response?.candidates[0]?.content?.parts[0]?.text;

    if (!content) {
      throw new Error(MESSAGES.NO_RESPONSE_FROM_GEMINI);
    }

    // format markdown to json
    return formatRes(content);
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(`Error from Gemini: ${error.message}`);
  }
};

module.exports = {
  generate,
};
