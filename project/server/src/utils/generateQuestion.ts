import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';
const token = process.env.GITHUB_TOKEN; // make sure your env var is set

const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

// Define input type for question generation
interface GenerateQuestionsInput {
  jobTitle: string;
  primarySkills: string[];
  experienceLevel: string;
  numberOfQuestions: number;
  skillAreas: string[];
}

// Service function
export async function generateQuestionsFromOpenAI(
  input: GenerateQuestionsInput,
) {
  const {
    jobTitle,
    primarySkills,
    experienceLevel,
    numberOfQuestions,
    skillAreas,
  } = input;

  const userPrompt = `
You are an expert technical interviewer. 
Generate ${numberOfQuestions} technical interview questions for a ${jobTitle} role.
Focus on the following primary skills: ${primarySkills.join(', ')}.
Skill areas to cover: ${skillAreas.join(', ')}.
Adjust difficulty appropriate for a ${experienceLevel} level candidate.
For each question, also provide a brief evaluation guideline.

Respond in JSON format like:
[
  {
    "question": "Your question here",
    "difficulty": "easy/medium/hard",
    "skillArea": "Skill Area Name",
    "evaluationCriteria": "How to assess a good answer"
  }
]
  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a technical interviewer AI assistant.',
        },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      top_p: 1,
    });

    const messageContent = response.choices[0].message.content;

    if (!messageContent) {
      throw new Error('Empty response from LLM');
    }

    const questions = JSON.parse(messageContent);

    return questions;
  } catch (error) {
    console.error('Error in generateQuestionsFromOpenAI:', error);
    throw error;
  }
}
