import React from 'react';
import { ValidationError } from '../types';
import { AlertCircle, TriangleAlert } from 'lucide-react';

interface ValidationErrorsDisplayProps {
  errors: ValidationError[];
}

const ValidationErrorsDisplay: React.FC<ValidationErrorsDisplayProps> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold text-yellow-700'>Validation Issues</h2>
      <div className='mt-2 border border-yellow-300 bg-yellow-50 p-4 rounded-md'>
        <ul className='space-y-2'>
          {errors.map((error, index) => (
            <li key={index} className='flex items-start'>
              <div className='flex-shrink-0'>
                {error.level === 'error' ? (
                  <AlertCircle className='h-5 w-5 text-red-400' />
                ) : (
                  <TriangleAlert className='h-5 w-5 text-yellow-400' />
                )}
              </div>
              <div className='ml-3'>
                <p
                  className={`text-sm ${
                    error.level === 'error' ? 'text-red-700' : 'text-yellow-700'
                  }`}
                >
                  <span className='font-medium'>{error.level.toUpperCase()}:</span> {error.message}{' '}
                  ({error.field})
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ValidationErrorsDisplay;
