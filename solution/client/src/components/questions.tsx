import { Questions as QuestionsType } from "@/types";

export const QuestionsTab = ({
  question,
  difficulty,
  skills,
  evaluationCriteria,
}: QuestionsType) => {
  return (
    <li className="mb-2 border-2 rounded-md shadow-lg border-slate-500 p-2">
      {question}
      <div className="mt-2">
        <strong>Evaluation Criteria:</strong> {evaluationCriteria}
      </div>
      <div className="flex space-x-1.5 my-2">
        {skills.split(",").map((x, index) => {
          return (
            <div
              className="bg-red-400 px-2 py-0.5 rounded-md text-sm"
              key={index}
            >
              {x.trim()}
            </div>
          );
        })}
      </div>
      <div className="bg-red-400 px-2 py-0.5 rounded-md w-fit text-sm">
        {difficulty}
      </div>
    </li>
  );
};
