import { Candidate, Job } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    skills: [
      { name: 'React', years: 3 },
      { name: 'JavaScript', years: 5 },
      { name: 'Node.js', years: 2 },
      { name: 'TypeScript', years: 2 },
      { name: 'HTML/CSS', years: 5 }
    ],
    experience: [
      'Senior Frontend Developer at TechCorp (2 years)',
      'Frontend Developer at WebSolutions (3 years)'
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    skills: [
      { name: 'Python', years: 4 },
      { name: 'Java', years: 3 },
      { name: 'Spring', years: 2 },
      { name: 'JavaScript', years: 1 },
      { name: 'SQL', years: 3 }
    ],
    experience: [
      'Backend Developer at DataSystems (2 years)',
      'Software Engineer at EnterpriseSoft (2 years)'
    ]
  },
  {
    id: '3',
    name: 'Alex Johnson',
    skills: [
      { name: 'AWS', years: 3 },
      { name: 'Docker', years: 2 },
      { name: 'Kubernetes', years: 1 },
      { name: 'Python', years: 4 },
      { name: 'Terraform', years: 2 }
    ],
    experience: [
      'DevOps Engineer at CloudTech (2 years)',
      'System Administrator at HostingPro (3 years)'
    ]
  },
  {
    id: '4',
    name: 'Sarah Williams',
    skills: [
      { name: 'React Native', years: 2 },
      { name: 'Swift', years: 3 },
      { name: 'Kotlin', years: 2 },
      { name: 'JavaScript', years: 4 },
      { name: 'Firebase', years: 2 }
    ],
    experience: [
      'Mobile Developer at AppWorks (2 years)',
      'iOS Developer at MobileFirst (2 years)'
    ]
  },
  {
    id: '5',
    name: 'Michael Brown',
    skills: [
      { name: 'C#', years: 5 },
      { name: '.NET', years: 4 },
      { name: 'SQL Server', years: 3 },
      { name: 'Azure', years: 2 },
      { name: 'JavaScript', years: 2 }
    ],
    experience: [
      'Senior .NET Developer at EnterpriseSoft (3 years)',
      'Software Engineer at TechCorp (2 years)'
    ]
  },
  {
    id: '6',
    name: 'Emily Davis',
    skills: [
      { name: 'Python', years: 3 },
      { name: 'TensorFlow', years: 2 },
      { name: 'PyTorch', years: 1 },
      { name: 'SQL', years: 2 },
      { name: 'R', years: 2 }
    ],
    experience: [
      'Data Scientist at AI Solutions (2 years)',
      'Machine Learning Engineer at DataTech (1 year)'
    ]
  },
  {
    id: '7',
    name: 'David Wilson',
    skills: [
      { name: 'Java', years: 4 },
      { name: 'Spring Boot', years: 3 },
      { name: 'Microservices', years: 2 },
      { name: 'Docker', years: 2 },
      { name: 'Kubernetes', years: 1 }
    ],
    experience: [
      'Backend Developer at EnterpriseSoft (2 years)',
      'Java Developer at TechCorp (2 years)'
    ]
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    skills: [
      { name: 'Vue.js', years: 3 },
      { name: 'JavaScript', years: 4 },
      { name: 'TypeScript', years: 2 },
      { name: 'Node.js', years: 2 },
      { name: 'GraphQL', years: 1 }
    ],
    experience: [
      'Frontend Developer at WebTech (2 years)',
      'UI Developer at DesignFirst (2 years)'
    ]
  },
  {
    id: '9',
    name: 'Robert Taylor',
    skills: [
      { name: 'Go', years: 2 },
      { name: 'Python', years: 3 },
      { name: 'Docker', years: 2 },
      { name: 'AWS', years: 2 },
      { name: 'Kubernetes', years: 1 }
    ],
    experience: [
      'Backend Developer at CloudTech (2 years)',
      'Software Engineer at StartupX (1 year)'
    ]
  },
  {
    id: '10',
    name: 'Jennifer Martinez',
    skills: [
      { name: 'Ruby', years: 3 },
      { name: 'Ruby on Rails', years: 3 },
      { name: 'JavaScript', years: 2 },
      { name: 'PostgreSQL', years: 2 },
      { name: 'Redis', years: 1 }
    ],
    experience: [
      'Full Stack Developer at WebSolutions (2 years)',
      'Ruby Developer at TechStart (1 year)'
    ]
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    description: 'Looking for an experienced frontend developer with strong React skills to lead our frontend team.',
    requirements: [
      { skill: 'React', minYears: 3, required: true },
      { skill: 'JavaScript', minYears: 4, required: true },
      { skill: 'TypeScript', minYears: 2, required: true },
      { skill: 'Node.js', minYears: 2, required: false },
      { skill: 'HTML/CSS', minYears: 4, required: true }
    ]
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'DataSystems',
    description: 'Seeking a backend developer with Python and Java experience to work on our data processing systems.',
    requirements: [
      { skill: 'Python', minYears: 3, required: true },
      { skill: 'Java', minYears: 2, required: true },
      { skill: 'Spring', minYears: 1, required: false },
      { skill: 'AWS', minYears: 1, required: false },
      { skill: 'SQL', minYears: 2, required: true }
    ]
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    description: 'Looking for a DevOps engineer to help automate and optimize our cloud infrastructure.',
    requirements: [
      { skill: 'AWS', minYears: 2, required: true },
      { skill: 'Docker', minYears: 2, required: true },
      { skill: 'Kubernetes', minYears: 1, required: true },
      { skill: 'Python', minYears: 2, required: true },
      { skill: 'Terraform', minYears: 1, required: false }
    ]
  },
  {
    id: '4',
    title: 'Mobile Developer',
    company: 'AppWorks',
    description: 'Seeking a mobile developer to build cross-platform applications using React Native.',
    requirements: [
      { skill: 'React Native', minYears: 2, required: true },
      { skill: 'JavaScript', minYears: 3, required: true },
      { skill: 'Swift', minYears: 1, required: false },
      { skill: 'Kotlin', minYears: 1, required: false },
      { skill: 'Firebase', minYears: 1, required: false }
    ]
  },
  {
    id: '5',
    title: '.NET Developer',
    company: 'EnterpriseSoft',
    description: 'Looking for a .NET developer to work on enterprise applications.',
    requirements: [
      { skill: 'C#', minYears: 3, required: true },
      { skill: '.NET', minYears: 3, required: true },
      { skill: 'SQL Server', minYears: 2, required: true },
      { skill: 'Azure', minYears: 1, required: false },
      { skill: 'JavaScript', minYears: 1, required: false }
    ]
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AI Solutions',
    description: 'Seeking a data scientist to develop machine learning models and analyze data.',
    requirements: [
      { skill: 'Python', minYears: 3, required: true },
      { skill: 'TensorFlow', minYears: 1, required: true },
      { skill: 'SQL', minYears: 2, required: true },
      { skill: 'R', minYears: 1, required: false },
      { skill: 'PyTorch', minYears: 1, required: false }
    ]
  },
  {
    id: '7',
    title: 'Java Backend Developer',
    company: 'TechCorp',
    description: 'Looking for a Java developer to work on microservices architecture.',
    requirements: [
      { skill: 'Java', minYears: 3, required: true },
      { skill: 'Spring Boot', minYears: 2, required: true },
      { skill: 'Microservices', minYears: 1, required: true },
      { skill: 'Docker', minYears: 1, required: false },
      { skill: 'Kubernetes', minYears: 1, required: false }
    ]
  },
  {
    id: '8',
    title: 'Vue.js Developer',
    company: 'WebTech',
    description: 'Seeking a Vue.js developer to build modern web applications.',
    requirements: [
      { skill: 'Vue.js', minYears: 2, required: true },
      { skill: 'JavaScript', minYears: 3, required: true },
      { skill: 'TypeScript', minYears: 1, required: false },
      { skill: 'Node.js', minYears: 1, required: false },
      { skill: 'GraphQL', minYears: 1, required: false }
    ]
  },
  {
    id: '9',
    title: 'Go Developer',
    company: 'CloudTech',
    description: 'Looking for a Go developer to work on high-performance backend services.',
    requirements: [
      { skill: 'Go', minYears: 2, required: true },
      { skill: 'Python', minYears: 2, required: true },
      { skill: 'Docker', minYears: 1, required: true },
      { skill: 'AWS', minYears: 1, required: false },
      { skill: 'Kubernetes', minYears: 1, required: false }
    ]
  },
  {
    id: '10',
    title: 'Ruby on Rails Developer',
    company: 'WebSolutions',
    description: 'Seeking a Ruby on Rails developer to work on web applications.',
    requirements: [
      { skill: 'Ruby', minYears: 2, required: true },
      { skill: 'Ruby on Rails', minYears: 2, required: true },
      { skill: 'JavaScript', minYears: 1, required: false },
      { skill: 'PostgreSQL', minYears: 1, required: true },
      { skill: 'Redis', minYears: 1, required: false }
    ]
  }
]; 