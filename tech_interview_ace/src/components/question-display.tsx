'use client';

import type { QuestionGenerationOutput } from '@/ai/flows/question-generation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Star, ChevronDown } from 'lucide-react';

type QuestionDisplayProps = {
  questions: QuestionGenerationOutput['questions'];
};

const difficultyMap: Record<string, { icon: React.ElementType; color: string }> = {
  Easy: { icon: Star, color: 'bg-green-100 text-green-800 border-green-300' },
  Medium: { icon: Star, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  Hard: { icon: Star, color: 'bg-red-100 text-red-800 border-red-300' },
};

export function QuestionDisplay({ questions }: QuestionDisplayProps) {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {questions.map((q, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-card overflow-hidden">
          <AccordionTrigger className="p-4 hover:no-underline hover:bg-accent/10 text-left flex justify-between items-center">
            <span className="flex-1 font-medium text-base mr-4">{q.question}</span>
            <div className="flex items-center space-x-2 shrink-0">
              <DifficultyBadge difficulty={q.difficulty} />
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 accordion-chevron" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0 space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-primary flex items-center">
                <BrainCircuit className="h-4 w-4 mr-2" /> Evaluation Criteria
              </h4>
              <p className="text-muted-foreground text-sm">{q.evaluationCriteria}</p>
            </div>
            {q.skillAreas && q.skillAreas.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-primary">Skill Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {q.skillAreas.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
       <style jsx>{`
        .accordion-chevron {
          transition: transform 0.2s ease-in-out;
        }
        [data-state=open] .accordion-chevron {
          transform: rotate(180deg);
        }
      `}</style>
    </Accordion>
  );
}


const DifficultyBadge = ({ difficulty }: { difficulty: 'Easy' | 'Medium' | 'Hard' }) => {
    const { icon: Icon, color } = difficultyMap[difficulty];
    // Use Tailwind JIT mode detection requires full class names
    const bgColor = difficulty === 'Easy' ? 'bg-green-100' : difficulty === 'Medium' ? 'bg-yellow-100' : 'bg-red-100';
    const textColor = difficulty === 'Easy' ? 'text-green-800' : difficulty === 'Medium' ? 'text-yellow-800' : 'text-red-800';
    const borderColor = difficulty === 'Easy' ? 'border-green-300' : difficulty === 'Medium' ? 'border-yellow-300' : 'border-red-300';

    return (
        <Badge variant="outline" className={`flex items-center space-x-1 ${bgColor} ${textColor} ${borderColor}`}>
            <Icon className="h-3 w-3" />
            <span>{difficulty}</span>
        </Badge>
    );
}
