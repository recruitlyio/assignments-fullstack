
import React from "react";
import { Question } from "@/services/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const difficultyColors: Record<Question["difficulty"], string> = {
  easy: "bg-green-50 text-green-700",
  medium: "bg-yellow-50 text-yellow-700",
  hard: "bg-red-50 text-red-700",
};

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ questions }) => {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Generated Questions</h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <Card key={question.id} className="question-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <span className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Evaluation Criteria
                </h3>
                  <Badge
                    className={`${difficultyColors[question.difficulty]} px-4 py-1 text-xs`}
                  >
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                  </Badge>
                </span>

                <Separator />
                <div className="flex flex-wrap gap-2 pt-2">
                  {question.evaluationCriteria.map((criterion, index) => (
                    <Badge key={index} variant="outline" className="bg-navy-50">
                      {criterion}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
