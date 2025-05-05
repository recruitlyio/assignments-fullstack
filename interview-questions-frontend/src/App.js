import React, { useState } from 'react';
import './App.css';
import QuestionForm from './components/QuestionForm';
import QuestionResults from './components/QuestionResults';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:9000/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Technical Interview Question Generator</h1>
      </header>
      <main>
        <QuestionForm onSubmit={generateQuestions} />
        {loading ? (
          <div className="loading">Generating questions...</div>
        ) : (
          questions.length > 0 && <QuestionResults questions={questions} />
        )}
      </main>
    </div>
  );
}

export default App;