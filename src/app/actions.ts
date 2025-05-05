"use server";

import { GoogleGenAI, Type } from "@google/genai";

const GenAIClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type ExperienceLevel = "junior" | "mid-level" | "senior";

export const generateQuestions = async (
  jobDescription: string,
  level: ExperienceLevel
) => {
  const response = await GenAIClient.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              nullable: false,
            },
            difficulty: {
              type: Type.STRING,
              nullable: false,
            },
            evaluationCriteria: {
              type: Type.STRING,
              nullable: false,
            },
          },
          required: ["question", "difficulty", "evaluationCriteria"],
        },
      },
    },
    contents: `
      You're a technical expert with a decade of experience and you keep yourself updated with the latest trends.
      Break down job description into core skill areas and generate 3 questions from the given job description and experience level in a way that tests practical knowledge.

      Keep the following things in mind:
      - Relevance and Effectiveness of generated questions must be maintained
      - Provide clear cut evaluation criteria based on candidate's experience level
      - Mention the question difficulty, i.e. easy, medium or hard.
  
      Here's the job description: ${jobDescription} and experience level of the candidate: ${level}
    `,
  });
  const textResponse = response.text?.trim();

  let parsedResponse;

  try {
    parsedResponse = JSON.parse(textResponse!);
  } catch (e) {
    console.error(
      `Something went wrong while converting text response to JSON: ${e}`
    );
  }

  return parsedResponse;
};
