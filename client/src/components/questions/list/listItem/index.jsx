import ChipComponent from "../../../general/chip";

const QuestionListItemComponent = ({ q, idx }) => {
  return (
    <div
      key={q._id}
      className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Q.{`${idx + 1})`} {q.question}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Job Title:</strong> {q.jobTitle} | <strong>Skill:</strong>{" "}
        {q.skill}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Difficulty:</strong> <ChipComponent level={q.difficulty} />
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Evaluation Criteria:</strong> {q.evaluationCriteria}
      </p>
      <p className="text-xs text-gray-400">
        <strong>Created:</strong>{" "}
        {new Date(q.createdAt).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default QuestionListItemComponent;
