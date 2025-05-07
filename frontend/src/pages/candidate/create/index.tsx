import { CreateCandidateFeature } from "@/features/candidate/create";
import { QueryClient, QueryClientProvider } from "react-query";

export default function CreateCandidatePage() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CreateCandidateFeature />
      </QueryClientProvider>
    </>
  );
}
