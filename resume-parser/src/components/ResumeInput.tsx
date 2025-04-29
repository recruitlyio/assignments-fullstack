
import React, { useState } from 'react';

// Define the props the component expects
interface ResumeInputProps {
  onSubmit: (resumeText: string) => void; // Function to call when form is submitted
  isLoading: boolean; // Flag to disable input/button during API call
}

const ResumeInput: React.FC<ResumeInputProps> = ({ onSubmit, isLoading }) => {
  // State to hold the text entered in the textarea
  const [resumeText, setResumeText] = useState('');

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default page reload
    if (!resumeText.trim()) {
      alert('Please paste some resume text before parsing.'); // Simple validation
      return;
    }
    // Call the onSubmit prop function passed from App.tsx
    onSubmit(resumeText);
  };

  return (
    <form onSubmit={handleSubmit} className="resume-input-form">
      <label htmlFor="resumeText">Paste Resume Text Below:</label>
      <textarea
        id="resumeText"
        rows={15} // Adjust rows as needed for desired height
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste the plain text of the resume here..."
        disabled={isLoading} // Disable textarea when loading
        required // HTML5 validation attribute
      />
      <button type="submit" disabled={isLoading}>
        {/* Change button text based on loading state */}
        {isLoading ? 'Parsing...' : 'Parse Resume'}
      </button>
    </form>
  );
};

export default ResumeInput;