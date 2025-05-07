import { FC } from "react";
import { CandidateInformationForm } from "./components/candidate-information-form";
import { useMutation } from "react-query";
import { createCandidatesApi } from "./api/create";
import { TCandidateInformation } from "./validations/candidate-information-form";
import { notifySuccess } from "@/utility/toast";
import { useRouter } from "next/router";

export const CreateCandidateFeature: FC = () => {
  const router = useRouter();
  const createCandidateMutation = useMutation(createCandidatesApi);
  return (
    <>
      <CandidateInformationForm
        onSubmitForm={(data: TCandidateInformation) => {
          createCandidateMutation.mutate(data, {
            onSuccess: (data) => {
              notifySuccess("Success");
              router.push(`/interview?candidateId=${data.data.id}`);
            },
          });
        }}
        isLoading={createCandidateMutation.isLoading}
      />
    </>
  );
};
