import React from 'react';
import { ParseError } from '../types/resume';

interface ErrorMessagesProps {
  errors: ParseError[];
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium text-gray-700 mb-2">Processing Notes:</h3>
      <div className="space-y-2">
        {errors.map((err, index) => (
          <div
            key={index}
            className={`${
              err.severity === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'
            } border px-4 py-3 rounded-lg text-sm`}
          >
            {err.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessages; 