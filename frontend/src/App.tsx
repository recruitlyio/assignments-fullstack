import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';

// Import pages
import QuestionGenPage from './pages/QuestionGenPage';

// Define the App component with routes
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionGenPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;