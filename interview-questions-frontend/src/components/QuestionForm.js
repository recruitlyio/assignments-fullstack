// src/components/QuestionForm.js
import React, { useState, useEffect } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobRequirements: '',
    experienceLevel: 'mid',
    numberOfQuestions: 3,
  });
  
  const [llmStatus, setLlmStatus] = useState({
    checked: false,
    enabled: false,
    provider: ''
  });

  useEffect(() => {
    // Check if LLM is configured on the server
    const checkLlmStatus = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/llm-status');
        const data = await response.json();
        setLlmStatus({
          checked: true,
          enabled: data.llmConfigured,
          provider: data.provider
        });
      } catch (error) {
        console.error('Error checking LLM status:', error);
        setLlmStatus({
          checked: true,
          enabled: false,
          provider: 'Unknown'
        });
      }
    };

    checkLlmStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      {llmStatus.checked && (
        <div className={`llm-status ${llmStatus.enabled ? 'llm-enabled' : 'llm-disabled'}`}>
          <span className="llm-indicator"></span>
          {llmStatus.enabled 
            ? `Enhanced generation with ${llmStatus.provider} is active` 
            : 'Using basic rule-based generation (LLM not configured)'}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="e.g., Frontend Developer, Data Scientist"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobRequirements">Job Requirements:</label>
        <textarea
          id="jobRequirements"
          name="jobRequirements"
          value={formData.jobRequirements}
          onChange={handleChange}
          placeholder="List technical skills and requirements for the position..."
          required
          rows={5}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="experienceLevel">Candidate Experience Level:</label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
        >
          <option value="entry">Entry Level (0-2 years)</option>
          <option value="mid">Mid Level (3-5 years)</option>
          <option value="senior">Senior Level (6+ years)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="numberOfQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numberOfQuestions"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          onChange={handleChange}
          min="1"
          max="10"
        />
      </div>

      <button type="submit" className="submit-button">Generate Questions</button>
    </form>
  );
};

export default QuestionForm;