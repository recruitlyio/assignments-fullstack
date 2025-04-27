import { Question } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  console.log("🚀 ~ QuestionCard ~ question:", question);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="shadow-sm border-gray-200 animate-fade-in">
      <CardHeader className="py-4 px-6 flex flex-row items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-500">
            #{index + 1}
          </span>
          <Badge className="capitalize">{question.skillArea}</Badge>
          <Badge
            variant="outline"
            className={`font-medium capitalize ${getDifficultyColor(
              question.difficulty
            )}`}
          >
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <p className="text-base text-gray-800 mb-4">{question.question}</p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="evaluation">
            <AccordionTrigger className="text-sm font-medium text-blue-600">
              Evaluation Criteria
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                {question?.evaluationCriteria}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
