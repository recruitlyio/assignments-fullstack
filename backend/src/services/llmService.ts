import axios from 'axios';
import { config } from '../config/config';
import { Question, QuestionCategory, QuestionDifficulty, SeniorityLevel } from '../models/questionModel';
import { QUESTION_GENERATION_PROMPT, DIFFICULTY_CALIBRATION_PROMPT } from '../utils/promptTemplates';

// Initialize configuration
const apiKey = config.llmApiKey;
const apiEndpoint = config.llmApiEndpoint;
const model = config.llmModel;

const callLlm = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling LLM:', error);
    throw new Error('Failed to generate content using LLM');
  }
};

export const generateQuestion = async (
  categories: QuestionCategory[],
  seniorityLevel: SeniorityLevel,
  difficulty: QuestionDifficulty,
  keywords: string[] = []
): Promise<Partial<Question>> => {
  const prompt = QUESTION_GENERATION_PROMPT
    .replace('{{categories}}', categories.join(', '))
    .replace('{{seniorityLevel}}', seniorityLevel)
    .replace('{{difficulty}}', difficulty)
    .replace('{{keywords}}', keywords.join(', '));

  const llmResponse = await callLlm(prompt);
  
  try {
    const parsedResponse = JSON.parse(llmResponse);
    
    return {
      content: parsedResponse.content,
      difficulty,
      category: categories,
      seniorityLevel: [seniorityLevel],
      expectedAnswer: parsedResponse.expectedAnswer,
      hints: parsedResponse.hints,
      evaluationCriteria: parsedResponse.evaluationCriteria,
      tags: parsedResponse.tags,
      metadata: parsedResponse.metadata,
      calibrationScore: 0.5, // Initial calibration score
    };
  } catch (error) {
    console.error('Error parsing LLM response:', error);
    throw new Error('Failed to parse question data from LLM response');
  }
};

export const calibrateDifficulty = async (
  questionContent: string,
  currentDifficulty: QuestionDifficulty,
  avgTimeToSolve: number,
  successRate: number,
  avgFeedbackScore: number,
  seniorityLevels: SeniorityLevel[],
  feedbackComments: string[]
): Promise<{ calibratedDifficulty: QuestionDifficulty; reasoning: string; suggestedModifications: string }> => {
  const prompt = DIFFICULTY_CALIBRATION_PROMPT
    .replace('{{questionContent}}', questionContent)
    .replace('{{currentDifficulty}}', currentDifficulty)
    .replace('{{avgTimeToSolve}}', avgTimeToSolve.toString())
    .replace('{{successRate}}', (successRate * 100).toString())
    .replace('{{avgFeedbackScore}}', avgFeedbackScore.toString())
    .replace('{{seniorityLevels}}', seniorityLevels.join(', '))
    .replace('{{feedbackComments}}', feedbackComments.join('\n'));

  const llmResponse = await callLlm(prompt);
  
  try {
    const parsedResponse = JSON.parse(llmResponse);
    
    return {
      calibratedDifficulty: parsedResponse.calibratedDifficulty as QuestionDifficulty,
      reasoning: parsedResponse.reasoning,
      suggestedModifications: parsedResponse.suggestedModifications
    };
  } catch (error) {
    console.error('Error parsing LLM calibration response:', error);
    throw new Error('Failed to parse calibration data from LLM response');
  }
};
