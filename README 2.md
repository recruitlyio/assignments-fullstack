# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# Job Chat Assistant

An AI-powered conversational job assistant built with Node.js (Express) and React. It allows users to explore job openings, inquire about responsibilities, qualifications, and benefits, and even apply by sharing their profile step-by-step.

---

## Conversation Design Approach

The bot is designed to:
- Understand natural language inputs (e.g., "I want to apply", "What are the qualifications for developer?")
- Recognize user intent using keyword-based matching (like "apply", "responsibilities")
- Guide the user through a structured question flow if they want to apply for a job
- Respond dynamically based on the current context (e.g., the job being discussed)
- If a user asks about job openings, the bot lists available titles.
- If a job is selected, the bot responds with either responsibilities, qualifications, or benefits based on the user's query.
- If the user wants to apply, the bot sequentially collects information like name, experience, skills, location, and notice period.
- Finally, it summarizes the profile and thanks the user.
---

## 📋 Candidate Information Collection

When a user wants to apply, the assistant enters a **collecting state**, prompting them one-by-one for:
- Full Name
- Experience
- Skills
- Location
- Notice Period

Responses are stored in `candidateState.info`. Once complete, a formatted summary is returned using the `getCandidateSummary()` function.

---

## Technical Decisions & Tradeoffs

- **Backend (Node.js with Express)**:
  - Lightweight and easy to set up for REST-style endpoints.
  - Uses simple string matching for intent detection (fast but not very robust for NLP).

- **Frontend (React)**:
  - Simple chat interface with basic state management.
  - Easily extendable for animations, avatars, or persistent chat.

- **Tradeoffs**:
  - No NLP/AI service used to keep it lightweight. Could be improved with NLP (Dialogflow, Rasa, or OpenAI).
  - State is stored in memory (non-persistent). In production, a DB or session manager should be used.

---

Setup Instructions

Prerequisites

Node.js (v14+)
npm or yarn

-**Backend Setup**
cd backend
npm install
npm run dev

-**Frontend Setup**
npm install
npm start

Run in Browser

Visit: http://localhost:5173

Try:

What jobs are available?
I want to apply
Tell me the qualifications of Backend Developer

# Candidate Engagement Chatbot

This project is a Node.js-based backend API for a candidate engagement chatbot that allows users to:

- View available job openings
- Inquire about specific job responsibilities, qualifications, and benefits
- Share candidate profile details for applications

---

## How Candidate Info Is Extracted and Structured

When a candidate chooses to apply:

- The `candidateState.collecting` flag is set to `true`
- The bot prompts one question at a time from a predefined list (`candidateQuestions`)
- The answers are stored in `candidateState.info`
- After collecting all fields, a formatted summary is generated using `getCandidateSummary()`

The candidate fields collected:
- Full Name
- Experience
- Skills
- Location
- Notice Period

---

## Technical Decisions and Tradeoffs

- **Framework:** `Express.js` for fast and simple REST API setup.
- **CORS:** Configured to allow frontend communication from `http://localhost:5173`
- **Body Parsing:** Used `body-parser` to parse incoming JSON data.
- **Job Data:** Imported from a local file (`jobDescriptions.ts`) for simplicity.
- **State Handling:** Used in-memory variables (`conversationState`, `candidateState`) for conversation context — suitable for prototype/demo purposes but not scalable in production.

---

## Setup Instructions (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/candidate-engagement-chatbot.git
   cd candidate-engagement-chatbot

Install dependencies
npm install

Start the server
npm run dev

Your backend will now run at: http://localhost:3001

Frontend
Ensure the frontend is running on http://localhost:5173

## Install concurrently

1. npm install concurrently --save-dev
2. Update package.json in your root project
If your folder structure looks like:

root/
├── client/     # your frontend (e.g., React/Vite)
├── server/     # your backend (your Express API)
Then in the root package.json, add:

"scripts": {
  "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\""
}
This will run the dev script in both client and server folders concurrently. 
run: npm start

## Sample API Flow
Job Inquiry

User: "What are the open positions?"
Bot: "Here are the available openings: [Job Titles]..."

Details

User: "Tell me responsibilities for Frontend Developer"
Bot: "Here are the responsibilities for Frontend Developer: ..."

Application

User: "I want to apply"
Bot: Sequential questions → Final summary

## File Structure
.
├── src/
│   └── models/
│       └── jobDescription.ts   # Contains mock job data
├── index.ts                    # Main server logic
├── package.json
└── README.md

## Notes
You can modify jobDescription.ts to add or remove job roles.
This bot uses plain text and <br> for line breaks (HTML safe).
In-memory state resets when the server restarts — use DB/session store for persistence in production.
