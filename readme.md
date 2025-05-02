

Interview Question Generator

## Overview

This project is designed to generate technical interview questions based on job requirements and experience levels. It leverages OpenAI's GPT-3 to produce high-quality interview questions, categorized by difficulty and evaluation criteria. The system is capable of adapting to various job requirements and experience levels, providing a customizable and scalable solution for technical interviews.

---

## Approach to Question Generation

1. **Input**: The user provides job requirements (e.g., React ,redux,node) and an experience level (junior, mid, or senior). 

2. **Question Generation**: Using GPT-3, we craft a prompt that instructs the model to generate technical questions. The prompt is dynamic and is structured to ensure that the generated questions focus on:
   - The specified job requirements (technologies)
   - The experience level of the candidate
   - Clear question formatting with the question, difficulty, and evaluation criteria
   
3. **Output**: Each generated question is returned with the following attributes:
   - **Question**: The actual interview question
   - **Difficulty**: The difficulty of the question (e.g., Easy, Medium, Hard)
   - **Evaluation Criteria**: Guidelines on what constitutes a good answer

---

## Calibrating Difficulty

To ensure questions align with the specified difficulty level, we use the following approach:
- **Junior**: Questions focus on basic concepts and practical knowledge, often involving straightforward tasks like explaining concepts or solving simple coding problems.
- **Mid**: Questions increase in complexity, often testing the candidate’s ability to handle more challenging scenarios and problem-solving.
- **Senior**: These questions delve into complex topics, architectural decisions, and optimization challenges that require in-depth knowledge and experience.

The difficulty is assigned based on the complexity of the task, the level of understanding required, and the experience expected for each role.

---

## Technical Decisions and Tradeoffs

1. **Using OpenAI GPT-3**:
   - **Advantages**: GPT-3 is capable of generating high-quality, contextually relevant questions tailored to different domains. It reduces the manual effort of creating questions.
   - **Disadvantages**: Depending on the quality of input and prompt design, the model might generate questions that are either too generic or overly complex. It may also introduce biases or inaccuracies, which need to be manually filtered.

2. **Question Format**:
   - The questions are returned in a structured format (question, difficulty, evaluation criteria), making it easy to integrate them into an interview pipeline.
   - **Tradeoff**: While structured, some questions may need human review to ensure they align well with the role and requirements.

3. **Customization**:
   - The approach allows the user to specify the job role and experience level, providing flexibility in the types of questions generated.
   - **Tradeoff**: Extensive customization might require fine-tuning the prompts for each unique scenario, which could be time-consuming.

4. **Handling Edge Cases**:
   - To address cases where the model may generate vague or irrelevant questions, we’ve implemented basic validation for content accuracy (e.g., ensuring all parts of the question format are present).
   - **Tradeoff**: While validation improves quality, it’s not foolproof, and manual review may still be required.

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

### 1. Clone the Repository


git clone https://github.com/your-username/your-forked-repo.git
cd your-forked-repo


### 2. Install Dependencies


npm install


### 3. Set Up OpenAI API Key

Ensure that you have an OpenAI API key and store it securely. You can set it as an environment variable or add it to a configuration file (`.env`):


OPENAI_API_KEY=your-api-key-here


Alternatively, configure your OpenAI API in `config/openai.js`.

### 4. Running Locally

To start the application, run the following command:


npm run dev


This will start both the frontend and backend services, and you can begin interacting with the interview question generator through the UI.





