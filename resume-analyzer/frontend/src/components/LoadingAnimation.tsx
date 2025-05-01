import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <div className="flex flex-col items-center relative">
        {/* Elegant animated loader */}
        <div className="relative w-40 h-40 mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin" style={{animationDuration: '3s', borderRadius: '50%'}}></div>
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border-2 border-blue-400 opacity-70 animate-ping" style={{animationDuration: '2s', animationIterationCount: 'infinite'}}></div>
          
          {/* Inner blue circle */}
          <div className="absolute inset-4 rounded-full bg-blue-50 flex items-center justify-center shadow-inner">
            {/* Document icon */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute bg-white w-12 h-14 rounded-md shadow-sm transform -rotate-6"></div>
              <div className="absolute bg-white w-12 h-14 rounded-md shadow-sm transform rotate-3">
                {/* Document lines */}
                <div className="absolute top-3 left-2 w-6 h-0.5 bg-blue-200 rounded-full"></div>
                <div className="absolute top-5 left-2 w-8 h-0.5 bg-blue-200 rounded-full"></div>
                <div className="absolute top-7 left-2 w-7 h-0.5 bg-blue-200 rounded-full"></div>
                <div className="absolute top-9 left-2 w-6 h-0.5 bg-blue-200 rounded-full"></div>
              </div>
              <div className="absolute bg-white w-12 h-14 rounded-md shadow z-10">
                {/* Document lines */}
                <div className="absolute top-3 left-2 w-8 h-0.5 bg-blue-300 rounded-full"></div>
                <div className="absolute top-5 left-2 w-6 h-0.5 bg-blue-300 rounded-full"></div>
                <div className="absolute top-7 left-2 w-8 h-0.5 bg-blue-300 rounded-full"></div>
                <div className="absolute top-9 left-2 w-5 h-0.5 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated typing text */}
        <h3 className="text-2xl font-medium text-blue-600 mb-3 text-center relative">
          Analyzing Resume
        </h3>
        
        <p className="text-sm text-gray-500 text-center max-w-xs">
          Our AI is extracting information from your resume...
        </p>
        
        {/* Progress dots */}
        <div className="flex space-x-2 mt-5">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 