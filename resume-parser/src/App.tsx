// src/App.tsx

import  { useState } from 'react';
import ResumeInput from './components/ResumeInput'; // Import component
import ParsedDataDisplay from './components/ParsedDataDisplay'; // Import component
import { parseResumeApi } from './services/api'; // Import API function
import { ValidatedResume } from './types'; // Import type definition
import './App.css'; // Import main CSS file

function App() {
  // State for the parsed data received from API
  const [parsedData, setParsedData] = useState<ValidatedResume | null>(null);
  // State to track if API call is in progress
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // Function passed to ResumeInput, triggered on form submit
  const handleParseSubmit = async (resumeText: string) => {
    setIsLoading(true); // Set loading state
    setError(null); // Clear previous errors
    setParsedData(null); // Clear previous results

    try {
      // Call the API service function
      const result = await parseResumeApi(resumeText);
      // Update state with the result on success
      setParsedData(result);
    } catch (err: any) {
      // Update state with the error message on failure
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      // Always set loading state back to false when done
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Simple header inspired by Recruitly name/aesthetic */}
        <h1><span className="logo-r">R</span>ecruitly Resume Parser</h1>
      </header>
      <main>
        {/* Render the input component */}
        <ResumeInput onSubmit={handleParseSubmit} isLoading={isLoading} />
        {/* Render the display component, passing current state */}
        <ParsedDataDisplay data={parsedData} error={error} isLoading={isLoading} />
      </main>
      <footer>
        {/* Optional footer */}
        <p>Powered by Recruitly AI</p>
      </footer>
    </div>
  );
}

export default App;