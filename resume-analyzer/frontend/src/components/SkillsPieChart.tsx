import React from 'react';
import { Skill } from '../types/resume';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SkillsPieChartProps {
  skills: Skill[];
}

const processSkillsData = (skills: Skill[]) => {
  const skillCounts: { [key: string]: number } = {};
  
  skills.forEach(skill => {
    const skillName = skill.name || 'Unknown';
    
    if (skillCounts[skillName]) {
      skillCounts[skillName]++;
    } else {
      skillCounts[skillName] = 1;
    }
  });
  
  const MAX_SKILLS_TO_DISPLAY = 10;
  let processedSkillCounts: { [key: string]: number } = {};
  
  if (Object.keys(skillCounts).length > MAX_SKILLS_TO_DISPLAY) {
    const sortedSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_SKILLS_TO_DISPLAY - 1);
    
    sortedSkills.forEach(([skill, count]) => {
      processedSkillCounts[skill] = count;
    });
    
    const otherSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(MAX_SKILLS_TO_DISPLAY - 1);
    
    if (otherSkills.length > 0) {
      const otherCount = otherSkills.reduce((sum, [_, count]) => sum + count, 0);
      processedSkillCounts['Other'] = otherCount;
    }
  } else {
    processedSkillCounts = skillCounts;
  }
  
  const colors = generateColors(Object.keys(processedSkillCounts).length);
  
  return {
    labels: Object.keys(processedSkillCounts),
    datasets: [
      {
        data: Object.values(processedSkillCounts),
        backgroundColor: colors,
        borderColor: colors.map(color => adjustColor(color, -20)),
        borderWidth: 1,
      },
    ],
  };
};

const generateColors = (count: number): string[] => {
  const baseColors = [
    '#6366F1', '#8B5CF6', '#A855F7', '#EC4899', 
    '#3B82F6', '#06B6D4', '#0EA5E9', '#10B981',
    '#6EE7B7', '#34D399', '#2DD4BF', '#4F46E5',
  ];
  
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  const colors = [...baseColors];
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 137.5) % 360;
    colors.push(`hsl(${hue}, 75%, 60%)`);
  }
  
  return colors;
};

const adjustColor = (color: string, amount: number): string => {
  if (color.startsWith('#')) {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  return color;
};

const SkillsPieChart: React.FC<SkillsPieChartProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return <div className="text-center p-6 text-gray-500 italic bg-gray-50 rounded-lg border border-gray-200">No skills data available</div>;
  }

  const chartData = processSkillsData(skills);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 14,
          padding: 10,
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#4B5563',
          usePointStyle: true,
          pointStyle: 'circle',
        },
        maxItems: 15,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#4B5563',
        bodyColor: '#374151',
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
        },
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 4,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((sum: number, value: number) => sum + value, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#fff',
        hoverBorderWidth: 3,
      }
    },
    cutout: '35%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        Skills Breakdown
      </h3>
      <div className="h-72">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SkillsPieChart; 