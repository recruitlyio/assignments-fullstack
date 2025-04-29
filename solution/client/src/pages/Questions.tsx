import { Loading } from "@/components/loading";
import { SelectDifficulty } from "@/components/select-difficulty";
import { SelectSkills } from "@/components/select-skills";
import { useFilter } from "@/hooks/useFilter";
import { FilterDifficulty, Questions as QuestionsType } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function Questions() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [difficulty, setDifficulty] = useState<FilterDifficulty>("");
  const [skills, _setSkills] = useState(
    searchParams
      .get("skills")
      ?.split(",")
      .map((x) => x.trim())
  );
  const [filterSkill, setFilterSkill] = useState("");

  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  const { filteredResults } = useFilter({
    skill: filterSkill,
    difficulty: difficulty,
    questions,
  });

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/questions?fullName=${encodeURIComponent(
          searchParams.get("fullName") || ""
        )}&email=${encodeURIComponent(
          searchParams.get("email") || ""
        )}&location=${encodeURIComponent(
          searchParams.get("location") || ""
        )}&relocate=${searchParams.get("relocate")}&remote=${searchParams.get(
          "remote"
        )}&currentTitle=${encodeURIComponent(
          searchParams.get("currentTitle") || ""
        )}&experienceYears=${encodeURIComponent(
          searchParams.get("experienceYears") || ""
        )}&skills=${encodeURIComponent(
          searchParams.get("skills") || ""
        )}&preferredRoles=${encodeURIComponent(
          searchParams.get("preferredRoles") || ""
        )}&jobType=${encodeURIComponent(
          searchParams.get("jobType ") || ""
        )}&startDate=${encodeURIComponent(searchParams.get("startDate") || "")}`
      );
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }

    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    fetchQuestions();
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Questions</h2>
      <p>Here are some questions for you:</p>
      <div className="flex space-x-5">
        <SelectSkills skills={skills ?? []} setSkill={setFilterSkill} />
        <SelectDifficulty setDifficulty={setDifficulty} />
      </div>
      {loading && <Loading />}
      {!loading && (
        <ul className="list-disc pl-5">
          {filteredResults?.map(
            ({ question, evaluationCriteria }, index: number) => (
              <li key={index} className="mb-2">
                {question}
                <div className="mt-2">
                  <strong>Evaluation Criteria:</strong> {evaluationCriteria}
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
