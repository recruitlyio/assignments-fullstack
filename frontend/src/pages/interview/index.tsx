import { Loading } from "@/features/app/loading";
import Navbar from "@/features/app/navbar";
import { PageHeading } from "@/features/app/page-heading";
import { ListCandidateFeature } from "@/features/candidate/list";
import { InterviewFeature } from "@/features/interview";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function InterviewPage() {
  const queryClient = new QueryClient();
  const router = useRouter();
  const [candidateId, setCandidateId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.candidateId) return;
    setCandidateId(router.query.candidateId as string);
  }, [router.query.candidateId]);
  return (
    <>
      <Navbar />
      <div className="pl-8">
        <PageHeading
          breadcrumbs={[
            { link: "/", text: "Home" },
            {
              link: "/candidate/list",
              text: "Candidates",
            },
            {
              link: "/interview",
              text: "Interview",
              linkDisabled: true,
            },
          ]}
          headingText="Interview"
        />
      </div>
      <QueryClientProvider client={queryClient}>
        <div className="pt-10">
          {candidateId ? (
            <>
              <InterviewFeature candidateId={candidateId} />
            </>
          ) : (
            <Loading />
          )}
        </div>
      </QueryClientProvider>
    </>
  );
}
