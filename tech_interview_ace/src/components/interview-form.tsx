'use client';

import type { QuestionGenerationInput } from '@/ai/flows/question-generation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  jobRequirements: z.string().min(20, {
    message: 'Job requirements must be at least 20 characters.',
  }).max(5000, {
    message: 'Job requirements must not exceed 5000 characters.'
  }),
  experienceLevel: z.enum(['Entry', 'Mid', 'Senior'], {
    required_error: 'You need to select an experience level.',
  }),
});

type InterviewFormProps = {
  onSubmit: (data: QuestionGenerationInput) => Promise<void>;
  isLoading: boolean;
};

export function InterviewForm({ onSubmit, isLoading }: InterviewFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRequirements: '',
      experienceLevel: 'Mid',
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    await onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the job description or list key required skills here..."
                  className="min-h-[150px] resize-y"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Provide details about the role, required skills, and responsibilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Candidate Experience Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 md:flex-row md:space-x-4 md:space-y-0"
                  disabled={isLoading}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Entry" />
                    </FormControl>
                    <FormLabel className="font-normal">Entry</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Mid" />
                    </FormControl>
                    <FormLabel className="font-normal">Mid-Level</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Senior" />
                    </FormControl>
                    <FormLabel className="font-normal">Senior</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Questions'
          )}
        </Button>
      </form>
    </Form>
  );
}
