import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";
import "./styles.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionsGenerated = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <div className="app-container">
      <h1>Technical Interview Question Generator</h1>

      {/* Using conditional rendering to render spinner */}
      {isLoading && <div className="spinner"></div>}

      {/* Pass setIsLoading to QuestionForm */}
      <QuestionForm
        onQuestionsGenerated={handleQuestionsGenerated}
        setLoading={setIsLoading}
      />

      {/* Using conditional rendering to render Questions*/}
      {questions.length > 0 && (
        <div className="question-container">
          <QuestionList questions={questions} />
        </div>
      )}
    </div>
  );
};

export default App;
