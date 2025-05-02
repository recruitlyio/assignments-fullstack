import { useState } from "react";
import Form from "../components/Form";
import QuestionCard from "../components/QuestionCard";
import { GeneratedQuestion } from "../types";

export default function Home() {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);

  const handleGeneratedQuestions = (newQuestions: GeneratedQuestion[]) => {
    setQuestions(newQuestions);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const QUESTIONS_PER_PAGE = 1;

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Technical Interview Question Generatorr
        </h1>
        <Form onGenerated={handleGeneratedQuestions} />
      </div>

      {paginatedQuestions.map((q, index) => (
        <div
          key={index}
          className="w-full max-w-2xl mt-6 bg-white rounded-2xl shadow-lg p-6"
        >
    <QuestionCard {...q} number={index + 1 + (currentPage - 1) * QUESTIONS_PER_PAGE} />

        </div>
      ))}

      {questions.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition 
        ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700"
        }`}
          >
            &lt;
          </button>
          <button
            disabled={currentPage * QUESTIONS_PER_PAGE >= questions.length}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition 
        ${
          currentPage * QUESTIONS_PER_PAGE >= questions.length
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
