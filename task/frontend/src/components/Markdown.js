import React from 'react';
import ReactMarkdown from 'react-markdown';

const JobApplicationResponse = ({ apiResponse }) => {

  // Check if apiResponse is an object with `dangerouslySetInnerHTML`
  const content = apiResponse?.props?.dangerouslySetInnerHTML?.__html;

  // If it's HTML content, render using dangerouslySetInnerHTML
  if (content) {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  // If it's just plain text, render using ReactMarkdown
  return (
    <div>
      <ReactMarkdown>{apiResponse}</ReactMarkdown>
    </div>
  );
}

export default JobApplicationResponse;
