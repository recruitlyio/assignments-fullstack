import { GeneratedQuestion } from "../types";
interface Props extends GeneratedQuestion {
  number: number;
}
export default function QuestionCard({ number, question, difficulty, evaluationCriteria }: Props) {

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">📌 Question {number}</h2>
      <p className="text-gray-700">{question}</p>
      <p className="text-sm text-gray-500"><strong>Difficulty:</strong> {difficulty}</p>
      <p className="text-sm text-gray-500"><strong>Evaluation Criteria:</strong> {evaluationCriteria}</p>
    </div>
  );
}
