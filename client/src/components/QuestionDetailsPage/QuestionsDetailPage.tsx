import { useState } from 'react';
import { ArrowLeft, ArrowRight, List, BookOpen, AlertTriangle, CheckCircle, BadgeCheck, ChevronLeft } from 'lucide-react';
import { Question } from '../../types';
// Color mapping for difficulty levels
const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800"
};

// Icons for each section
const criteriaIcons = {
  basic: <AlertTriangle size={20} className="text-gray-600" />,
  good: <CheckCircle size={20} className="text-blue-600" />,
  excellent: <BadgeCheck size={20} className="text-purple-600" />
};

export default function QuestionDetailsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
    
    const questionsData = JSON.parse(localStorage.getItem('questions') || '[]') as Question[];

    const currentQuestion = questionsData[currentIndex];
    
    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : questionsData.length - 1));
    };
    
    const handleNext = () => {
        setCurrentIndex((prev) => (prev < questionsData.length - 1 ? prev + 1 : 0));
    };
    
    const handleSelectQuestion = (index) => {
        setCurrentIndex(index);
        if (viewMode === 'list') {
        setViewMode('card');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <button 
            onClick={() => console.log('Back button clicked')} 
            className="flex items-center mb-4 text-gray-600 hover:text-blue-600 transition-colors"
        >
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Dashboard</span>
        </button>
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Question Details</h1>
            <div className="flex space-x-2">
            <button 
                onClick={() => setViewMode('card')}
                className={`p-2 rounded ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                <BookOpen size={20} />
            </button>
            <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                <List size={20} />
            </button>
            </div>
        </header>
        
        {viewMode === 'list' ? (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">All Questions</h2>
            <ul className="space-y-3">
                {questionsData.map((q, index) => (
                <li 
                    key={index}
                    onClick={() => handleSelectQuestion(index)}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${index === currentIndex ? 'border-l-4 border-blue-500 bg-blue-50' : ''}`}
                >
                    <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">{q.question}</p>
                        <p className="text-sm text-gray-600">{q.skillArea}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[q.difficulty]}`}>
                        {q.difficulty}
                    </span>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                {/* Question Header */}
                <div className="flex justify-between items-start mb-4">
                <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[currentQuestion.difficulty]}`}>
                    {currentQuestion.difficulty}
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-600">{currentQuestion.skillArea}</span>
                </div>
                <div className="text-sm text-gray-500">
                    Question {currentIndex + 1} of {questionsData.length}
                </div>
                </div>
                
                {/* Question Content */}
                <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>
                
                {/* Evaluation Criteria */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Evaluation Criteria</h3>
                
                <div className="space-y-4">
                    <div className="flex items-start">
                    {criteriaIcons.basic}
                    <div className="ml-3">
                        <h4 className="font-medium">Basic</h4>
                        <p className="text-gray-700">{currentQuestion.evaluationCriteria.basic}</p>
                    </div>
                    </div>
                    
                    <div className="flex items-start">
                    {criteriaIcons.good}
                    <div className="ml-3">
                        <h4 className="font-medium">Good</h4>
                        <p className="text-gray-700">{currentQuestion.evaluationCriteria.good}</p>
                    </div>
                    </div>
                    
                    <div className="flex items-start">
                    {criteriaIcons.excellent}
                    <div className="ml-3">
                        <h4 className="font-medium">Excellent</h4>
                        <p className="text-gray-700">{currentQuestion.evaluationCriteria.excellent}</p>
                    </div>
                    </div>
                </div>
                </div>
                
                {/* Things to Look For */}
                <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Things to Look For</h4>
                <p className="text-gray-700">{currentQuestion.evaluationCriteria.thingsToLookFor}</p>
                </div>
            </div>
            
            {/* Navigation Footer */}
            <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
                <button 
                onClick={handlePrevious}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                >
                <ArrowLeft size={16} className="mr-2" />
                Previous
                </button>
                
                <button 
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                Next
                <ArrowRight size={16} className="ml-2" />
                </button>
            </div>
            </div>
        )}
        </div>
    );
}