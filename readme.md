---

# Candidate Engagement Chatbot

## Overview

The **Candidate Engagement Chatbot** is a simple web application that interacts with candidates by answering their queries about job roles using an AI-powered backend. The application uses a conversational AI model to assist candidates by providing job-related information, answering questions, and extracting candidate-specific information from their messages.

This project includes:
- A frontend built with React and Bootstrap
- A backend using Node.js and Express that communicates with a conversational AI API to process messages and retrieve responses
- Persistent session management to maintain context between messages
- A simple mechanism to extract candidate information (e.g., job-related skills and experience)

---

## Conversation Design Approach

The chatbot’s primary function is to help candidates understand a job description and answer their questions. The conversation flow follows these key principles:

1. **Initial greeting**: The chatbot starts by greeting the user and asking how it can assist them with the job description.
2. **User interaction**: The chatbot listens to the candidate's queries and responds accordingly.
3. **Job-specific context**: The chatbot has a predefined job description that provides context for the conversation, and it uses this to guide its responses.
4. **Information extraction**: As the conversation progresses, the chatbot extracts relevant candidate information (such as job experience or skills) from the messages to provide personalized feedback.

The chatbot leverages AI to process and understand the user's input and context, which is then fed back into the system to maintain a dynamic conversation.

---

## Extracting and Structuring Candidate Information

The application extracts candidate information by analyzing their responses using the following approach:

- **Extracting relevant data**: As the candidate communicates, the system processes the user's messages to extract details about their skills, experience, and suitability for the job.
- **Candidate profile**: A simple structure is used to store the candidate's details, including fields like skills, experience, and other job-specific data.
  
Whenever the candidate sends a message, it is processed and analyzed using the `extractCandidateInfo` function, which updates the candidate profile stored in memory.

```js
extractCandidateInfo(message, session.candidateProfile);
```

The candidate profile is updated on every interaction to keep track of the ongoing conversation and the details shared by the candidate.

---

## Technical Decisions and Tradeoffs

### Frontend
- **React & Bootstrap**: We chose React for building the frontend to create a dynamic, component-based architecture. Bootstrap was used for the UI framework to quickly develop responsive and clean designs.
- **State management**: React’s `useState` is used to manage the component's state, such as the user’s input and the messages in the conversation.

### Backend
- **Node.js & Express**: The backend is built using Node.js and Express. This combination is lightweight and ideal for handling RESTful APIs, making it a good fit for serving the chatbot requests.
- **OpenRouter.ai for LLM integration**: The backend interacts with an AI model using an API request to OpenRouter.ai to generate chatbot responses based on the job description and user input.
  
### Session Management
- **Session persistence**: The session ID is stored in `localStorage`, ensuring that each candidate's conversation state is maintained between page reloads. If a session ID doesn’t exist, it is created automatically using `uuid` to ensure unique sessions.

### Information Extraction
- **Text extraction**: The backend includes an `extractCandidateInfo` service that processes messages to extract relevant candidate details like skills, experience, etc. This can be expanded with more sophisticated natural language processing techniques depending on the needs.

### Tradeoffs
- **Simple Memory Management**: The current memory structure stores session data in memory. This is simple and works well for a demo but could be replaced by a more scalable solution like a database for production use.
- **Basic AI model**: We used a basic conversational AI model (`meta-llama/llama-3-8b-instruct`). Although this works for simple interactions, for more complex queries, a more powerful or custom model may be needed.

---

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- A valid OpenRouter API key for interacting with the conversational AI model (this is required to get the responses from the model)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/candidate-engagement-chatbot.git
cd candidate-engagement-chatbot
```

### 2. Install Backend Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

### 3. Set Up the Environment

Create a `.env` file in the backend directory with the following content:

```env
OPENAI_API_KEY=your-openai-api-key-here
```

Replace `your-openai-api-key-here` with your actual API key from OpenRouter.

### 4. Start the Backend Server

In the backend directory, run:

```bash
npm start
```

The server will start on `http://localhost:5000`.

### 5. Install Frontend Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
cd ../frontend
npm install
```

### 6. Start the Frontend Server

In the frontend directory, run:

```bash
npm start
```

The frontend application will be accessible at `http://localhost:3000`.

---

## Working Demo with Sample Job Data

When you run the application, it will simulate a job opening for a **Senior Frontend Engineer**. The job description is predefined and is as follows:

```
We are hiring a Senior Frontend Engineer.
Requirements: JavaScript, React, CSS, 4+ years experience.
Location: Remote.
```

The chatbot will interact with the candidate by asking how it can help and then responding based on the candidate’s input about the job role. Additionally, the chatbot will keep track of the candidate's profile (skills, experience, etc.) as the conversation progresses.

---
