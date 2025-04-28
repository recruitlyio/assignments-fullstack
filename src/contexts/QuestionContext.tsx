import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateQuestions } from '../services/questionGenerator';
import { Question, JobRequirements, ExperienceLevel } from '../types';

interface QuestionContextType {
  questions: Question[];
  loading: boolean;
  generateQuestionsForJob: (jobRequirements: JobRequirements, experienceLevel: ExperienceLevel) => void;
  clearQuestions: () => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const useQuestions = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionProvider');
  }
  return context;
};

interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider: React.FC<QuestionProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generateQuestionsForJob = async (
    jobRequirements: JobRequirements,
    experienceLevel: ExperienceLevel
  ) => {
    setLoading(true);
    try {
      const newQuestions = await generateQuestions(jobRequirements, experienceLevel);
      setQuestions(newQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearQuestions = () => {
    setQuestions([]);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        loading,
        generateQuestionsForJob,
        clearQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};