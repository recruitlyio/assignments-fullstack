"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { generateQuestions } from "@/app/actions";

import { LoadingSkeleton } from "./loading-skeleton";
import { AccordionQnA } from "./accordion-qna";

const FormSchema = z.object({
  jobRequirements: z.string().min(1, {
    message: "Requirements is required.",
  }),
  experienceLevel: z.enum(["junior", "mid-level", "senior"], {
    message: "Please select the candidate's experience level.",
  }),
});

type ResponseType = {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  evaluationCriteria: string;
};

const ExperienceLevelMapping = {
  junior: "Junior",
  "mid-level": "Mid-Level",
  senior: "Senior",
};

export function RequirementsForm() {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<ResponseType[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const response = await generateQuestions(
        data.jobRequirements,
        data.experienceLevel
      );
      setResponse(response);
    });
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[90%] mx-auto h-[calc(100vh-3rem)]">
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2 h-full"
              >
                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Experience Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="text-sm pl-2">
                              Select Experience Level
                            </SelectLabel>
                          </SelectGroup>
                          {Object.entries(ExperienceLevelMapping).map(
                            ([key, value]) => (
                              <SelectItem value={key} key={key}>
                                {value}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobRequirements"
                  render={({ field }) => (
                    <FormItem className="flex-1 my-4">
                      <FormControl>
                        <Textarea
                          placeholder="Enter your job requirements here..."
                          className="h-full resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPending ? "Generating Questions..." : "Generate"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Interview Questions
            </h2>
            {isPending ? (
              <>
                {[1, 2, 3].map((num) => (
                  <LoadingSkeleton key={num} />
                ))}
              </>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {response.map(
                  ({ question, difficulty, evaluationCriteria }, index) => (
                    <AccordionQnA
                      key={index}
                      index={index}
                      question={question}
                      difficulty={difficulty}
                      evaluationCriteria={evaluationCriteria}
                    />
                  )
                )}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
