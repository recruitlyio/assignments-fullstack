import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  TInterviewValidation,
  interviewValidations,
} from "../validations/interview";
import { FormLabel } from "@/ui/form-label";
import { TQuestionAndAnswers } from "../types";

interface QuestionsAndAnswersFormProps {
  questionsAndAnswers: TQuestionAndAnswers;
  candidateId: string;
  interviewId: string;
  onSubmitForm: (data: TInterviewValidation) => void;
}

export const QuestionsAndAnswersForm: FC<QuestionsAndAnswersFormProps> = ({
  candidateId,
  questionsAndAnswers,
  interviewId,
  onSubmitForm,
}) => {
  const {
    setValue,
    getValues,
    handleSubmit,
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TInterviewValidation>({
    resolver: zodResolver(interviewValidations),
  });
  const questionsAndAnswersFieldsArray = useFieldArray({
    control,
    name: "questionsAndAnswers",
  });
  console.log({ errors });
  useEffect(() => {
    setValue("candidateId", candidateId);
    setValue("interviewId", interviewId);
    if (questionsAndAnswers && questionsAndAnswers.length)
      questionsAndAnswers?.forEach((qA) => {
        questionsAndAnswersFieldsArray.append({
          answers: qA.answer,
          marksObtained: 0,
          maxMarks: qA.maxMarks,
          question: qA.question,
        });
      });
  }, []);

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmitForm)}>
        {questionsAndAnswersFieldsArray.fields.map((item, index) => (
          <div className="pt-4">
            <div
              key={index}
              className="border rounded-2xl p-4 shadow bg-white "
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">
                Q{index + 1}: {item.question}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-medium">Answer:</span> {item.answers}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Max Marks:</span> {item.maxMarks}{" "}
              </div>
              <div className="pt-4">
                <FormLabel text="Obtained Marks" />
                <input
                  {...register(`questionsAndAnswers.${index}.marksObtained`)}
                  type="number"
                  placeholder="Id"
                  className="shadow appearance-none border border-black py-2 px-3 text-gray-700 leading-tight focus:border-primary focus:border-2 focus:outline-none rounded-md focus:ring-2"
                />
                {errors.questionsAndAnswers &&
                  errors.questionsAndAnswers[index] && (
                    <p className="text-red-500 text-xs italic">
                      {errors.questionsAndAnswers[index]?.message}
                    </p>
                  )}
              </div>
            </div>
          </div>
        ))}
        <div className="pt-4 flex justify-center">
          <button
            className="h-10 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Finish Interview
          </button>
        </div>
      </form>
    </>
  );
};
