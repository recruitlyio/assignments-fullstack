import { useState } from "react";
import axios from "axios";
import { FormData, Question } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export function useQuestionGenerator() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateQuestions = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/question/generate",
        formData
      );
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error generating questions",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuestions = () => {
    setQuestions([]);
  };

  return {
    questions,
    loading,
    generateQuestions,
    resetQuestions,
  };
}
