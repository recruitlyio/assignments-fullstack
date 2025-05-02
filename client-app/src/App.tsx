import { useState } from 'react';
import ResumeInputForm from './components/ResumeInputForm';
import ParsedDataDisplay from './components/ParsedDataDisplay';
import ValidationErrorsDisplay from './components/ValidationErrorsDisplay';
import { handleParseResume } from './api-function';
import { ParsedResumeData } from './types';

function App() {
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParseSubmit = async (data: { resumeText: string }) => {
    setIsLoading(true);
    setError(null);
    setParsedData(null);

    try {
      const result = await handleParseResume(data.resumeText);
      setParsedData(result.data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during parsing.');
      console.error('Parsing Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
      <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
        Intelligent Resume Parser
      </h1>

      <div className='bg-white shadow sm:rounded-lg p-6'>
        <ResumeInputForm onSubmit={handleParseSubmit} isLoading={isLoading} />
      </div>

      {error && (
        <div
          className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'
          role='alert'
        >
          <span className='font-bold'>Error:</span> {error}
        </div>
      )}
      {parsedData && parsedData?.validationErrors?.length > 0 && (
        <ValidationErrorsDisplay errors={parsedData.validationErrors} />
      )}

      {parsedData && <ParsedDataDisplay data={parsedData} />}
    </div>
  );
}

export default App;
