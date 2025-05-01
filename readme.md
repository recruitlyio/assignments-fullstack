The main thing to note if you get any issue i also make other repo for this project by chance any issue got there also
Here is the link for that repo: https://github.com/naaa760/app-neha-chat

and here is the link of the demo video also: https://www.loom.com/share/aec5ef51f5e9427ea5fbd7685cfcee5f?sid=a0a179d5-4d61-4f87-a1ea-3d9d4c7c7e65

# Candidate Engagement Chatbot

A specialized chatbot that engages job applicants with contextually relevant information while qualifying their fit for open positions. This application features a React frontend with a conversational interface and a Node.js/TypeScript backend for managing conversation state and candidate information extraction.

## Features

- Interactive chat interface for candidates to ask questions about job openings
- Real-time response generation based on job description data
- Automatic extraction of candidate qualifications during natural conversation
- Visual candidate profile summary showing extracted information
- Responsive design that works across desktop and mobile devices

## Conversation Design Approach

The chatbot is designed to create a natural, recruiter-like conversation flow with candidates through:

1. **Conversational Tone**: The system prompt instructs the AI to be warm, professional, and conversational, mimicking a helpful recruiter rather than a bot.

2. **Context Management**: The application maintains conversation history across multiple interactions, allowing for coherent multi-turn dialogues.

3. **Guided Interactions**: The chatbot proactively asks questions to gather relevant candidate information while also answering their questions about the position.

4. **Natural Information Extraction**: Rather than using forms, the system extracts candidate qualifications naturally during conversation without explicitly asking for specific data points.

5. **Adaptive Responses**: Responses are tailored to the specific job description data, ensuring accurate and relevant information is provided.

## Candidate Information Extraction

The system extracts candidate information through:

1. **Function Calling**: Primary extraction occurs through structured function calling to the LLM API, which analyzes conversation content for relevant details.

2. **Pattern Recognition**: A fallback manual extraction system uses regex patterns and keyword detection to identify:

   - **Skills**: Technical abilities through keyword matching and context analysis
   - **Experience**: Work history and years of experience through phrase pattern detection
   - **Education**: Academic background through education-related keyword identification
   - **Other Qualifications**: Additional relevant information, including candidate name

3. **Progressive Profile Building**: The system continuously updates the candidate profile as new information is shared, creating a comprehensive view of qualifications.

4. **Visual Representation**: Extracted information is displayed in real-time in the candidate profile component, organized by category.

## Technical Decisions and Tradeoffs

### Architecture

- **Full-Stack Application**: React frontend with Node.js/TypeScript backend for a complete solution
- **RESTful API**: Simple communication between frontend and backend
- **LLM Integration**: Uses Groq API with the llama3-8b-8192 model for efficient response generation

### Frontend

- **React**: Component-based architecture for maintainable UI
- **Tailwind CSS**: Utility-first CSS framework for rapid styling and responsive design
- **Custom Animations**: Enhanced UX with subtle animations for message bubbles and transitions

### Backend

- **Express.js**: Lightweight server framework for handling API requests
- **TypeScript**: Strong typing for improved code quality and developer experience
- **Modular Structure**: Separation of concerns with dedicated services and routes

### Key Tradeoffs

- **Local-Only Storage**: Candidate information is stored in memory for simplicity but would need a database for production
- **Limited Job Descriptions**: Currently uses a single job description for demonstration purposes
- **Retry Mechanism**: Implemented API call retries with exponential backoff to handle potential service disruptions
- **Manual Extraction Fallback**: Added pattern-based extraction as a backup when AI function calling fails

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

   ```
   cd candidate-engagement-chatbot/server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the server directory with your Groq API key:

   ```
   GROQ_API_KEY=your_groq_api_key_here
   PORT=3001
   ALLOWED_ORIGIN=http://localhost:5173
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```
   cd candidate-engagement-chatbot/client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Usage

1. Ask questions about the job position (e.g., "What skills are required for this position?")
2. Share information about your background, skills, and experience naturally
3. View your candidate profile as it's built in real-time
4. Toggle the profile view using the button in the header

## Future Enhancements

- Authentication system for secure access
- Database integration for persistent storage of candidate information
- Support for multiple job descriptions
- Enhanced candidate information extraction accuracy
- Chat history persistence between sessions

## Technologies Used

- React
- TypeScript
- Node.js
- Express
- Groq API (LLM integration)
- Tailwind CSS
- Axios
