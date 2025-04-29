# Candidate Engagement Chatbot

A specialized chatbot that engages job applicants with contextually relevant information while qualifying their fit for a position. This project demonstrates effective conversational system design for initial candidate screening.

## Features

- Natural conversational interface for job candidates
- Provides relevant job details from a specific job description
- Extracts candidate qualifications during normal conversation
- Generates a structured profile summary from the conversation
- Maintains context across multiple conversation turns

## Technical Stack

- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Open AI for natural language understanding
- **State Management**: React Context API with custom hooks

## Project Structure

```
candidate-engagement-chatbot/
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # UI components
│       ├── contexts/     # React context providers
│       ├── hooks/        # Custom React hooks
│       ├── services/     # API services
│       ├── styles/       # CSS styles
│       └── types/        # TypeScript type definitions
└── server/               # Backend Node.js application
    ├── src/              # TypeScript source code
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── data/         # Sample data
    │   ├── models/       # Data models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   ├── types/        # TypeScript type definitions
    │   └── utils/        # Utility functions
    └── dist/             # Compiled JavaScript (generated)
```

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Open AI API key

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/recruitlyio/assignments-fullstack.git
   cd candidate-engagement-chatbot
   ```

2. Install dependencies:

   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following content:
     ```
     PORT=3001
     OPENAI_API_KEY=your_api_key_here
     NODE_ENV=development
     ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

   This will concurrently run both the client and server:

   - Client: http://localhost:5173
   - Server: http://localhost:3001

### Building for Production

1. Build the application:

   ```bash
   npm run build
   ```

2. The built client files will be in `client/dist` and server files in `server/dist`.

## Implementation Details

### Conversation Design

The conversation flow is designed to:

1. Welcome candidates and establish the purpose of the chat
2. Answer questions about the job position using the provided job description
3. Naturally extract information about the candidate's experience and skills
4. Maintain a friendly, professional tone throughout
5. Generate a structured profile based on the extracted information

### Open AI AI Integration

The system uses two main prompts for Open AI:

1. **Conversation Prompt**: Guides Open AI to respond to the candidate's questions and engage in a natural conversation while subtly gathering information.

2. **Profile Extraction Prompt**: A specialized prompt that analyzes the conversation to extract structured information about the candidate's qualifications.

### Candidate Profile Extraction

Instead of explicit form-filling, the system:

- Uses conversational cues to gather information
- Recognizes mentions of skills, experience, and qualifications
- Validates and structures this information into a candidate profile
- Updates the profile in real-time during the conversation

## Technical Decisions & Tradeoffs

- **Vite & Tailwind**: Chosen for fast development experience and rapid UI creation
- **Context Management**: Utilized React Context API for state management over Redux for simplicity and the limited scope of the application
- **Open AI AI Integration**: Chose Open AI for its strong conversational abilities and context management
- **TypeScript**: Implemented throughout for type safety and better developer experience
- **Component Structure**: Created reusable components with clear separation of concerns
- **Conversation State**: Maintained on the server to enable potential persistence and reduce client-side complexity

## Future Enhancements

With more time, the following improvements could be made:

1. **User Authentication**: Add secure login for candidates and recruiters
2. **Conversation Persistence**: Save conversations to a database
3. **More Sophisticated Profile Matching**: Match candidate profiles against job requirements with scoring
4. **Multiple Job Support**: Allow the chatbot to handle multiple job positions
5. **Automated Follow-ups**: Schedule follow-up conversations with promising candidates
6. **Analytics Dashboard**: Track conversion rates and candidate engagement metrics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
