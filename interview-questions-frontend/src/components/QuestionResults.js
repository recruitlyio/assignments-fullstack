import React from 'react';

const QuestionResults = ({ questions }) => {
  return (
    <div className="question-results">
      <h2>Generated Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <h3>Question {index + 1}</h3>
          <p className="question-text">{question.questionText}</p>
          
          <div className="question-details">
            <div className="question-category">
              <strong>Category:</strong> {question.category}
            </div>
            <div className="question-difficulty">
              <strong>Difficulty:</strong> {question.difficulty}
            </div>
          </div>
          
          <div className="evaluation-criteria">
            <h4>Evaluation Criteria:</h4>
            <ul>
              {question.evaluationCriteria.map((criterion, cIndex) => (
                <li key={cIndex}>{criterion}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionResults;