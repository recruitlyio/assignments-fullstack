import { FC } from "react";
import { CandidateInformationForm } from "./components/candidate-information-form";
import { useMutation } from "react-query";
import { createCandidatesApi } from "./api/create";
import { TCandidateInformation } from "./validations/candidate-information-form";
import { notifySuccess } from "@/utility/toast";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@/features/app/breadcrumbs";
import { PageHeading } from "@/features/app/page-heading";

export const CreateCandidateFeature: FC = () => {
  const router = useRouter();
  const createCandidateMutation = useMutation(createCandidatesApi);
  return (
    <>
      <div className="pl-8">
        <PageHeading
          breadcrumbs={[
            { link: "/", text: "Home" },
            {
              link: "/candidate/create",
              text: "Create Candidate",
              linkDisabled: true,
            },
          ]}
          headingText="Create Candidate"
        />
      </div>

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
