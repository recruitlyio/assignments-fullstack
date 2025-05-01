import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const JobApplicationResponse = ({ apiResponse }: { apiResponse: string }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} children={apiResponse} />
    </div>
  );
};

export default JobApplicationResponse;
