# Candidate Engagement Chatbot - Technical Challenge

## My Solution Overview

This is a full-stack AI-powered chatbot that engages with candidates for a specific role and extracts relevant information from the conversation. It includes:

- A conversational UI for candidates to ask questions
- An intelligent backend that answers only based on a provided job description
- Automatic candidate profiling using an LLM (Google Gemini)
- A live summary panel showing extracted insights like skills, experience, education, and contact info

---

##  Conversation Design Approach

The system is designed to simulate a job-specific recruiter chatbot. Here's how it works:

1. **System prompt + Job Description (in backend)**:  
   The LLM is always primed with context:
   - System instruction (e.g. "Only answer questions related to this job description")
   - The actual job description

2. **Conversation context maintained across messages**
   - Previous user + bot messages are stored in memory
   - A trimmed version (last 20 turns) is included in each prompt to the LLM

3. **Real-time typing feedback**
   - A "Recruiter is typing..." indicator is shown while the LLM is responding
   - The input is cleared immediately after the user sends a message (like ChatGPT)

---

##  How Candidate Information is Extracted

After every message from the user, the backend makes a **second Gemini API call** to extract structured candidate details. The LLM is prompted to extract:

- `name`
- `email`
- `yearsOfExperience`
- `skills`
- `education`

If the field isn't mentioned, it is excluded. The extracted data is then returned to the frontend and merged into the live summary panel.

Example user message:
> "Hi, I’m Alex. I have 4 years of experience with React and Node.js. I graduated from IIT Delhi."

Extracted profile:
```json
{
  "name": "Alex",
  "yearsOfExperience": 4,
  "skills": ["React", "Node.js"],
  "education": "IIT Delhi"
}
```

---

## Technical Decisions & Tradeoffs

###  Stack Choices:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **LLM**: Google Gemini 2.0 Flash (accessed via REST API)

---

###  Key Architecture Decisions:

- **Modular Backend Services**
   - `llm.ts`: Handles user-bot chat and manages Gemini interaction
   - `candidateProfile.ts`: Makes a second Gemini call to extract structured candidate data
   - `conversationManager.ts`: Stores conversation context in memory to simulate persistent sessions

- **Frontend State Separation**
   - `messages[]`: for chat display
   - `CandidateProfile`: structured profile extracted via LLM
   - `ChatWindow` and `CandidateSummary` are split for modularity

---

###  Tradeoffs:

-  **Double API calls** (chat + profile extraction) increase accuracy but may incur higher LLM usage cost. This is acceptable for a demo/assignment, but could be optimized later using a single multi-task LLM prompt.
-  **In-memory context** is suitable for short-lived conversations but not persistent or multi-user scenarios.
The job description is hardcoded for simplicity — a real product would let HR upload/manage multiple JDs.

---

##  Running Locally

###  Prerequisites:
- Node.js (v18+)
- Google Gemini API Key

---

###  Setup Steps

#### 1. Clone the repository

```code
git clone https://github.com/renji18/assignments-fullstack
cd assignments-fullstack
```

#### 2. Backend Setup

```code
cd candidate-chatbot-backend
npm install
```

#### 3. Create a .env file with your Gemini API key:

- Make sure that the api key is for the model (Google Gemini 2.0 Flash)

```code
GEMINI_API_KEY=your-api-key-here
```

#### 4. Start the backend:

```code
npm run dev
```

#### 5. Frontend Setup

```code
cd ../candidate-chatbot-frontend
npm install
npm start
```

#### 6. Open the app

```code
http://localhost:3000
```

---

##  Notes

- All data is stored in memory (stateless between restarts)
- The chatbot is aware of only one job description, defined in `jobDescription.ts` on the backend
- The frontend merges extracted profile data incrementally as the conversation progresses
- Candidate summary includes: name, email, years of experience, skills, and education
- LLM integration is modular — can be swapped with OpenAI, Claude, or others

---

##  Future Enhancements

- Support multiple job descriptions and recruiter roles
- Replace in-memory context with persistent database storage
- Use a single Gemini prompt that handles both response and extraction to reduce latency and cost
- Add user authentication and multi-user session handling
- Improve UI/UX with better avatars, markdown formatting, and mobile responsiveness

---

##  Demo: Try These Messages

- Ask a job-related question:  
  _“What’s the tech stack for this role?”_

- Share background info:  
  _“I have 4 years of experience with React and Node.js. Graduated from BITS Pilani.”_

Watch the **live summary panel** update with your name, education, experience, and skills.

---