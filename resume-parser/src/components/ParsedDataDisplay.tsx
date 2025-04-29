// src/components/ParsedDataDisplay.tsx

import React from 'react';
// Import the types defined earlier
import { ValidatedResume, Skill, WorkExperience, Education } from '../types';

// Define the props the component expects
interface ParsedDataDisplayProps {
  data: ValidatedResume | null; // The parsed data or null if none
  error: string | null; // Error message string or null
  isLoading: boolean; // Flag to show loading state
}

const ParsedDataDisplay: React.FC<ParsedDataDisplayProps> = ({ data, error, isLoading }) => {
  // Show loading indicator
  if (isLoading) {
    return <div className="loading">Parsing in progress... Please wait.</div>;
  }

  // Show error message if present
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Show placeholder if no data and no error
  if (!data) {
    return <div className="placeholder">Results will appear here after parsing.</div>;
  }

  // Helper function to render optional string fields or a placeholder
  const renderOptional = (value?: string) => value || <span className="not-provided">N/A</span>;

  // Check if all data sections are effectively empty
  const isEmptyData = (!data.skills || data.skills.length === 0) &&
                      (!data.workExperience || data.workExperience.length === 0) &&
                      (!data.education || data.education.length === 0);

  return (
    <div className="parsed-data-container">
      <h2>Parsed Resume Data</h2>

      {/* Display Validation Notes First */}
      {data.validationNotes && data.validationNotes.length > 0 && (
        <div className="section validation-notes">
          <h3>Validation Notes:</h3>
          <ul>
            {data.validationNotes.map((note, index) => (
              <li key={`note-${index}`}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="section skills-section">
          <h3>Skills</h3>
          <ul>
            {data.skills.map((skill: Skill, index: number) => (
              <li key={`skill-${index}`}>
                {skill.name} {skill.proficiency && `(${skill.proficiency})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <div className="section experience-section">
          <h3>Work Experience</h3>
          {data.workExperience.map((exp: WorkExperience, index: number) => (
            <div key={`exp-${index}`} className="experience-item">
              <h4>{renderOptional(exp.role)} at {renderOptional(exp.company)}</h4>
              <p>
                <em>
                  {renderOptional(exp.startDate)} - {renderOptional(exp.endDate)}
                  {exp.duration && ` (${exp.duration})`}
                </em>
              </p>
              {/* Render description only if it exists */}
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Display Education */}
      {data.education && data.education.length > 0 && (
        <div className="section education-section">
          <h3>Education</h3>
          {data.education.map((edu: Education, index: number) => (
            <div key={`edu-${index}`} className="education-item">
              <h4>{renderOptional(edu.degree)}</h4>
              <p>{renderOptional(edu.institution)}</p>
              <p><em>Graduation: {renderOptional(edu.graduationDate)}</em></p>
              {/* Render details only if they exist */}
              {edu.details && <p>{edu.details}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Message if parsing succeeded but no structured data was found */}
      {isEmptyData && (!error) && (!data.validationNotes || data.validationNotes.length === 0) &&
        <p className="placeholder">Parsing complete, but no structured Skills, Experience, or Education data could be extracted from the provided text.</p>
       }
    </div>
  );
};

export default ParsedDataDisplay;