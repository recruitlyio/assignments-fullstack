import React, { useEffect, useState } from "react";
import ListCandidateTable from "./components/list-candidate-table";
import { useMutation } from "react-query";
import { listCandidatesApi } from "./api/list";

import { TCandidate } from "../common/types";
import { useRouter } from "next/router";
import { PageHeading } from "@/features/app/page-heading";

export const ListCandidateFeature: React.FC = () => {
  const router = useRouter();
  const [candidates, setCandidates] = useState<TCandidate[]>([]);
  const listCandidatesMutation = useMutation(listCandidatesApi, {
    onSuccess: (data) => {
      setCandidates(data.data);
    },
  });

  useEffect(() => {
    listCandidatesMutation.mutate();
  }, []);

  return (
    <div className="p-6">
      <div className="pl-8 pb-4">
        <PageHeading
          breadcrumbs={[
            { link: "/", text: "Home" },
            {
              link: "/candidate/list",
              text: "List Candidates",
              linkDisabled: true,
            },
          ]}
          headingText="List Candidates"
        />
      </div>
      {listCandidatesMutation.isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {candidates.length ? (
            <ListCandidateTable data={candidates} />
          ) : (
            <>
              <div className="flex justify-center">
                No Candidates Found. Please create one
              </div>
              <div className="pt-4 flex justify-center">
                <button
                  className="h-10 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => router.push(`/candidate/create`)}
                >
                  <>Create Candidate</>
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
