import { Question } from "@/types";
import { QuestionCard } from "./QuestionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  console.log("🚀 ~ QuestionList ~ questions:", questions);
  if (questions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Generated Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, i) => (
          <QuestionCard key={question.id} question={question} index={i} />
        ))}
      </CardContent>
    </Card>
  );
}
