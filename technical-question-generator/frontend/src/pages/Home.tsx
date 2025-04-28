import { useState } from "react";
import Form from "../components/Form";
import QuestionCard from "../components/QuestionCard";

const Home = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Technical Interview Question Generator</h1>
      <Form setQuestions={setQuestions} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((q, index) => (
          <QuestionCard key={index} question={q.question} evaluationCriteria={q.evaluationCriteria} />
        ))}
      </div>
    </div>
  );
};

export default Home;
