import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Resume Parser - AI-powered resume analysis tool
        </div>
      </div>
    </footer>
  );
};

export default Footer; 