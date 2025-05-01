import React from 'react';

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  isLoading, 
  disabled, 
  type = 'button', 
  onClick,
  children,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white';
  const enabledClasses = 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const disabledClasses = 'bg-blue-400 cursor-not-allowed';
  
  const buttonClasses = `${baseClasses} ${disabled || isLoading ? disabledClasses : enabledClasses} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClasses}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  );
};

export default LoadingButton; 