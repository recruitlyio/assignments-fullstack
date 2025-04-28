// Adding more sample questions to the existing templates
import { DifficultyLevel } from '../types';

type QuestionTemplate = {
  title: string;
  description: string;
  difficultyLevel: DifficultyLevel;
};

export const questionTemplates: Record<string, QuestionTemplate[]> = {
  'javascript': [
    {
      title: 'Basic Array Operations',
      description: 'Write functions to perform basic array operations like finding unique elements, flattening nested arrays, and grouping elements by a criteria.',
      difficultyLevel: 'easy',
    },
    {
      title: 'Closure Implementation',
      description: 'Create a closure that maintains a counter and explain how lexical scoping works in JavaScript.',
      difficultyLevel: 'easy',
    },
    {
      title: 'Event Loop Explanation',
      description: 'Explain how the JavaScript event loop works. Include examples of macrotasks and microtasks, and their execution order.',
      difficultyLevel: 'medium',
    },
    {
      title: 'Debounce Implementation',
      description: 'Implement a debounce function that limits the rate at which a function can fire. Include proper TypeScript types.',
      difficultyLevel: 'medium',
    },
    {
      title: 'Promise.all Implementation',
      description: 'Implement a function that mimics the behavior of Promise.all(). Handle both successful and failed promises appropriately.',
      difficultyLevel: 'hard',
    },
    {
      title: 'Memory Leak Detection',
      description: 'Discuss common causes of memory leaks in JavaScript applications and how to detect and fix them.',
      difficultyLevel: 'expert',
    },
    {
      title: 'Virtual DOM Implementation',
      description: 'Create a basic Virtual DOM implementation and explain how diffing algorithms work.',
      difficultyLevel: 'expert',
    }
  ],
  // ... (rest of the existing templates)
};