import { Question, QuestionDifficulty, QuestionFeedback, SeniorityLevel } from '../models/questionModel';
import { DifficultyMetrics, CalibrationData } from '../models/difficultyModel';
import { generateQuestion, calibrateDifficulty } from './llmService';

// In-memory storage (in a real implementation, this would be stored in a database)
const calibrationData = new Map<string, CalibrationData>();

export const updateCalibrationWithFeedback = async (
  question: Question, 
  feedback: QuestionFeedback
): Promise<CalibrationData> => {
  let data = calibrationData.get(question.id);
  
  if (!data) {
    data = {
      questionId: question.id,
      metrics: {
        averageTimeToSolve: 0,
        successRate: 0,
        averageFeedbackScore: 0,
        calibratedDifficulty: question.difficulty
      },
      lastCalibrated: new Date()
    };
  }
  
  // Update metrics with new feedback
  // This is a simple implementation; in a real system, you'd use a more sophisticated algorithm
  data.metrics.averageFeedbackScore = 
    (data.metrics.averageFeedbackScore + feedback.relevanceScore) / 2;
    
  if (feedback.candidatePerformance) {
    data.metrics.successRate = 
      (data.metrics.successRate + (feedback.candidatePerformance > 7 ? 1 : 0)) / 2;
  }
  
  // Store updated calibration data
  calibrationData.set(question.id, data);
  
  return data;
};

export const calibrateQuestionDifficulty = async (
  question: Question, 
  feedbacks: QuestionFeedback[]
): Promise<QuestionDifficulty> => {
  // Calculate metrics from feedback
  const avgFeedbackScore = feedbacks.reduce((sum, fb) => sum + fb.relevanceScore, 0) / feedbacks.length;
  const successRate = feedbacks
    .filter(fb => fb.candidatePerformance && fb.candidatePerformance > 7)
    .length / feedbacks.length;
  
  // Mock average time to solve (in a real app, this would come from actual data)
  const avgTimeToSolve = 15; // minutes
  
  // Mock seniority levels (in a real app, this would come from actual data)
  const seniorityLevels: SeniorityLevel[] = [SeniorityLevel.JUNIOR, SeniorityLevel.MID];
  
  // Extract comments from feedback
  const feedbackComments = feedbacks
    .filter(fb => fb.comments)
    .map(fb => fb.comments as string);
  
  // Use LLM to calibrate difficulty
  const calibrationResult = await calibrateDifficulty(
    question.content,
    question.difficulty,
    avgTimeToSolve,
    successRate,
    avgFeedbackScore,
    seniorityLevels,
    feedbackComments
  );
  
  // Update calibration data
  const data = calibrationData.get(question.id) || {
    questionId: question.id,
    metrics: {
      averageTimeToSolve: avgTimeToSolve,
      successRate,
      averageFeedbackScore: avgFeedbackScore,
      calibratedDifficulty: calibrationResult.calibratedDifficulty
    },
    lastCalibrated: new Date()
  };
  
  data.metrics.calibratedDifficulty = calibrationResult.calibratedDifficulty;
  data.lastCalibrated = new Date();
  
  calibrationData.set(question.id, data);
  
  return calibrationResult.calibratedDifficulty;
};

export const getCalibrationData = (questionId: string): CalibrationData | undefined => {
  return calibrationData.get(questionId);
};
