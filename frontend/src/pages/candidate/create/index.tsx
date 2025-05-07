import Navbar from "@/features/app/navbar";
import { CreateCandidateFeature } from "@/features/candidate/create";
import { QueryClient, QueryClientProvider } from "react-query";

export default function CreateCandidatePage() {
  const queryClient = new QueryClient();
  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <CreateCandidateFeature />
      </QueryClientProvider>
    </>
  );
}
