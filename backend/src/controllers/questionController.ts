import { Request, Response } from 'express';
import { 
  generateQuestions as generateQuestionsService,
  getQuestionById as getQuestionByIdService,
  getAllQuestions as getAllQuestionsService,
  searchQuestions as searchQuestionsService,
  submitFeedback as submitFeedbackService,
  recalibrateQuestionDifficulty,
  generateJobMatchQuestions
} from '../services/questionService';
import { 
  QuestionGenerationParams, 
  QuestionFeedback,
  JobMatchQuestionRequest
} from '../models/questionModel';

export const generateQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const params: QuestionGenerationParams = req.body;
    const questions = await generateQuestionsService(params);
    
    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate questions',
      error: (error as Error).message
    });
  }
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const question = getQuestionByIdService(id);
    
    if (!question) {
      res.status(404).json({
        success: false,
        message: `Question with ID ${id} not found`
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve question',
      error: (error as Error).message
    });
  }
};

export const getAllQuestions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const questions = getAllQuestionsService();
    
    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error getting all questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve questions',
      error: (error as Error).message
    });
  }
};

export const searchQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const params: QuestionGenerationParams = req.body;
    const questions = searchQuestionsService(params);
    
    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error searching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search questions',
      error: (error as Error).message
    });
  }
};

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedback: QuestionFeedback = req.body;
    await submitFeedbackService(feedback);
    
    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: (error as Error).message
    });
  }
};

export const recalibrateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { feedbacks } = req.body;
    
    const updatedQuestion = await recalibrateQuestionDifficulty(id, feedbacks);
    
    res.status(200).json({
      success: true,
      data: updatedQuestion,
      message: 'Question difficulty recalibrated successfully'
    });
  } catch (error) {
    console.error('Error recalibrating question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to recalibrate question difficulty',
      error: (error as Error).message
    });
  }
};

export const generateJobSpecificQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const params: JobMatchQuestionRequest = req.body;
    
    // Validate required fields
    if (!params.candidateProfile || !params.jobRequirements || !params.difficulty) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: candidateProfile, jobRequirements, or difficulty'
      });
      return;
    }

    // Validate candidate profile
    if (!params.candidateProfile.yearsOfExperience || 
        !params.candidateProfile.skills ||
        !params.candidateProfile.experienceDescription) {
      res.status(400).json({
        success: false,
        message: 'Invalid candidate profile: missing required fields'
      });
      return;
    }

    // Validate job requirements
    if (!params.jobRequirements.requiredSkills ||
        !params.jobRequirements.minimumYearsExperience ||
        !params.jobRequirements.jobDescription) {
      res.status(400).json({
        success: false,
        message: 'Invalid job requirements: missing required fields'
      });
      return;
    }

    const questions = await generateJobMatchQuestions(params);
    
    res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error generating job-specific questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate job-specific questions',
      error: (error as Error).message
    });
  }
};
