import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionGenerator from './pages/QuestionGenerator';
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h1 className="text-xl font-bold text-gray-800">
                Interview Question Generator
              </h1>
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Questions
                </a>
                <a
                  href="/generate"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Generate
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<QuestionList />} />
            <Route path="/generate" element={<QuestionGenerator />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
