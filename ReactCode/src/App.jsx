import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenerateForm from './pages/GenerateForm';
import QuestionList from './pages/QuestionList';
import { useState } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenerateForm setQuestions={setQuestions} />} />
        <Route path="/questions" element={<QuestionList questions={questions} />} />
      </Routes>
    </Router>
  );
}

export default App;
















// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [role, setRole] = useState('');
//   const [skills, setSkills] = useState('');
//   const [experience, setExperience] = useState('Junior');
//   const [questions, setQuestions] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:4000/api/v1/generate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ role, skills, experience }),
//     });

//     const data = await response.json();
//     setQuestions(data);
//   };

//   return (
//     <div className="app-container">
//       <h1>Technical Interview Question Generator</h1>
//       <form className="form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Role Title (e.g., Frontend Developer)"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Skills (e.g., React, JavaScript)"
//           value={skills}
//           onChange={(e) => setSkills(e.target.value)}
//         />
//         <select value={experience} onChange={(e) => setExperience(e.target.value)}>
//           <option>Junior</option>
//           <option>Mid</option>
//           <option>Senior</option>
//         </select>
//         <button type="submit">Generate Questions</button>
//       </form>

//       <div className="questions-container">
//         {questions.length > 0 && <h2>Generated Questions</h2>}
//         {questions.map((q, index) => (
//           <div className="question-card" key={index}>
//             <h3>Skill: {q.skill}</h3>
//             <p><strong>Question:</strong> {q.question}</p>
//             <p><strong>Evaluation Criteria:</strong> {q.evaluationCriteria}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
