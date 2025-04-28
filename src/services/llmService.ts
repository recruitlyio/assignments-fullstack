import { OpenAI } from 'openai';
import { SkillArea, DifficultyLevel, ExperienceLevel } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface LLMQuestionRequest {
  skillArea: SkillArea;
  difficultyLevel: DifficultyLevel;
  experienceLevel: ExperienceLevel;
  jobContext: string;
}

interface LLMQuestionResponse {
  title: string;
  description: string;
  sampleAnswer?: string;
}

export const generateQuestionWithLLM = async (
  params: LLMQuestionRequest
): Promise<LLMQuestionResponse> => {
  const { skillArea, difficultyLevel, experienceLevel, jobContext } = params;

  try {
    const prompt = `Generate a technical interview question for a ${experienceLevel.name} position.
    Skill Area: ${skillArea.name}
    Difficulty: ${difficultyLevel}
    Job Context: ${jobContext}
    
    The question should:
    1. Test practical knowledge and problem-solving
    2. Be specific to the skill area
    3. Match the difficulty level
    4. Include a clear problem statement
    
    Format the response as JSON with:
    - title: A concise question title
    - description: Detailed question description
    - sampleAnswer: A model solution or answer outline`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      title: response.title || `${skillArea.name} ${difficultyLevel} Challenge`,
      description: response.description || `Demonstrate your ${skillArea.name} expertise by solving a ${difficultyLevel} level problem.`,
      sampleAnswer: response.sampleAnswer
    };
  } catch (error) {
    console.error('Error generating question with LLM:', error);
    // Fallback to a template response
    return {
      title: `${skillArea.name} ${difficultyLevel} Challenge`,
      description: `Demonstrate your ${skillArea.name} expertise by solving a ${difficultyLevel} level problem.`,
      sampleAnswer: 'Sample implementation would go here...'
    };
  }
};