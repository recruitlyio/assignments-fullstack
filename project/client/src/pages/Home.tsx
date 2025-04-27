import { useQuestionGenerator } from "@/hooks/useQuestionGenerator";
import { Form } from "@/components/Form";
import { QuestionList } from "@/components/QuestionList";
import { FormData } from "@/types";
import { Loader } from "lucide-react";

export default function Home() {
  const { questions, loading, generateQuestions, resetQuestions } =
    useQuestionGenerator();

  const handleFormSubmit = (data: FormData) => {
    generateQuestions(data);
  };

  const handleReset = () => {
    resetQuestions();
  };

  return (
    <div className="container py-8 px-4 min-h-screen flex ">
      <div className="flex-1">
        <Form
          onSubmit={handleFormSubmit}
          loading={loading}
          onReset={handleReset}
          showReset={questions.length > 0}
        />

        {loading ? (
          <div className="w-full flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-500">
                Generating relevant technical questions...
              </p>
            </div>
          </div>
        ) : (
          <QuestionList questions={questions} />
        )}
      </div>
    </div>
  );
}
