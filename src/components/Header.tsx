
import React from "react";
import { Code } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-navy-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-8 h-8" />
          <h1 className="text-2xl font-bold">SkillQuest</h1>
        </div>
        <div className="text-sm">Technical Interview Question Generator</div>
      </div>
    </header>
  );
};

export default Header;
