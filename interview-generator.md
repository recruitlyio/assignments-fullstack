# Technical Interview Question Generator - Technical Challenge

## Overview

Create a system that generates relevant technical interview questions tailored to specific job requirements and skill levels. This challenge tests your ability to build an AI-augmented tool that helps recruiters conduct more effective technical assessments.

## The Challenge

Technical interviewers face recurring problems:
1. Creating questions that appropriately test for the specific skills needed
2. Balancing question difficulty based on the candidate's experience level
3. Ensuring questions have clear evaluation criteria

Your task is to build a system that generates tailored technical questions with evaluation guidelines.

## Requirements

Create an application with:

### Core Functionality
1. An interface to input job requirements and candidate experience level
2. A question generation system that creates role-specific technical questions
3. Difficulty calibration based on the specified experience level
4. Evaluation criteria for each generated question

### Technical Implementation
1. A React frontend with forms for requirements input
2. A Node.js/TypeScript backend for question generation logic
3. Strategic use of an LLM API to assist the question creation
4. A system to categorize questions by skill areas and difficulty

## Technical Approach

To ensure this tests engineering skills rather than just prompt design:

1. Your solution should:
   - Break down job requirements into core skill areas
   - Maintain consistency in question difficulty across different domains
   - Generate questions that test practical application, not just knowledge
   - Provide clear evaluation criteria for assessing answers

2. Simple prompt engineering alone shouldn't be sufficient to solve this problem

## Evaluation Criteria

Your solution will be judged on:

1. **Question Quality**: Relevance and effectiveness of generated questions
2. **Difficulty Calibration**: Appropriate scaling based on experience level
3. **Evaluation Guidelines**: Clarity of assessment criteria
4. **System Architecture**: Overall design and organization
5. **Code Quality**: Structure and maintainability

## Deliverables

1. Source code in a GitHub repository
2. A README explaining:
   - Your approach to question generation
   - How you calibrate difficulty
   - Technical decisions and tradeoffs
   - Setup instructions for running locally
3. A working demo with sample outputs

## Scope Limitations

To keep this assignment manageable within 4-8 hours:
- Focus on a specific technical domain (e.g., web development, data science)
- Limit the scope to core question generation (no scheduling/recording features)
- You may simplify certain aspects, but document what you would enhance given more time

## Submission Process

1. Fork this repository
2. Create a new branch with a descriptive name (`your-name-solution`)
3. Implement your solution
4. Submit a pull request with a summary of your approach
