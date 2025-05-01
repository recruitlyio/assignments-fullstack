import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface FormProgressProps {
  steps: {
    id: string;
    label: string;
    isComplete: boolean;
    isActive: boolean;
    hasError?: boolean;
  }[];
}

const FormProgress: React.FC<FormProgressProps> = ({ steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300 ${
                  step.isActive
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : step.isComplete
                    ? 'border-green-500 bg-green-500 text-white'
                    : step.hasError
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {step.isComplete ? (
                  <Check className="w-4 h-4" />
                ) : step.hasError ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step.isActive
                    ? 'text-blue-600'
                    : step.isComplete
                    ? 'text-green-600'
                    : step.hasError
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`flex-grow h-[2px] transition-colors duration-300 ${
                  steps[index + 1].isComplete || steps[index + 1].isActive
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;