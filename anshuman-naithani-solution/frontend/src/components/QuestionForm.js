import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ onQuestionsGenerated, setLoading }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true before API call

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        jobTitle,
        experienceLevel,
      });
      onQuestionsGenerated(response.data);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false); // Stop loading after API call is complete
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Experience Level:
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <br />
      <button type="submit">Generate Questions</button>
    </form>
  );
};

export default QuestionForm;
