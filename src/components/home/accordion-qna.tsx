"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const badgeColorMapping = {
  easy: "bg-green-200 text-green-800",
  medium: "bg-orange-200 text-orange-800",
  hard: "bg-red-200 text-red-800",
};

const difficultyMapping = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function AccordionQnA({
  index,
  question,
  difficulty,
  evaluationCriteria,
}: {
  index: number;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  evaluationCriteria: string;
}) {
  return (
    <AccordionItem value={question} key={question}>
      <AccordionTrigger>
        <span>{index + 1}.</span>
        {question}
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            badgeColorMapping[difficulty]
          )}
        >
          {difficultyMapping[difficulty]}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pl-6 text-muted-foreground">
        {evaluationCriteria}
      </AccordionContent>
    </AccordionItem>
  );
}
