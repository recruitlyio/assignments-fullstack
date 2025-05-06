import React, { useState } from "react";
import Header from "@/components/Header";
import QuestionForm from "@/components/QuestionForm";
import QuestionsList from "@/components/QuestionsList";
import Footer from "@/components/Footer";
import {
  generateQuestions,
  Question,
  GenerateQuestionsRequest,
} from "@/services/service";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const Index: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<GenerateQuestionsRequest | null>(
    null
  );

  const handleFormSubmit = async (request: GenerateQuestionsRequest) => {
    setIsLoading(true);
    setFormData(request);

    try {
      const response = await generateQuestions(request);
      setQuestions(response.questions);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestions([]);
    setFormData(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10">
            <h1 className="text-3xl font-bold text-center mb-2">
              Technical Interview Question Generator
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Generate tailored technical interview questions based on job role,
              experience level, and required skills
            </p>

            <QuestionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </section>

          {formData && questions.length > 0 && (
            <>
              <Separator className="my-8" />

              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-navy-50 rounded-lg p-4 flex-grow">
                    <h2 className="font-semibold mb-2">Question Set Details</h2>
                    <p>
                      <strong>Role:</strong> {formData.jobRole}
                    </p>
                    <p>
                      <strong>Level:</strong> {formData.experienceLevel}
                    </p>
                    <p>
                      <strong>Skills:</strong> {formData.skills.join(", ")}
                    </p>
                  </div>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="ml-4 flex items-center gap-2"
                  >
                    <RefreshCcw size={16} />
                    Reset
                  </Button>
                </div>

                <QuestionsList questions={questions} />
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
