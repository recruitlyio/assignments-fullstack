import React, { useState } from 'react';
import RequirementsForm from './RequirementsForm';
import QuestionResults from './QuestionResults';
import { JobRequirements, ExperienceLevel } from '../../types';
import { useQuestions } from '../../contexts/QuestionContext';

const QuestionGenerator: React.FC = () => {
  const { questions, loading, generateQuestionsForJob } = useQuestions();
  const [activeStep, setActiveStep] = useState<'form' | 'results'>(questions.length > 0 ? 'results' : 'form');

  const handleGenerateQuestions = (jobRequirements: JobRequirements, experienceLevel: ExperienceLevel) => {
    generateQuestionsForJob(jobRequirements, experienceLevel);
    setActiveStep('results');
  };

  const handleBackToForm = () => {
    setActiveStep('form');
  };

  return (
    <div className="space-y-8">
      {activeStep === 'form' ? (
        <RequirementsForm onSubmit={handleGenerateQuestions} />
      ) : (
        <QuestionResults onBack={handleBackToForm} loading={loading} />
      )}
    </div>
  );
};

export default QuestionGenerator;