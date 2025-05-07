import { FC, useEffect, useState } from "react";
import { ViewCandidateDetails } from "../candidate/common/components/view-candidate-details";
import { useMutation } from "react-query";
import { QuestionsAndAnswersForm } from "./components/questions-and-answers-form";
import { TQuestionAndAnswers } from "./types";
import { initInterviewApi } from "./api/init";
import { Selext } from "@/ui/input/selext";
import { FormLabel } from "@/ui/form-label";
import { Loading } from "../app/loading";
import { TInterviewValidation } from "./validations/interview";
import { notifySuccess } from "@/utility/toast";
import { saveInterviewApi } from "./api/save";
interface IInterviewFeatureProps {
  candidateId: string;
}

export const InterviewFeature: FC<IInterviewFeatureProps> = ({
  candidateId,
}) => {
  const [candidateName, setCandidateName] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [questionsAndAnswers, setQuestionsAndAnswers] =
    useState<TQuestionAndAnswers>([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [interviewId, setInterviewId] = useState("");
  const initInterviewMutation = useMutation(initInterviewApi, {
    onSuccess: (data) => {
      data.data && data.data.questionsAndAnswers
        ? setQuestionsAndAnswers(data.data.questionsAndAnswers)
        : [];
      data.data && data.data.candidate && data.data.candidate.name
        ? setCandidateName(data.data.candidate.name)
        : [];
      data.data &&
      data.data.candidate &&
      data.data.candidate.experienceMonths &&
      data.data.candidate.exprerienceYears
        ? setExperience(
            data.data.candidate.exprerienceYears +
              " Years " +
              data.data.candidate.experienceMonths +
              " Months"
          )
        : [];

      data.data && data.data.interview & data.data.interview._id
        ? setInterviewId(data.data.interview._id)
        : [];
    },
  });

  const saveInterviewMutation = useMutation(saveInterviewApi, {
    onSuccess: () => {
      notifySuccess("Success.");
    },
  });

  useEffect(() => {
    if (candidateId && !initInterviewMutation.isLoading)
      initInterviewMutation.mutate({ candidateId });
  }, []);

  const onSubmitForm = (data: TInterviewValidation) => {
    saveInterviewMutation.mutate(data);
  };

  return (
    <>
      {initInterviewMutation.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-center">
            <ViewCandidateDetails
              experience={experience}
              name={candidateName}
            />
          </div>
          <div className="flex justify-center pt-4">
            <div className="w-72">
              <FormLabel text={`Difficulty:${difficulty}`} />
              <Selext
                onChange={(val) => {
                  setDifficulty(val as string);
                  initInterviewMutation.mutate({
                    candidateId,
                    difficulty: val as string,
                  });
                }}
                options={[
                  { label: "Easy", value: "Easy" },
                  { label: "Medium", value: "Medium" },
                  { label: "Hard", value: "Hard" },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <QuestionsAndAnswersForm
              questionsAndAnswers={questionsAndAnswers}
              candidateId={candidateId}
              onSubmitForm={onSubmitForm}
              interviewId={interviewId}
            />
          </div>
        </>
      )}
    </>
  );
};
