# Technical Interview Question Generator

A professional tool for generating tailored technical interview questions based on job requirements and candidate experience levels.

## Features

- 🎯 Job-specific question generation
- 📊 Experience-based difficulty calibration
- 🔍 Detailed evaluation criteria
- 🌓 Dark/Light theme support
- 🎨 Professional, responsive UI
- ⚡ Real-time filtering and sorting
- 🤖 AI-powered question generation

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   > Get your API key from [OpenAI's platform](https://platform.openai.com/api-keys)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technical Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- OpenAI API

## Technical Approach

### Question Generation
- AI-powered question generation using OpenAI's GPT models
- Fallback to pre-defined templates when needed
- Questions are generated based on skill areas and experience levels
- Each question includes detailed evaluation criteria
- Difficulty is calibrated using a sophisticated algorithm that considers:
  - Candidate experience level
  - Skill area complexity
  - Question position in the sequence

### Difficulty Calibration
- Four difficulty levels: Easy, Medium, Hard, Expert
- Dynamic adjustment based on:
  - Years of experience
  - Role requirements
  - Skill area complexity

### Evaluation Guidelines
Each question includes:
- Clear passing criteria
- Excellence markers
- Time estimates
- Specific evaluation points

## Future Enhancements

- Question history and favorites
- Export functionality
- Team collaboration features
- Question analytics and insights