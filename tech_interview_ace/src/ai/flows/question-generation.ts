'use server';
/**
 * @fileOverview Generates technical interview questions based on job requirements and experience level.
 *
 * - generateQuestion - A function that generates technical interview questions.
 * - QuestionGenerationInput - The input type for the generateQuestion function.
 * - QuestionGenerationOutput - The return type for the generateQuestion function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
// Removed import {getSkills, Skill} from '@/services/skills'; - Skill extraction is now done via LLM

const QuestionGenerationInputSchema = z.object({
  jobRequirements: z.string().describe('The job requirements for the position, including responsibilities and needed skills.'),
  experienceLevel: z.enum(['Entry', 'Mid', 'Senior']).describe('The experience level of the candidate.'),
});
export type QuestionGenerationInput = z.infer<typeof QuestionGenerationInputSchema>;

const QuestionGenerationOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The generated technical interview question, focused on practical application.'),
      evaluationCriteria: z.string().describe('Clear, actionable criteria for evaluating the candidate\'s answer, including positive and negative indicators.'),
      skillAreas: z.array(z.string()).describe('The core skill areas covered by the question.'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the question, appropriate for the experience level.'),
    })
  ).describe('The generated technical interview questions.'),
});
export type QuestionGenerationOutput = z.infer<typeof QuestionGenerationOutputSchema>;

export async function generateQuestion(input: QuestionGenerationInput): Promise<QuestionGenerationOutput> {
  return questionGenerationFlow(input);
}

const skillExtractionPrompt = ai.definePrompt({
  name: 'skillExtractionPrompt',
  input: {
    schema: z.object({
      jobRequirements: z.string().describe('The job requirements for the position.'),
    }),
  },
  output: {
    schema: z.array(z.string()).describe('An array of distinct, core technical skills or key knowledge areas extracted from the job requirements. Focus on actionable skills rather than soft skills.'),
  },
  prompt: `Analyze the following job requirements and extract the key technical skills, programming languages, frameworks, methodologies, or core knowledge areas mentioned.
Focus on distinct, actionable technical competencies. Avoid duplicating very similar skills (e.g., 'React' and 'ReactJS'). Do not include soft skills like 'communication' or 'teamwork'.
Respond *only* with a JSON array of strings, where each string is a skill.

Job Requirements:
{{{jobRequirements}}}`,
});

const questionGenerationPrompt = ai.definePrompt({
  name: 'questionGenerationPrompt',
  input: {
    schema: z.object({
      skill: z.string().describe('The specific technical skill or knowledge area to generate a question for.'),
      experienceLevel: z.enum(['Entry', 'Mid', 'Senior']).describe('The experience level of the candidate.'),
      jobRequirements: z.string().describe('The full job requirements for context.'),
    }),
  },
  output: {
    schema: z.object({
      question: z.string().describe('The generated technical interview question. It should test practical application or problem-solving related to the skill in the context of the job requirements, not just theoretical knowledge.'),
      evaluationCriteria: z.string().describe('Specific, actionable criteria for evaluating the candidate\'s answer. Describe what constitutes a good answer (positive indicators) and potential red flags (negative indicators).'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level (Easy, Medium, Hard) appropriate for the specified experience level and the complexity of the skill.'),
    }),
  },
  prompt: `You are an expert technical interviewer creating assessment questions.
Generate a technical interview question specifically designed to test the practical application or problem-solving ability for the following skill:

Skill: {{{skill}}}
Candidate Experience Level: {{{experienceLevel}}}

Context - Full Job Requirements:
\`\`\`
{{{jobRequirements}}}
\`\`\`

Instructions:
1.  **Question:** Formulate a question that requires the candidate to demonstrate practical application of the skill, potentially in a scenario relevant to the job requirements provided. Avoid simple definition-based questions.
2.  **Evaluation Criteria:** Provide clear, specific criteria for evaluating the answer. What would a good answer include (e.g., specific techniques, considerations, trade-offs)? What would indicate a lack of understanding or experience? Be detailed and actionable for an interviewer.
3.  **Difficulty:** Assign a difficulty level (Easy, Medium, Hard) that aligns with the target experience level and the nature of the skill/question. Ensure the difficulty is consistent with typical expectations for that level.

Respond *only* with a JSON object containing the "question", "evaluationCriteria", and "difficulty" fields according to the output schema.`,
});

const questionGenerationFlow = ai.defineFlow<
  typeof QuestionGenerationInputSchema,
  typeof QuestionGenerationOutputSchema
>({
  name: 'questionGenerationFlow',
  inputSchema: QuestionGenerationInputSchema,
  outputSchema: QuestionGenerationOutputSchema,
},
async input => {
  // Extract core skills from the job requirements using the LLM
  const skillExtractionResult = await skillExtractionPrompt({jobRequirements: input.jobRequirements});
  const skills = skillExtractionResult.output || [];

  // If no skills are extracted, return an empty array.
  if (!skills || skills.length === 0) {
      console.warn("No skills extracted from job requirements.");
      return { questions: [] };
  }

  // Limit the number of questions generated, e.g., to the top 5-7 skills or a fixed number
  const skillsToQuery = skills.slice(0, 7); // Adjust limit as needed

  const questionPromises = skillsToQuery.map(async (skill) => {
    try {
        const {output} = await questionGenerationPrompt({
          skill: skill,
          experienceLevel: input.experienceLevel,
          jobRequirements: input.jobRequirements, // Pass full requirements for context
        });

        if (!output) {
            console.warn(`No output from question generation prompt for skill: ${skill}`);
            return null; // Skip if prompt fails for a skill
        }

        return {
          question: output.question,
          evaluationCriteria: output.evaluationCriteria,
          skillAreas: [skill], // Associate question with the specific skill
          difficulty: output.difficulty,
        };
    } catch (error) {
        console.error(`Error generating question for skill "${skill}":`, error);
        return null; // Skip this question if an error occurs
    }
  });

  const generatedQuestions = (await Promise.all(questionPromises)).filter(q => q !== null) as QuestionGenerationOutput['questions'];

  // Ensure questions meet minimum quality standards (e.g., non-empty fields)
  const validQuestions = generatedQuestions.filter(
      q => q.question && q.evaluationCriteria && q.skillAreas.length > 0 && q.difficulty
  );


  // Optional: Add logic here to further refine or filter questions if needed
  // e.g., ensure variety, remove duplicates if the LLM generates similar ones for different skill wordings

  return {questions: validQuestions};
});
