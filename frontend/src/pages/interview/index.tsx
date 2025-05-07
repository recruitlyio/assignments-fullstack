import { Loading } from "@/features/app/loading";
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
      <QueryClientProvider client={queryClient}>
        <div>
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
