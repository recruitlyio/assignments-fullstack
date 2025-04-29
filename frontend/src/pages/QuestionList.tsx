import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionService, Question } from '../services/api';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await questionService.getAllQuestions();
      setQuestions(data);
    } catch (err) {
      setError('Failed to fetch questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const criteria = {
        searchTerm,
        difficulty: difficultyFilter !== 'all' ? difficultyFilter : undefined,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
      };
      const results = await questionService.searchQuestions(criteria);
      setQuestions(results);
    } catch (err) {
      setError('Failed to search questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(questions.map((q) => q.category)));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Interview Questions</h1>
        <Link
          to="/generate"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
        >
          Generate New Questions
        </Link>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm sm:text-base">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="w-full p-2 border rounded text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">
              Difficulty
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border rounded text-sm sm:text-base"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Search
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {questions.map((question) => (
          <Link
            key={question.id}
            to={`/questions/${question.id}`}
            className="block bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-medium line-clamp-2">
                {question.title}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs sm:text-sm ${
                  question.difficulty === 'easy'
                    ? 'bg-green-100 text-green-800'
                    : question.difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {question.difficulty}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
              {question.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {questions.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-sm sm:text-base">
            No questions found. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
