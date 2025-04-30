import { Link } from 'react-router-dom';

function QuestionList({ questions }) {
  return (
    <div className="app-container">
      <h1>Generated Questions</h1>
      <Link to="/">← Go Back</Link>
      <div className="questions-container">
        {questions?.length === 0 ? (
          <p>No questions found. Please generate some first.</p>
        ) : (
          questions?.map((q, index) => (
            <div className="question-card" key={index}>
              <h3>Skill: {q?.skill}</h3>
              <p><strong>Question:</strong> {q?.question}</p>
              <p><strong>Evaluation Criteria:</strong> {q.evaluationCriteria}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuestionList;
