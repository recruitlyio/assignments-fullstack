# Intelligent Resume Parser - Technical Challenge

## Overview

Build a system that extracts structured data from unstructured resumes with high accuracy. This challenge tests your ability to combine AI with structured validation to solve a common recruitment data problem.

## The Challenge

Resume parsing is a fundamental recruitment challenge. Standard parsers often:
1. Miss important context about skills and experiences
2. Fail to standardize inconsistent formatting
3. Cannot distinguish between similar terms with different meanings

Your task is to create a more intelligent parser that addresses these limitations.

## Requirements

Create an application with:

### Core Functionality
1. A text input area where users can paste resume content
2. A processing system that extracts key information:
   - Skills and technologies with proficiency levels
   - Work experience with properly identified roles and durations
   - Education details with standardized degree names
3. A validation system that identifies potential errors or inconsistencies
4. A clean visualization of the parsed data

### Technical Implementation
1. A React frontend for input and displaying results
2. A Node.js/TypeScript backend that implements the parsing logic
3. Strategic use of an LLM to assist the parsing process
4. A validation layer that ensures data consistency

## Technical Approach

To ensure this tests engineering skills rather than just LLM usage:

1. You should design a structured parsing approach that:
   - Uses AI for initial information extraction
   - Applies validation rules to ensure consistency
   - Handles common parsing edge cases
   - Standardizes terminology and formats

## Evaluation Criteria

Your solution will be judged on:

1. **Parsing Accuracy**: How well your system extracts structured data
2. **Data Validation**: How effectively you verify and normalize the extracted information
3. **Code Structure**: Organization and maintainability of your solution
4. **Error Handling**: How gracefully your system deals with edge cases
5. **User Experience**: Clear presentation of the parsed information

## Deliverables

1. Source code in a GitHub repository
2. A README explaining:
   - Your parsing approach and validation strategy
   - How you handled edge cases
   - Technical decisions and tradeoffs
   - Setup instructions for running locally
3. A working demo that processes sample resumes

## Scope Limitations

To keep this assignment manageable within 4-8 hours:
- Focus on handling plain text resume content (no file uploads required)
- Concentrate on a specific set of information fields (skills, work experience, education)
- You may simplify certain aspects, but document what you would enhance given more time

## Submission Process

1. Fork this repository
2. Create a new branch with a descriptive name (`your-name-solution`)
3. Implement your solution
4. Submit a pull request with a summary of your approach
