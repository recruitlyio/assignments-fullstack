import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-gray-800">
            <span className="text-blue-600">Resume</span>Parser
          </h1>
          <div className="text-sm text-gray-600">AI-powered resume parsing</div>
        </div>
      </div>
    </header>
  );
};

export default Header; 