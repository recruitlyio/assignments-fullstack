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
git clone https://github.com/akhil2510/interview-generator.git
cd interview-generator
```

2. Switch to the branch akhilesh_muchhala :

```bash
git checkout akhilesh_muchhala
```

3. Install dependencies for both server and client:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

4. Set up environment variables:

   4.1Create a .env file in the server directory with the following variables:
   ```Bash
   OPENAI_API_KEY=your_openai_api_key_with_gpt4_access
   
   VALID_API_KEY=your_custom_api_key_for_authentication
   ```
   4.2 Create a .env file in the client directory:
   ```Bash
   REACT_APP_API_KEY=your_custom_api_key_for_authentication
   ```
Note: The VALID_API_KEY in the server and REACT_APP_API_KEY in the client must match exactly.
