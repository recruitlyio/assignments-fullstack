import Navbar from "@/features/app/navbar";
import { CreateCandidateFeature } from "@/features/candidate/create";
import { ListCandidateFeature } from "@/features/candidate/list";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ListCandidatePage() {
  const queryClient = new QueryClient();
  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <ListCandidateFeature />
      </QueryClientProvider>
    </>
  );
}
