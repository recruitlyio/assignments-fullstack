import React, { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [role, setRole] = useState("Data Scientist");
  const [experience, setExperience] = useState("Mid-level");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQuestions([]);
    try {
      const res = await axios.post("http://localhost:3001/api/questions", {
        role,
        experience,
      });
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-8 gap-8">
      {/* Left: Form */}
      <div className="w-1/2 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-black">Generate Interview Questions</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option>Entry-level</option>
              <option>Mid-level</option>
              <option>Senior</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Generate Questions
          </button>
        </form>
      </div>

      {/* Right: Result */}
      <div className="w-1/2 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Generated Questions</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-4 text-gray-800">
            {questions.map((q, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="space-y-2">
                  <p><strong>Question:</strong> {q.question}</p>
                  <p><strong>Difficulty:</strong> {q.difficulty}</p>
                  <p><strong>Evaluation Criteria:</strong> {q.evaluationCriteria}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No questions yet. Submit the form to generate.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
