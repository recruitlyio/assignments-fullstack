import React from 'react';
import { Skill } from '../../types/resume';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  let bgGradient = 'from-blue-50 to-indigo-50';
  let textColor = 'text-indigo-700';
  let borderColor = 'border-indigo-200';
  let proficiencyBg = 'bg-indigo-100';
  let proficiencyText = 'text-indigo-700';
  
  if (skill.proficiency) {
    const proficiencyLower = skill.proficiency.toLowerCase();
    
    if (proficiencyLower.includes('expert')) {
      bgGradient = 'from-violet-50 to-purple-50';
      textColor = 'text-violet-700';
      borderColor = 'border-violet-200';
      proficiencyBg = 'bg-violet-100';
      proficiencyText = 'text-violet-700';
    } else if (proficiencyLower.includes('advanced')) {
      bgGradient = 'from-indigo-50 to-blue-50';
      textColor = 'text-indigo-700';
      borderColor = 'border-indigo-200';
      proficiencyBg = 'bg-indigo-100';
      proficiencyText = 'text-indigo-700';
    } else if (proficiencyLower.includes('intermediate')) {
      bgGradient = 'from-sky-50 to-blue-50';
      textColor = 'text-sky-700';
      borderColor = 'border-sky-200';
      proficiencyBg = 'bg-sky-100';
      proficiencyText = 'text-sky-700';
    } else if (proficiencyLower.includes('beginner')) {
      bgGradient = 'from-emerald-50 to-green-50';
      textColor = 'text-emerald-700';
      borderColor = 'border-emerald-200';
      proficiencyBg = 'bg-emerald-100';
      proficiencyText = 'text-emerald-700';
    }
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm border bg-gradient-to-r ${bgGradient} ${textColor} ${borderColor} hover:shadow transition-all duration-200 hover:-translate-y-0.5`}
    >
      {skill.name}
      {skill.proficiency && (
        <span className={`ml-1.5 text-xs font-medium ${proficiencyBg} ${proficiencyText} px-1.5 py-0.5 rounded-full`}>
          {skill.proficiency}
        </span>
      )}
      {skill.yearsOfExperience && !skill.proficiency && (
        <span className={`ml-1.5 text-xs font-medium ${proficiencyBg} ${proficiencyText} px-1.5 py-0.5 rounded-full`}>
          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'yr' : 'yrs'}
        </span>
      )}
    </span>
  );
};

export default SkillBadge; 