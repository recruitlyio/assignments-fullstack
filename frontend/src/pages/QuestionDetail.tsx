import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionService, Question } from '../services/api';

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const data = await questionService.getQuestionById(id!);
      setQuestion(data);
    } catch (err) {
      setError('Failed to fetch question. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmittingFeedback(true);
    try {
      await questionService.submitFeedback(id, feedback);
      // Refresh the question data
      await fetchQuestion();
      // Reset feedback form
      setFeedback({ rating: 0, comment: '' });
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Question Not Found
          </h2>
          <button
            onClick={() => navigate('/questions')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Questions List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800 mb-6 flex items-center"
        >
          ← Back to Questions
        </button>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{question.title}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-wrap">
              {question.content}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Provide Feedback</h2>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Rating</label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFeedback({ ...feedback, rating })}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        feedback.rating === rating
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2">Comments</label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) =>
                    setFeedback({ ...feedback, comment: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Share your thoughts about this question..."
                />
              </div>

              <button
                type="submit"
                disabled={submittingFeedback || feedback.rating === 0}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div> */}
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
