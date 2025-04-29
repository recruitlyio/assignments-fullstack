import { v4 as uuidv4 } from 'uuid';
import {
  Question,
  QuestionGenerationParams,
  QuestionDifficulty,
  QuestionCategory,
  SeniorityLevel,
  QuestionFeedback,
  JobMatchQuestionRequest,
} from '../models/questionModel';
import { generateQuestion } from './llmService';
import {
  updateCalibrationWithFeedback,
  calibrateQuestionDifficulty as calibrateDifficulty,
} from './calibrationService';

// In-memory storage (in a real app, this would be a database)
const questions = new Map<string, Question>();

export const generateQuestions = async (
  params: QuestionGenerationParams
): Promise<Question[]> => {
  const count = params.count || 1;
  const results: Question[] = [];

  for (let i = 0; i < count; i++) {
    const questionData = await generateQuestion(
      params.categories || [QuestionCategory.ALGORITHMS],
      params.seniorityLevel || SeniorityLevel.MID,
      params.difficulty || QuestionDifficulty.MEDIUM,
      params.keywords || []
    );

    const newQuestion: Question = {
      id: uuidv4(),
      content: questionData.content || '',
      difficulty: questionData.difficulty || QuestionDifficulty.MEDIUM,
      category: questionData.category || [QuestionCategory.ALGORITHMS],
      seniorityLevel: questionData.seniorityLevel || [SeniorityLevel.MID],
      expectedAnswer: questionData.expectedAnswer,
      hints: questionData.hints,
      evaluationCriteria: questionData.evaluationCriteria,
      tags: questionData.tags,
      metadata: questionData.metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      feedbackScore: 0,
      calibrationScore: questionData.calibrationScore || 0.5,
    };

    questions.set(newQuestion.id, newQuestion);
    results.push(newQuestion);
  }

  return results;
};

export const getQuestionById = (id: string): Question | undefined => {
  return questions.get(id);
};

export const getAllQuestions = (): Question[] => {
  return Array.from(questions.values());
};

export const searchQuestions = (
  params: QuestionGenerationParams
): Question[] => {
  let results = Array.from(questions.values());

  // Handle search term
  if (params.searchTerm) {
    const searchTerm = params.searchTerm.toLowerCase();
    results = results.filter(
      (q) =>
        q.content.toLowerCase().includes(searchTerm) ||
        q.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        q.category.some((cat) => cat.toLowerCase().includes(searchTerm))
    );
  }

  if (params.categories && params.categories.length > 0) {
    results = results.filter((q) =>
      params.categories!.some((cat) => q.category.includes(cat))
    );
  }

  if (params.difficulty) {
    results = results.filter((q) => q.difficulty === params.difficulty);
  }

  if (params.seniorityLevel) {
    results = results.filter((q) =>
      q.seniorityLevel.includes(params.seniorityLevel!)
    );
  }

  if (params.keywords && params.keywords.length > 0) {
    results = results.filter((q) =>
      params.keywords!.some(
        (keyword) =>
          q.content.toLowerCase().includes(keyword.toLowerCase()) ||
          q.tags?.some((tag) =>
            tag.toLowerCase().includes(keyword.toLowerCase())
          )
      )
    );
  }

  if (params.excludeIds && params.excludeIds.length > 0) {
    results = results.filter((q) => !params.excludeIds!.includes(q.id));
  }

  return results;
};

export const submitFeedback = async (
  feedback: QuestionFeedback
): Promise<void> => {
  const question = questions.get(feedback.questionId);

  if (!question) {
    throw new Error(`Question with ID ${feedback.questionId} not found`);
  }

  // Update question with feedback
  question.feedbackScore =
    (question.feedbackScore + feedback.relevanceScore) / 2;
  question.usageCount += 1;
  question.updatedAt = new Date();

  // Update calibration data with feedback
  await updateCalibrationWithFeedback(question, feedback);

  questions.set(question.id, question);
};

export const recalibrateQuestionDifficulty = async (
  questionId: string,
  feedbacks: QuestionFeedback[]
): Promise<Question> => {
  const question = questions.get(questionId);

  if (!question) {
    throw new Error(`Question with ID ${questionId} not found`);
  }

  const calibratedDifficulty = await calibrateDifficulty(question, feedbacks);

  // Update question with new difficulty
  question.difficulty = calibratedDifficulty;
  question.updatedAt = new Date();

  questions.set(question.id, question);

  return question;
};

export const generateJobMatchQuestions = async (
  params: JobMatchQuestionRequest
): Promise<Question[]> => {
  const { candidateProfile, jobRequirements, difficulty, count = 1 } = params;

  // Determine the seniority level based on years of experience
  let seniorityLevel = SeniorityLevel.JUNIOR;
  if (candidateProfile.yearsOfExperience >= 8) {
    seniorityLevel = SeniorityLevel.STAFF;
  } else if (candidateProfile.yearsOfExperience >= 5) {
    seniorityLevel = SeniorityLevel.SENIOR;
  } else if (candidateProfile.yearsOfExperience >= 2) {
    seniorityLevel = SeniorityLevel.MID;
  }

  // Find matching skills between candidate and job requirements
  const matchingSkills = candidateProfile.skills.filter((skill) =>
    jobRequirements.requiredSkills.includes(skill.toLowerCase())
  );

  // Determine categories based on skills
  const categories = determineCategories(matchingSkills);

  // Generate questions using the enhanced context
  const results: Question[] = [];

  for (let i = 0; i < count; i++) {
    const questionData = await generateQuestion(
      categories,
      seniorityLevel,
      difficulty,
      matchingSkills
    );

    const newQuestion: Question = {
      id: uuidv4(),
      content: questionData.content || '',
      difficulty: difficulty,
      category: categories,
      seniorityLevel: [seniorityLevel],
      expectedAnswer: questionData.expectedAnswer,
      hints: questionData.hints,
      evaluationCriteria: questionData.evaluationCriteria,
      tags: [...matchingSkills, ...jobRequirements.requiredSkills],
      metadata: {
        ...questionData.metadata,
        jobContext: {
          requiredYearsExperience: jobRequirements.minimumYearsExperience,
          candidateYearsExperience: candidateProfile.yearsOfExperience,
          skillMatch: calculateSkillMatchPercentage(
            candidateProfile.skills,
            jobRequirements.requiredSkills
          ),
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      feedbackScore: 0,
      calibrationScore: questionData.calibrationScore || 0.5,
    };

    questions.set(newQuestion.id, newQuestion);
    results.push(newQuestion);
  }

  return results;
};

// Helper function to determine question categories based on skills
const determineCategories = (skills: string[]): QuestionCategory[] => {
  const categories = new Set<QuestionCategory>();

  skills.forEach((skill) => {
    const normalizedSkill = skill.toLowerCase();
    if (
      normalizedSkill.includes('algorithm') ||
      normalizedSkill.includes('dsa')
    ) {
      categories.add(QuestionCategory.ALGORITHMS);
    }
    if (normalizedSkill.includes('data structure')) {
      categories.add(QuestionCategory.DATA_STRUCTURES);
    }
    if (
      normalizedSkill.includes('system design') ||
      normalizedSkill.includes('architecture')
    ) {
      categories.add(QuestionCategory.SYSTEM_DESIGN);
    }
    if (
      normalizedSkill.includes('backend') ||
      normalizedSkill.includes('api')
    ) {
      categories.add(QuestionCategory.BACKEND);
    }
    if (
      normalizedSkill.includes('frontend') ||
      normalizedSkill.includes('ui')
    ) {
      categories.add(QuestionCategory.FRONTEND);
    }
    if (
      normalizedSkill.includes('database') ||
      normalizedSkill.includes('sql')
    ) {
      categories.add(QuestionCategory.DATABASE);
    }
    if (
      normalizedSkill.includes('javascript') ||
      normalizedSkill.includes('js')
    ) {
      categories.add(QuestionCategory.JAVASCRIPT);
    }
    if (
      normalizedSkill.includes('typescript') ||
      normalizedSkill.includes('ts')
    ) {
      categories.add(QuestionCategory.TYPESCRIPT);
    }
    if (normalizedSkill.includes('node')) {
      categories.add(QuestionCategory.NODE_JS);
    }
    if (normalizedSkill.includes('react')) {
      categories.add(QuestionCategory.REACT);
    }
    if (normalizedSkill.includes('security')) {
      categories.add(QuestionCategory.SECURITY);
    }
    if (normalizedSkill.includes('test')) {
      categories.add(QuestionCategory.TESTING);
    }
    if (
      normalizedSkill.includes('devops') ||
      normalizedSkill.includes('ci/cd')
    ) {
      categories.add(QuestionCategory.DEVOPS);
    }
  });

  // If no specific categories are found, default to algorithms and data structures
  if (categories.size === 0) {
    categories.add(QuestionCategory.ALGORITHMS);
    categories.add(QuestionCategory.DATA_STRUCTURES);
  }

  return Array.from(categories);
};

// Helper function to calculate skill match percentage
const calculateSkillMatchPercentage = (
  candidateSkills: string[],
  requiredSkills: string[]
): number => {
  const normalizedCandidateSkills = candidateSkills.map((s) => s.toLowerCase());
  const normalizedRequiredSkills = requiredSkills.map((s) => s.toLowerCase());

  const matchingSkills = normalizedCandidateSkills.filter((skill) =>
    normalizedRequiredSkills.includes(skill)
  );

  return (matchingSkills.length / requiredSkills.length) * 100;
};
