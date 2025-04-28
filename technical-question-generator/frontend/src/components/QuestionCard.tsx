import React from "react";

interface QuestionCardProps {
  question: string;
  evaluationCriteria: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, evaluationCriteria }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Question:</h2>
      <p className="mb-4">{question}</p>
      <h2 className="text-lg font-semibold mb-2">Evaluation Criteria:</h2>
      <p>{evaluationCriteria}</p>
    </div>
  );
};

export default QuestionCard;
