import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Question {
  id: string;
  question: string;
  evaluationCriteria: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GenerateQuestionsRequest {
  jobRole: string;
  experienceLevel: string;
  skills: string[];
}

export interface GenerateQuestionsResponse {
  questions: Question[];
}

export const generateQuestions = async (
  request: GenerateQuestionsRequest
): Promise<GenerateQuestionsResponse> => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("Server configuration error. Unable to generate questions.");
    throw new Error("Missing GOOGLE_API_KEY environment variable.");
  }

  const prompt = `
    Generate technical interview questions for a ${request.experienceLevel} ${request.jobRole}
    with expertise in ${request.skills.join(", ")}.

    For each question provide:
    1. A clear and concise technical question that tests practical knowledge.
    2. 3-4 specific evaluation criteria that interviewers can use to assess the candidate's response.
    3. Difficulty level (easy, medium, or hard) based on the complexity of the question.

    Format the question in a way that:
    - Uses simple, direct language
    - Avoids unnecessary jargon
    - Focuses on practical applications
    - Includes specific examples when relevant

    Return ONLY the JSON object, with no introductory text, explanations, or markdown formatting.
    Format the response strictly as a JSON object with this structure:
    {
      "questions": [
        {
          "id": "UNIQUE_ID_HERE",
          "question": "Question text here",
          "evaluationCriteria": ["Criterion 1", "Criterion 2", "Criterion 3", "Criterion 4"],
          "difficulty": "easy" | "medium" | "hard"
        }
      ]
    }
    Ensure you return exactly 3 questions.
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log("Calling Gemini API...");
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        topP: 0.8,
        topK: 40,
      },
    });

    if (!result.response) {
      throw new Error("No response received from Gemini.");
    }

    const textResponse = result.response.text();
    if (!textResponse) {
      throw new Error("No text response received from Gemini.");
    }

    console.log("Received response from Gemini.");

    const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
    const match = textResponse.match(jsonRegex);

    if (!match) {
      throw new Error("Could not find JSON in the response text.");
    }

    const jsonStr = match[1]
      ? match[1].trim()
      : match[2]
      ? match[2].trim()
      : match[0].trim();

    if (!jsonStr.startsWith("{") || !jsonStr.endsWith("}")) {
      throw new Error("Extracted text does not look like valid JSON object.");
    }

    return JSON.parse(jsonStr) as GenerateQuestionsResponse;
  } catch (error) {
    console.error("Error in generateQuestions function:", error);
    throw error;
  }
};
