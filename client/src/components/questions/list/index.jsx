import QuestionListItemComponent from "./listItem";

const QuestionListComponent = ({ questions }) => {
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Interview Questions</h2>
        {questions?.length > 0 ? (
          questions.map((q, idx) => (
            <QuestionListItemComponent q={q} idx={idx} key={idx} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <img
              src="https://img.freepik.com/free-photo/robot-with-interrogation-symbol_1048-3548.jpg?t=st=1745915636~exp=1745919236~hmac=6bc698911eadfc6e5499d8b3de909cbf341776a1698fdada2858b0f41d6cd687&w=996"
              alt="No data found"
              className="w-60 h-auto"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionListComponent;
