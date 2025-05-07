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
import { InterviewStatusEnum } from "@/types";
import { InterviewStatus } from "./components/interview-status";
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
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [hasInterviewFinished, setHasInterviewFinished] = useState(false);
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

      if (data?.data?.interview?.id) {
        setInterviewId(data.data.interview.id);
      }

      if (
        data.data &&
        data.data.interview.status &&
        data.data.interview.status === InterviewStatusEnum.Finished
      ) {
        setHasInterviewFinished(true);
        setQuestionsAndAnswers(data.data.interview?.questionsAndAnswers || []);
      }
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
    console.log(data);
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

          {hasInterviewFinished ? (
            <>
              <InterviewStatus questionsAndAnswers={questionsAndAnswers} />
            </>
          ) : (
            <>
              {interviewId ? (
                <>
                  <div className="flex justify-center pt-8">
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

                    <QuestionsAndAnswersForm
                      questionsAndAnswers={questionsAndAnswers}
                      candidateId={candidateId}
                      onSubmitForm={onSubmitForm}
                      interviewId={interviewId}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
