import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import QuestionGenPage from './pages/QuestionGenPage';
import OnlineAssessmentPage from './pages/OnlineAssessmentPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionGenPage />} />
          <Route path='/online-assessment' element={<OnlineAssessmentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;