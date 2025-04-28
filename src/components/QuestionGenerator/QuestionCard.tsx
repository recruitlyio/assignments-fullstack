import React, { useState } from 'react';
import { Question } from '../../types';
import { ChevronDown, ChevronUp, Clock, BarChart } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

const difficultyColors: Record<string, { light: string; dark: string }> = {
  easy: {
    light: 'bg-green-100 text-green-800',
    dark: 'dark:bg-green-900 dark:text-green-300'
  },
  medium: {
    light: 'bg-blue-100 text-blue-800',
    dark: 'dark:bg-blue-900 dark:text-blue-300'
  },
  hard: {
    light: 'bg-orange-100 text-orange-800',
    dark: 'dark:bg-orange-900 dark:text-orange-300'
  },
  expert: {
    light: 'bg-red-100 text-red-800',
    dark: 'dark:bg-red-900 dark:text-red-300'
  }
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    const colors = difficultyColors[difficulty];
    return `${colors.light} ${colors.dark}`;
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-5 bg-white dark:bg-gray-800 cursor-pointer transition-colors duration-200" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficultyLevel)}`}>
                {question.difficultyLevel.charAt(0).toUpperCase() + question.difficultyLevel.slice(1)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                {question.skillArea.name}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{question.title}</h3>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{question.timeEstimate}</span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">{question.description}</p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={expanded ? "Collapse question details" : "Expand question details"}
          >
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BarChart className="h-4 w-4 text-gray-700 dark:text-gray-300 mr-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Evaluation Criteria</h4>
            </div>
            <div className="space-y-3">
              {question.evaluationCriteria.map((criteria) => (
                <div key={criteria.id} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">{criteria.description}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                      <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Passing Criteria</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{criteria.passingCriteria}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded">
                      <p className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">Excellent Criteria</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{criteria.excellentCriteria}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;