import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${checked ? 'bg-blue-600' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => onChange(!checked)}
        >
          <span
            aria-hidden="true"
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${checked ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && (
            <label className={`font-medium text-gray-700 ${disabled ? 'opacity-50' : ''}`}>
              {label}
            </label>
          )}
          {description && (
            <p className={`text-gray-500 ${disabled ? 'opacity-50' : ''}`}>{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Switch;