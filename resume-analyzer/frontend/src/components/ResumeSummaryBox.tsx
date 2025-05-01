import React from 'react';
import { ParsedResume, Project, Skill } from '../types/resume';

interface ResumeSummaryBoxProps {
  data: ParsedResume;
}

const ResumeSummaryBox: React.FC<ResumeSummaryBoxProps> = ({ data }) => {
  const getBestProject = (projects: Project[] | undefined): Project | null => {
    if (!projects || projects.length === 0) return null;
    
    return projects.reduce((best, current) => {
      const currentTechCount = (current.technologies?.length || 0);
      const bestTechCount = (best.technologies?.length || 0);
      
      if (currentTechCount > bestTechCount) {
        return current;
      }
      
      if (currentTechCount === bestTechCount) {
        if (!current.endDate && best.endDate) {
          return current;
        }
        
        if (current.endDate && best.endDate) {
          const currentDate = new Date(current.endDate);
          const bestDate = new Date(best.endDate);
          if (currentDate > bestDate) {
            return current;
          }
        }
      }
      
      return best;
    }, projects[0]);
  };
  
  const getTopSkills = (skills: Skill[]): Skill[] => {
    if (!skills || skills.length === 0) return [];
    
    const proficiencyPriority: { [key: string]: number } = {
      'expert': 4,
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1
    };
    
    return [...skills].sort((a, b) => {
      const profA = a.proficiency?.toLowerCase() || '';
      const profB = b.proficiency?.toLowerCase() || '';
      
      const priorityA = Object.keys(proficiencyPriority).find(p => profA.includes(p));
      const priorityB = Object.keys(proficiencyPriority).find(p => profB.includes(p));
      
      const valueA = priorityA ? proficiencyPriority[priorityA] : 0;
      const valueB = priorityB ? proficiencyPriority[priorityB] : 0;
      
      return valueB - valueA;
    }).slice(0, 5);
  };
  
  const bestProject = getBestProject(data.projects);
  
  const topSkills = getTopSkills(data.skills);
  
  const getTotalExperience = (): number => {
    if (!data.workExperience || data.workExperience.length === 0) return 0;
    
    const totalMonths = data.workExperience.reduce((total, job) => {
      const startDate = job.startDate ? new Date(job.startDate) : null;
      
      let endDate;
      if (!job.endDate || job.endDate.toLowerCase().includes('present')) {
        endDate = new Date();
      } else {
        endDate = new Date(job.endDate);
      }
      
      if (startDate && endDate) {
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                       (endDate.getMonth() - startDate.getMonth());
        return total + months;
      }
      
      return total;
    }, 0);
    
    return Math.round(totalMonths / 12 * 10) / 10;
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border border-blue-100 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-800 mb-4 pb-2 border-b border-indigo-100">
        <span className="inline-block mr-2">✨</span>
        Resume Highlights
      </h3>
      
      <div className="space-y-5">
        {data.summary && (
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-indigo-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Professional Summary
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Experience
          </div>
          <div className="flex items-center mt-1">
            <div className="bg-indigo-100 h-2.5 flex-grow rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, getTotalExperience() * 10)}%` }}
              />
            </div>
            <span className="ml-3 text-indigo-800 font-semibold">{getTotalExperience()} years</span>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Key Highlights
          </div>
          <ul className="mt-1 space-y-2">
            {data.workExperience && data.workExperience.length > 0 && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-500 mr-2 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">
                  {data.workExperience.length} {data.workExperience.length === 1 ? 'position' : 'positions'} with {getTotalExperience()} years of experience
                </span>
              </li>
            )}
            {topSkills.length > 0 && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-500 mr-2 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">
                  Proficient in key technologies: {topSkills.slice(0, 3).map(s => s.name).join(', ')}
                </span>
              </li>
            )}
            {data.education && data.education.length > 0 && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-500 mr-2 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">
                  {data.education[0].degree} from {data.education[0].institution}
                </span>
              </li>
            )}
            {bestProject && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-500 mr-2 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">
                  Developed {bestProject.name} using {(bestProject.technologies || []).slice(0, 2).join(', ')}
                </span>
              </li>
            )}
            {data.certifications && data.certifications.length > 0 && (
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-500 mr-2 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-gray-700">
                  {data.certifications.length} professional {data.certifications.length === 1 ? 'certification' : 'certifications'}
                </span>
              </li>
            )}
          </ul>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Top Skills
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {topSkills.length > 0 ? (
              topSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-800 text-sm font-medium rounded-full shadow-sm border border-indigo-200 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  {skill.name}
                  {skill.proficiency && (
                    <span className="ml-1 opacity-80 text-xs bg-indigo-100 px-1.5 py-0.5 rounded-full">
                      {skill.proficiency}
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-indigo-600 text-sm italic">No skills data available</span>
            )}
          </div>
        </div>
        
        {bestProject && (
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Highlighted Project
            </div>
            <div className="mt-1 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
              <div className="font-medium text-indigo-900">{bestProject.name}</div>
              {bestProject.role && (
                <div className="text-xs text-indigo-600 italic mt-1">{bestProject.role}</div>
              )}
              <div className="text-sm text-gray-700 mt-2 line-clamp-2">
                {bestProject.description}
              </div>
              {bestProject.technologies && bestProject.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {bestProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-100 text-xs font-medium text-indigo-700 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSummaryBox; 