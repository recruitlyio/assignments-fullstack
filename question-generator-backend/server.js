// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateQuestionsWithLLM } = require('./llm-service');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Main question generation function that tries LLM first, then falls back to rule-based
const generateQuestions = async (jobTitle, requirements, experienceLevel, numberOfQuestions) => {
  console.log('Generating questions for:', { jobTitle, experienceLevel, numberOfQuestions });
  
  // First try generating with LLM if API key is configured
  if (process.env.LLM_API_KEY) {
    try {
      console.log('Attempting to generate questions with LLM...');
      const llmQuestions = await generateQuestionsWithLLM(
        jobTitle, 
        requirements, 
        experienceLevel, 
        numberOfQuestions
      );
      
      if (llmQuestions && llmQuestions.length > 0) {
        console.log(`Successfully generated ${llmQuestions.length} questions with LLM`);
        return llmQuestions;
      }
    } catch (error) {
      console.error('LLM generation failed, falling back to rule-based:', error.message);
    }
  }
  
  // Fall back to rule-based generation if LLM fails or is not configured
  console.log('Using rule-based question generation');
  return generateRuleBasedQuestions(jobTitle, requirements, experienceLevel, numberOfQuestions);
};

// Original rule-based generation logic (now as a separate function)
const generateRuleBasedQuestions = (jobTitle, requirements, experienceLevel, numberOfQuestions) => {
  console.log('Requirements:', requirements);
  
  // Parse job requirements to identify key skills
  const skills = extractSkills(requirements);
  console.log('Extracted skills:', skills);
  
  // Make sure we found at least one skill
  if (skills.length === 0) {
    console.log('No skills found, using default skill');
    skills.push({
      name: 'General Programming',
      keywords: ['programming', 'development', 'coding']
    });
  }
  
  // Generate questions based on identified skills and experience level
  const questions = [];
  
  // Create questions for each identified skill area
  for (let i = 0; i < Math.min(numberOfQuestions, skills.length); i++) {
    const skill = skills[i];
    if (skill && skill.name) {
      questions.push(createQuestion(skill, experienceLevel));
    }
  }
  
  // If we need more questions than skills identified, generate additional questions
  while (questions.length < numberOfQuestions && skills.length > 0) {
    const randomSkillIndex = Math.floor(Math.random() * skills.length);
    const skill = skills[randomSkillIndex];
    if (skill && skill.name) {
      questions.push(createQuestion(skill, experienceLevel));
    }
  }
  
  // If still no questions (unlikely but possible), add a general question
  if (questions.length === 0) {
    questions.push({
      questionText: "Describe your experience with software development and the technologies you've worked with.",
      category: "General Programming",
      difficulty: experienceLevelToDifficulty(experienceLevel),
      evaluationCriteria: [
        'Demonstrates technical breadth and depth',
        'Provides specific examples of projects',
        'Discusses challenges and solutions',
        'Shows ability to learn and adapt to different technologies'
      ]
    });
  }
  
  console.log(`Generated ${questions.length} questions`);
  return questions;
};

// Helper function to extract skills from job requirements
const extractSkills = (requirements) => {
  // In a real application, this would be more sophisticated
  // For now, we'll use a simple keyword-based approach
  const commonSkills = [
    { name: 'JavaScript', keywords: ['javascript', 'js', 'ecmascript'] },
    { name: 'React', keywords: ['react', 'react.js', 'reactjs'] },
    { name: 'Node.js', keywords: ['node', 'node.js', 'nodejs'] },
    { name: 'HTML/CSS', keywords: ['html', 'css', 'markup'] },
    { name: 'Database', keywords: ['sql', 'nosql', 'database', 'mongodb', 'postgres'] },
    { name: 'Testing', keywords: ['test', 'jest', 'mocha', 'testing'] },
    { name: 'Version Control', keywords: ['git', 'github', 'version control'] },
    { name: 'API Design', keywords: ['api', 'rest', 'graphql'] },
    { name: 'Performance', keywords: ['performance', 'optimization'] },
    { name: 'DevOps', keywords: ['devops', 'ci/cd', 'docker', 'kubernetes', 'aws', 'cloud'] },
    { name: 'Mobile Development', keywords: ['mobile', 'ios', 'android', 'react native', 'flutter'] },
    { name: 'Data Science', keywords: ['data science', 'machine learning', 'ml', 'ai', 'python', 'statistics'] }
  ];
  
  // Handle empty or undefined requirements
  if (!requirements) {
    console.log('Warning: Empty or undefined requirements');
    return [commonSkills[0]]; // Return JavaScript as default skill
  }
  
  // Convert requirements to lowercase for case-insensitive matching
  const lowerCaseReq = requirements.toLowerCase();
  
  // Identify which skills are mentioned in requirements
  const foundSkills = commonSkills.filter(skill => 
    skill.keywords.some(keyword => lowerCaseReq.includes(keyword))
  );
  
  console.log(`Found ${foundSkills.length} skills in requirements`);
  
  // If no skills found, return a default general programming skill
  if (foundSkills.length === 0) {
    return [{
      name: 'General Programming',
      keywords: ['programming', 'development', 'coding']
    }];
  }
  
  return foundSkills;
};

// Create a question for a specific skill and experience level
const createQuestion = (skill, experienceLevel) => {
  console.log('Creating question for skill:', skill);
  
  // Safety check for undefined skill
  if (!skill || !skill.name) {
    console.error('Error: Invalid skill object', skill);
    return {
      questionText: "Describe your experience with software development and the technologies you've worked with.",
      category: "General Programming",
      difficulty: experienceLevelToDifficulty(experienceLevel),
      evaluationCriteria: [
        'Demonstrates technical breadth and depth',
        'Provides specific examples of projects',
        'Discusses challenges and solutions',
        'Shows ability to learn and adapt to different technologies'
      ]
    };
  }
  
  // Define difficulty based on experience level
  const difficulty = experienceLevelToDifficulty(experienceLevel);
  
  // Get question templates for this skill
  const templates = getQuestionTemplates(skill.name);
  console.log(`Found ${templates.length} templates for ${skill.name}`);
  
  // Select a template appropriate for the difficulty level
  const relevantTemplates = templates.filter(t => t.difficulty === difficulty);
  console.log(`Found ${relevantTemplates.length} templates for ${difficulty} level`);
  
  // If no relevant templates, use any template
  if (relevantTemplates.length === 0) {
    console.log(`No templates found for ${skill.name} at ${difficulty} level, using any available template`);
    if (templates.length === 0) {
      console.error('Error: No templates available for', skill.name);
      return {
        questionText: `Describe your experience with ${skill.name} and how you've applied it in your previous projects.`,
        category: skill.name,
        difficulty: difficulty,
        evaluationCriteria: [
          'Technical understanding of the concept',
          'Practical application experience',
          'Problem-solving approach',
          'Communication of complex ideas'
        ]
      };
    }
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
      questionText: template.question,
      category: skill.name,
      difficulty: template.difficulty,
      evaluationCriteria: template.evaluationCriteria
    };
  }
  
  const template = relevantTemplates[Math.floor(Math.random() * relevantTemplates.length)];
  
  return {
    questionText: template.question,
    category: skill.name,
    difficulty: difficulty,
    evaluationCriteria: template.evaluationCriteria
  };
};

// Map experience level to difficulty
const experienceLevelToDifficulty = (level) => {
  switch (level) {
    case 'entry':
      return 'Basic';
    case 'mid':
      return 'Intermediate';
    case 'senior':
      return 'Advanced';
    default:
      return 'Intermediate';
  }
};

// Question templates by skill - same as before
const getQuestionTemplates = (skillName) => {
  // Handle undefined skillName
  if (!skillName) {
    console.error('Error: undefined skill name in getQuestionTemplates');
    return [
      {
        difficulty: 'Intermediate',
        question: `Describe your previous experience with software development and the technologies you've worked with.`,
        evaluationCriteria: [
          'Demonstrates technical breadth and depth',
          'Provides specific examples of projects',
          'Discusses challenges and solutions',
          'Shows ability to learn and adapt to different technologies'
        ]
      }
    ];
  }
  
  const templates = {
    'JavaScript': [
      {
        difficulty: 'Basic',
        question: 'Explain the difference between let, const, and var in JavaScript.',
        evaluationCriteria: [
          'Correctly identifies scope differences',
          'Explains hoisting behavior',
          'Discusses when to use each declaration type',
          'Mentions practical implications in code'
        ]
      },
      {
        difficulty: 'Intermediate',
        question: 'Implement a debounce function in JavaScript that limits how often a function can be called.',
        evaluationCriteria: [
          'Properly implements delay mechanism',
          'Handles function arguments correctly',
          'Preserves "this" context',
          'Explains the real-world use cases for debouncing'
        ]
      },
      {
        difficulty: 'Advanced',
        question: 'Explain JavaScript\'s event loop, microtasks, and macrotasks with examples of each.',
        evaluationCriteria: [
          'Accurately describes the event loop architecture',
          'Distinguishes between microtasks (Promises) and macrotasks (setTimeout)',
          'Explains execution order priority',
          'Provides concrete examples of potential pitfalls'
        ]
      }
    ],
    'React': [
      {
        difficulty: 'Basic',
        question: 'What is the difference between state and props in React?',
        evaluationCriteria: [
          'Explains that props are passed down from parent components',
          'Explains that state is managed within the component',
          'Discusses immutability considerations',
          'Mentions when to use each one'
        ]
      },
      {
        difficulty: 'Intermediate',
        question: 'Explain React\'s useEffect hook and how the dependency array affects its behavior.',
        evaluationCriteria: [
          'Correctly explains the purpose of useEffect',
          'Describes the different behaviors with empty, populated, and no dependency arrays',
          'Mentions cleanup function importance',
          'Discusses potential performance implications'
        ]
      },
      {
        difficulty: 'Advanced',
        question: 'Describe how you would implement a custom caching mechanism for expensive calculations in a React application.',
        evaluationCriteria: [
          'Discusses useMemo and when it might not be sufficient',
          'Proposes appropriate cache invalidation strategies',
          'Considers component lifecycle implications',
          'Addresses memory management concerns'
        ]
      }
    ],
    // Other templates remain the same
  };
  
  // Return templates for the skill, or a general question if skill not found
  return templates[skillName] || [
    {
      difficulty: 'Basic',
      question: `Explain your basic experience with ${skillName} and how you've used it in projects.`,
      evaluationCriteria: [
        'Demonstrates fundamental understanding of the technology',
        'Provides specific examples of implementation',
        'Shows enthusiasm for learning',
        'Communicates technical concepts clearly'
      ]
    },
    {
      difficulty: 'Intermediate',
      question: `Describe a challenging problem you solved using ${skillName} and your approach to the solution.`,
      evaluationCriteria: [
        'Demonstrates technical understanding of the technology',
        'Explains problem-solving methodology',
        'Discusses challenges and solutions',
        'Shows depth of knowledge appropriate to claimed experience'
      ]
    },
    {
      difficulty: 'Advanced',
      question: `What advanced ${skillName} techniques or patterns have you implemented, and how did they improve your projects?`,
      evaluationCriteria: [
        'Demonstrates expert-level understanding',
        'Discusses optimization and best practices',
        'Shows architectural thinking',
        'Explains tradeoffs in technical decisions'
      ]
    }
  ];
};

// API routes
app.post('/api/generate-questions', async (req, res) => {
  console.log('Received request:', req.body);
  
  const { jobTitle, jobRequirements, experienceLevel, numberOfQuestions } = req.body;
  
  try {
    const questions = await generateQuestions(
      jobTitle, 
      jobRequirements, 
      experienceLevel, 
      parseInt(numberOfQuestions, 10) || 3
    );
    
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ 
      error: 'An error occurred while generating questions',
      message: error.message 
    });
  }
});

// API route to check if LLM is configured
app.get('/api/llm-status', (req, res) => {
  const isLlmConfigured = !!process.env.LLM_API_KEY;
  res.json({ 
    llmConfigured: isLlmConfigured,
    provider: process.env.LLM_PROVIDER || 'OpenAI'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`LLM integration ${process.env.LLM_API_KEY ? 'ENABLED' : 'DISABLED'}`);
});