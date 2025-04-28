import React, { useState } from 'react';
import { JobRequirements, ExperienceLevel, SkillArea } from '../../types';
import { experienceLevels } from '../../data/experienceLevels';
import { skillAreas } from '../../data/skillAreas';
import { Briefcase, GraduationCap, Code, Info } from 'lucide-react';

interface RequirementsFormProps {
  onSubmit: (jobRequirements: JobRequirements, experienceLevel: ExperienceLevel) => void;
}

const RequirementsForm: React.FC<RequirementsFormProps> = ({ onSubmit }) => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel>(experienceLevels[1]);
  const [selectedSkills, setSelectedSkills] = useState<SkillArea[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleSkillToggle = (skill: SkillArea) => {
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    
    if (isSelected) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
    if (!jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }
    
    if (!jobDescription.trim()) {
      errors.jobDescription = 'Job description is required';
    }
    
    if (selectedSkills.length === 0) {
      errors.skills = 'At least one skill area must be selected';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const jobRequirements: JobRequirements = {
        title: jobTitle,
        description: jobDescription,
        selectedSkills,
        additionalNotes: additionalNotes.trim() || undefined,
      };
      
      onSubmit(jobRequirements, selectedExperience);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Question Generator</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Input job requirements and candidate experience level to generate tailored interview questions.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
            <Briefcase className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Job Details</h3>
          </div>
          
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                formErrors.jobTitle ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g. Front-end Developer, Data Engineer"
            />
            {formErrors.jobTitle && (
              <p className="mt-1 text-sm text-red-500">{formErrors.jobTitle}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={3}
              className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                formErrors.jobDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Brief description of the role and responsibilities"
            />
            {formErrors.jobDescription && (
              <p className="mt-1 text-sm text-red-500">{formErrors.jobDescription}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
            <Code className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Required Skills <span className="text-red-500">*</span></h3>
          </div>
          
          {formErrors.skills && (
            <p className="text-sm text-red-500 mb-2">{formErrors.skills}</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skillAreas.map((skill) => (
              <div
                key={skill.id}
                onClick={() => handleSkillToggle(skill)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedSkills.some(s => s.id === skill.id)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSkills.some(s => s.id === skill.id)}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
            <GraduationCap className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Experience Level</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {experienceLevels.map((level) => (
              <div
                key={level.id}
                onClick={() => setSelectedExperience(level)}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedExperience.id === level.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedExperience.id === level.id}
                    onChange={() => {}}
                    className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {level.name}
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{level.yearsOfExperience}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
            <Info className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Additional Notes (Optional)</h3>
          </div>
          
          <textarea
            id="additionalNotes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={2}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Any specific areas you want to focus on or additional context"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Generate Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequirementsForm;