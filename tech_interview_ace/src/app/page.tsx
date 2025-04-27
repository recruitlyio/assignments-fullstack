'use client';

import type { QuestionGenerationInput, QuestionGenerationOutput } from '@/ai/flows/question-generation';
import { generateQuestion } from '@/ai/flows/question-generation';
import { useState } from 'react';
import { InterviewForm } from '@/components/interview-form';
import { QuestionDisplay } from '@/components/question-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [questions, setQuestions] = useState<QuestionGenerationOutput['questions'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuestions = async (data: QuestionGenerationInput) => {
    setIsLoading(true);
    setError(null);
    setQuestions(null);
    try {
      const result = await generateQuestion(data);
      setQuestions(result.questions);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Tech Interview Ace</h1>
        <p className="text-lg text-muted-foreground">
          Generate tailored technical interview questions with evaluation criteria.
        </p>
      </header>

      <div className="w-full max-w-4xl space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Generate Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <InterviewForm onSubmit={handleGenerateQuestions} isLoading={isLoading} />
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex justify-center items-center p-8 text-primary">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Generating questions...</span>
          </div>
        )}

        {error && (
           <Alert variant="destructive">
             <Terminal className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        )}

        {questions && questions.length > 0 && (
          <div className="space-y-6">
             <Separator />
             <h2 className="text-2xl font-semibold text-center">Generated Questions</h2>
            <QuestionDisplay questions={questions} />
          </div>
        )}
         {questions && questions.length === 0 && !isLoading && (
           <Alert>
             <Terminal className="h-4 w-4" />
             <AlertTitle>No Questions Generated</AlertTitle>
             <AlertDescription>
                Could not generate questions based on the provided requirements. Please try refining the job description.
             </AlertDescription>
           </Alert>
         )}
      </div>

       <footer className="mt-12 text-center text-muted-foreground text-sm">
           Powered by AI
       </footer>
    </main>
  );
}
