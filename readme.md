# Advanced Candidate Matching System

An intelligent AI-based system that matches candidates to jobs by understanding **skill equivalence**, **experience depth**, and **potential fit** using OpenAI's GPT-4 API.

Built with:

-  **Frontend**: Next.js (TypeScript) + Tailwind CSS  
-  **Backend**: Express.js (JavaScript)  
-  **AI Engine**: OpenAI API

---

## Features

- Submit any job description and multiple candidate profiles
- Intelligent evaluation of candidates using GPT-4.1
- Returns a **match score (0–100)** and **natural language explanation**
- Simple UI to edit, submit, and visualize results

---


---

## Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | Next.js (TypeScript) |
| Styling   | Tailwind CSS        |
| Backend   | Express.js (JavaScript) |
| AI Engine | OpenAI GPT-4        |
| HTTP      | Axios               |

---

## 🔧 Setup Instructions

###  Prerequisites

- Node.js 18+
- OpenAI API key
- npm or yarn

---

##  Backend Setup (Express.js)

### 1. Navigate to backend folder

- cd backend

### 2. Install dependencies
bash
Copy
Edit
npm install

### 3. Add environment variables
Create .env file:

env
Copy
Edit
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000

### 4. Run the server
bash
Copy
Edit
node index.js

## Frontend Setup (Next.js)
### 1. Navigate to frontend folder
bash
Copy
Edit
cd ../frontend
### 2. Install dependencies
bash
Copy
Edit
npm install
### 3. Start the development server
bash
Copy
Edit
npm run dev
