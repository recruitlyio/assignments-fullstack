import React from "react";

const QuestionList = ({ questions, isLoading }) => {
  return (
    <div className="question-container">
      <h2>Generated Questions:</h2>
      {isLoading ? (
        <div className="spinner"></div> // Spinner while loading
      ) : (
        <ul>
          {questions.map((q, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <strong>{q.question}</strong>
              <br />
              <span style={{ color: "#7FDBFF" }}>
                <em>Evaluation:</em> {q.evaluation}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
