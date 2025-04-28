import React, { useState } from 'react';
import { useQuestions } from '../../contexts/QuestionContext';
import { DifficultyLevel, SkillArea } from '../../types';
import { ArrowLeft, Filter, Clock } from 'lucide-react';
import QuestionCard from './QuestionCard';

interface QuestionResultsProps {
  onBack: () => void;
  loading: boolean;
}

const QuestionResults: React.FC<QuestionResultsProps> = ({ onBack, loading }) => {
  const { questions } = useQuestions();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  
  const uniqueSkillAreas = Array.from(
    new Set(questions.map(q => q.skillArea.id))
  ).map(skillId => {
    return questions.find(q => q.skillArea.id === skillId)?.skillArea;
  }).filter((skill): skill is SkillArea => skill !== undefined);
  
  const filteredQuestions = questions.filter(question => {
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficultyLevel === selectedDifficulty;
    const matchesSkill = selectedSkill === 'all' || question.skillArea.id === selectedSkill;
    return matchesDifficulty && matchesSkill;
  });
  
  const difficultyLevels: { value: DifficultyLevel | 'all'; label: string }[] = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'expert', label: 'Expert' }
  ];

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Generating tailored questions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Requirements</span>
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Filter:</span>
          </div>
          
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            {difficultyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="all">All Skill Areas</option>
            {uniqueSkillAreas.map(skill => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Generated Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'} generated based on your requirements.
        </p>
        
        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Total estimated time: {calculateTotalTime(filteredQuestions)}
            </span>
          </div>
        </div>
        
        {filteredQuestions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No questions match your current filters. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate total estimated time
const calculateTotalTime = (questions: any[]) => {
  if (questions.length === 0) return '0 minutes';
  
  const times = questions.map(q => {
    const matches = q.timeEstimate.match(/(\d+)-(\d+)/);
    return matches ? { min: parseInt(matches[1]), max: parseInt(matches[2]) } : { min: 0, max: 0 };
  });
  
  const totalMin = times.reduce((sum, time) => sum + time.min, 0);
  const totalMax = times.reduce((sum, time) => sum + time.max, 0);
  
  return `${totalMin}-${totalMax} minutes`;
};

export default QuestionResults;