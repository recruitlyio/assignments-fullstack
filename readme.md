# Interview Question Generation System

## Overview

This project is a web-based application designed to generate technical interview questions based on job requirements and candidate experience levels. The system uses a combination of frontend React code and a backend Express server to communicate with OpenAI's GPT-3.5-turbo model to generate questions that are tailored to specific job roles and experience levels.

### Key Features
- **Frontend**: React-based user interface that allows users to input job requirements and select experience levels.
- **Backend**: Node.js-based server that processes the input and fetches interview questions from OpenAI.
- **OpenAI GPT-3.5**: Used to parse job descriptions and generate relevant technical interview questions.

---

## Approach to Question Generation

1. **Job Requirement Parsing**:
   - The job requirement input is parsed to extract key skill areas (e.g., Frontend Development, Backend Development) using OpenAI's GPT-3.5 model.
   - The model processes the job description and groups the requirements into core skill areas.
   
2. **Question Generation**:
   - For each skill area identified, the system generates 5-7 practical, real-world technical interview questions.
   - The questions are tailored to match the selected experience level (Junior, Mid-level, or Senior).
   - The questions are designed to assess the practical application of skills in real-world scenarios, with progressive difficulty based on the candidate's experience level.
   
3. **Evaluation Criteria**:
   - Along with each question, the system generates evaluation criteria that help interviewers assess the quality of the candidate's response. The criteria specify what a strong answer should include, allowing interviewers to objectively evaluate responses.

---

## How Difficulty is Calibrated

- **Experience Level**: The difficulty of the generated questions is calibrated based on the selected experience level:
  - **Junior-level**: Questions focus on foundational knowledge and basic application of skills.
  - **Mid-level**: Questions require deeper understanding and the ability to solve more complex problems, often involving real-world scenarios.
  - **Senior-level**: Questions focus on advanced topics, architecture design, optimization, and leadership aspects in technical roles.
  
- **Question Progression**: Within each skill area, the difficulty progresses from simple to more complex topics, ensuring a gradual increase in the challenge as per the experience level.

---

## Technical Decisions and Tradeoffs

### Frontend: React UI Improvements
- **UI Enhancements**:
  - Improved **form validation** for job descriptions and experience levels.
  - Add **loading indicators** (spinner/animation) for better UX during API calls.
  - **Responsive design** for mobile compatibility and **user feedback** for errors.
  - Focus on **accessibility** with semantic HTML and keyboard navigation.

### Handling Edge Cases
1. **Missing/Invalid Input**:
   - Display error messages for empty or incorrect inputs (job description, experience level).
2. **API Failures**:
   - Show friendly messages when the backend or OpenAI API fails.
   - Implement retry logic for network/API issues.
3. **Empty/Incorrect OpenAI Responses**:
   - Provide fallback messages when OpenAI returns empty or invalid responses.
4. **Large Responses**:
   - Implement pagination or infinite scroll for large datasets.

### Backend: Handling Edge Cases
1. **Invalid Job Requirements**:
   - Sanitize and validate job descriptions before passing to OpenAI.
2. **OpenAI API Failures**:
   - Implement **retry logic** and fallback mechanisms for OpenAI errors.


---
## Demo Video

https://github.com/user-attachments/assets/d565eef0-8e13-4b6c-973e-3f29315d0b98


## Setup Instructions

### Prerequisites

- Node.js (version 14 or above)
- npm (or yarn)
- OpenAI API key (API KEY IS REQUIRED TO RUN THE BACKEND API LOCALLY)

### Running Services

1. **Running backend Server**
   ```bash
   cd backend
   npm install
   npx tsc
   node dist/src
2. **Running frontend Service**
   ```bash
   cd frontend
   npm install
   npm run dev
