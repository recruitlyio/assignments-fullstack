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
    <div className="max-w-2xl mx-auto p-6 space-y-6 border-2 border-slate-500 shadow-2xl rounded-md my-5">
      <h2 className="text-2xl font-bold mx-5">Questions</h2>
      <p className="mx-5">Here are some questions for you:</p>
      <div className="flex space-x-5 mx-5">
        <SelectSkills skills={skills ?? []} setSkill={setFilterSkill} />
        <SelectDifficulty setDifficulty={setDifficulty} />
      </div>
      {loading && <Loading />}
      {!loading && (
        <ul className="list-disc pl-5 max-h-[500px] overflow-y-scroll scrollbar-hide">
          {filteredResults?.map(
            (
              { question, evaluationCriteria, skills, difficulty },
              index: number
            ) => (
              <li
                key={index}
                className="mb-2 border-2 rounded-md shadow-lg border-slate-500 p-2"
              >
                {question}
                <div className="mt-2">
                  <strong>Evaluation Criteria:</strong> {evaluationCriteria}
                </div>
                <div className="flex space-x-1.5 my-2">
                  {skills.split(",").map((x) => {
                    return (
                      <div className="bg-red-400 px-2 py-0.5 rounded-md text-sm">
                        {x.trim()}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-red-400 px-2 py-0.5 rounded-md w-fit text-sm">
                  {difficulty}
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
