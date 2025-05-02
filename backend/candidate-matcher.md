# Advanced Candidate Matching System - Technical Challenge

## Overview

Design and implement a candidate matching system that goes beyond simple text comparison. 

This assignment evaluates your ability to architect a practical AI solution for a nuanced recruitment challenge that handles real-world complexities.

## The Challenge

Recruiters often struggle with three critical problems when matching candidates to roles:

1. **Skill equivalence**: Identifying when different terms represent the same skill (e.g., "React" vs "ReactJS" vs "React.js")
2. **Experience depth**: Distinguishing between superficial keyword matches and genuine expertise
3. **Potential fit**: Recognizing transferable skills and learning potential, not just exact matches

Your task is to build a system that addresses these challenges using AI-augmented matching.

## Requirements

Create an application with:

### Core Functionality
1. A mechanism to ingest and maintain a knowledge graph of related skills, technologies, and roles
2. An intelligent matching system that scores candidates against job requirements using this knowledge
3. Explainable results that justify why specific candidates rank higher than others

### Technical Implementation
1. A React frontend that demonstrates the system's capabilities
2. A Node.js/TypeScript backend that implements the matching logic
3. An API integration with an LLM to augment the matching process
4. A method for improving matching quality over time

## Technical Constraints

To ensure this challenge tests engineering skills rather than prompt engineering:

1. You **cannot** simply pass the entire job description and resume to an LLM and ask for a match score
2. You must implement a structured approach that:
   - Extracts and normalizes skills/requirements
   - Applies a consistent scoring algorithm
   - Uses the LLM strategically for specific subtasks
   - Maintains an evolving knowledge model

## Evaluation Criteria

Your solution will be judged on:

1. **System Architecture**: Your approach to decomposing the problem
2. **Algorithm Design**: How you implement the matching logic
3. **AI Integration**: Strategic use of LLMs for appropriate subtasks
4. **Code Quality**: Structure, readability, and maintainability
5. **Technical Decisions**: Justification of your approach and tradeoffs

## Deliverables

1. Source code in a GitHub repository
2. A comprehensive README explaining:
   - Your system architecture and design decisions
   - How you addressed the core challenges
   - How your solution could scale and improve over time
   - Setup instructions for running locally
3. A simple demo of your working application

## Scope Limitations

To keep this assignment manageable within 4-8 hours:
- Use mock/sample data for initial development
- Focus on demonstrating the approach rather than building a production-ready system
- You may simplify certain aspects, but clearly document what you would enhance given more time

## Submission Process

1. Fork this repository
2. Create a new branch with a descriptive name (`your-name-solution`)
3. Implement your solution
4. Submit a pull request with a summary of your approach
