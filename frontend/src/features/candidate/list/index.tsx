import React, { useEffect, useState } from "react";
import ListCandidateTable from "./components/list-candidate-table";
import { useMutation } from "react-query";
import { listCandidatesApi } from "./api/list";

import { TCandidate } from "../common/types";

export const ListCandidateFeature: React.FC = () => {
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
      <h1 className="text-xl font-bold mb-4">Candidate List</h1>
      {listCandidatesMutation.isLoading ? (
        <>Loading...</>
      ) : (
        <ListCandidateTable data={candidates} />
      )}
    </div>
  );
};
