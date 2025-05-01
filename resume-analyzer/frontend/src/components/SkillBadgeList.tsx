import React from 'react';
import { Skill } from '../types/resume';
import SkillBadge from '../features/resume/SkillBadge';

interface SkillBadgeListProps {
  skills: Skill[];
}

const SkillBadgeList: React.FC<SkillBadgeListProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} />
      ))}
    </div>
  );
};

export default SkillBadgeList; 