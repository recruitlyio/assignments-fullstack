import { Skill } from '../types';

export const knowledgeGraph: Record<string, Skill> = {
  'React': {
    name: 'React',
    aliases: ['ReactJS', 'React.js'],
    related: ['JavaScript', 'TypeScript', 'Redux', 'Next.js'],
    category: 'Frontend'
  },
  'JavaScript': {
    name: 'JavaScript',
    aliases: ['JS', 'ECMAScript'],
    related: ['TypeScript', 'Node.js', 'React', 'Vue'],
    category: 'Programming Language'
  },
  'TypeScript': {
    name: 'TypeScript',
    aliases: ['TS'],
    related: ['JavaScript', 'React', 'Angular'],
    category: 'Programming Language'
  },
  'Node.js': {
    name: 'Node.js',
    aliases: ['Node'],
    related: ['JavaScript', 'Express', 'MongoDB'],
    category: 'Backend'
  },
  'Python': {
    name: 'Python',
    aliases: ['Py'],
    related: ['Django', 'Flask', 'Machine Learning'],
    category: 'Programming Language'
  },
  'Java': {
    name: 'Java',
    aliases: [],
    related: ['Spring', 'Hibernate', 'Android'],
    category: 'Programming Language'
  }
};

export const skillCategories = {
  'Frontend': ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript'],
  'Backend': ['Node.js', 'Python', 'Java', 'Spring', 'Django'],
  'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  'Programming Language': ['JavaScript', 'TypeScript', 'Python', 'Java']
}; 