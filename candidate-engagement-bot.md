# Candidate Engagement Chatbot - Technical Challenge

## Overview

Create a specialized chatbot that engages job applicants with contextually relevant information while qualifying their fit. This challenge tests your ability to design an effective conversational system for the initial candidate screening process.

## The Challenge

Early candidate conversations often suffer from:
1. Generic responses that don't address specific role questions
2. Inability to extract relevant candidate qualifications during chat
3. Poor management of conversation flow and context

Your task is to build a chatbot that provides relevant job information while simultaneously qualifying candidates.

## Requirements

Create an application with:

### Core Functionality
1. A chat interface where users can ask questions about a job
2. A system that responds with relevant job details from a provided description
3. Logic that extracts candidate information during the conversation
4. A summary view that shows what the system learned about the candidate

### Technical Implementation
1. A React frontend with a conversational interface
2. A Node.js/TypeScript backend that manages conversation state
3. Integration with an LLM API for natural language understanding
4. A structured approach to information extraction during conversation

## Technical Approach

To ensure this tests real engineering skills:

1. Your solution should:
   - Maintain conversation context across multiple turns
   - Extract candidate qualifications without explicit form-filling
   - Provide answers based on specific job details, not generic responses
   - Generate a structured profile from unstructured conversation

2. The system should work with a sample job description you define in your solution

## Evaluation Criteria

Your solution will be judged on:

1. **Conversation Quality**: How natural and helpful the interactions feel
2. **Information Accuracy**: How well the system provides correct job details
3. **Data Extraction**: How effectively it gathers candidate information
4. **Context Management**: How well it maintains conversation flow
5. **Code Organization**: Structure and maintainability of your solution

## Deliverables

1. Source code in a GitHub repository
2. A README explaining:
   - Your conversation design approach
   - How you extract and structure candidate information
   - Technical decisions and tradeoffs
   - Setup instructions for running locally
3. A working demo with sample job data

## Scope Limitations

To keep this assignment manageable within 4-8 hours:
- Focus on a single job description for the demonstration
- Limit the scope to initial candidate engagement (not full interviewing)
- You may simplify certain aspects, but document what you would enhance given more time

## Submission Process

1. Fork this repository
2. Create a new branch with a descriptive name (`your-name-solution`)
3. Implement your solution
4. Submit a pull request with a summary of your approach
