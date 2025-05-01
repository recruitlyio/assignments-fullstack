# Interview Question Generator

An AI-powered application that generates tailored technical interview questions based on job title, skills, and experience level.

## Features

- Generate customized interview questions for technical roles
- Specify required skills and experience level
- Control the number of questions generated
- Get evaluation criteria for each question
- Input validation to ensure quality question generation
- API key authentication for security

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interview-generator
```
2. Install dependencies for both server and client:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

3. Set up environment variables:
 3.1Create a .env file in the server directory with the following variables:
 OPENAI_API_KEY=your_openai_api_key_with_gpt4_access
 VALID_API_KEY=your_custom_api_key_for_authentication

3.2 Create a .env file in the client directory:
 REACT_APP_API_KEY=your_custom_api_key_for_authentication

Note: The VALID_API_KEY in the server and REACT_APP_API_KEY in the client must match exactly.
