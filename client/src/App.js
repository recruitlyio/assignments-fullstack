import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Junior");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const validateInputs = () => {
    // Reset error state
    setError("");
    
    // Validate job title
    if (!jobTitle || jobTitle.trim() === "") {
      setError("Job title is required");
      return false;
    }
    
    // Validate skills
    if (!skills || skills.trim() === "") {
      setError("At least one skill is required");
      return false;
    }
    
    // Validate skills format
    const skillsArray = skills.split(",").map(s => s.trim());
    if (skillsArray.some(skill => skill === "")) {
      setError("Invalid skills format. Please use comma-separated values");
      return false;
    }
    
    // Validate question count
    const count = parseInt(questionCount);
    if (isNaN(count) || count < 1 || count > 20) {
      setError("Question count must be between 1 and 20");
      return false;
    }
    
    return true;
  };

  const handleGenerate = async () => {
    // Validate inputs before making the request
    if (!validateInputs()) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/generator", {
        jobTitle,
        skills: skills.split(",").map((s) => s.trim()),
        experienceLevel,
        questionCount: parseInt(questionCount)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });

      setQuestions(response.data.questions);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Display specific error from backend
        setError(error.response.data.error);
      } else {
        setError("Error generating questions. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Interview Question Generator</h1>
      
      {/* Display error message if present */}
      {error && <div className="error-message">{error}</div>}
      
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <select
        value={experienceLevel}
        onChange={(e) => setExperienceLevel(e.target.value)}
      >
        <option>Junior</option>
        <option>Mid-level</option>
        <option>Senior</option>
      </select>

      <input
        type="number"
        placeholder="Number of Questions"
        min="1"
        max="20"
        value={questionCount}
        onChange={(e) => setQuestionCount(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <div className="results">
        {questions.map((q, index) => (
          <div key={index} className="question">
            <p>
              <strong>Q{index + 1}:</strong> {q.text}
            </p>
            <p>
              <em>Evaluation:</em> {q.evaluationCriteria}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
