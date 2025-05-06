import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SkillQuest - Technical Interview
          Question Generator
        </p>
      </div>
    </footer>
  );
};

export default Footer;
