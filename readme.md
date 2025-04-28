#  Technical Interview Question Generator

An AI-powered web app that generates tailored technical interview questions based on job role and candidate experience level.

---

##  Core Features

- Input job role and experience level
- Dynamically generates relevant technical questions
- Difficulty calibrated based on candidate level (Junior, Mid-level, Senior)
- Clear evaluation criteria for each question
- Responsive React frontend + Node.js/TypeScript backend

---

##  Tech Stack

- **Frontend**: React + TypeScript + Material UI
- **Backend**: Node.js + Express + TypeScript
- **AI API**: Groq (LLama 3 - 8B model)
- **HTTP Client**: Axios

---

##  Approach to Question Generation

- When a user provides the job role and experience level,  
- A structured prompt is dynamically created.
- The backend sends this prompt to Groq's LLM API.
- The model is instructed to generate **role-specific**, **difficulty-appropriate** questions and **evaluation criteria**.

Sample Prompt Example:
> "Generate a technical interview question for a Junior candidate applying for a Frontend Developer role. Also provide clear evaluation criteria."

---

##  How Difficulty is Calibrated

- **Junior**: Questions focus on fundamental concepts and basics.
- **Mid-level**: Questions test applied skills and deeper understanding.
- **Senior**: Questions challenge architectural knowledge, design patterns, and system thinking.

Difficulty calibration is controlled through the **prompt phrasing** sent to the model.

---

##  Technical Decisions and Trade-offs

| Decision | Reason |
|----------|--------|
| **TypeScript** on both frontend and backend | Type safety and better scalability |
| **Material UI (MUI)** for frontend components | Quick, responsive, professional UI |
| **Groq LLM API** instead of OpenAI | Lower latency and cheaper token pricing |
| **Backend handles prompt construction** | Separation of concerns — frontend stays clean |
| **No database for MVP** | Focus on functionality over persistence |

**Trade-off**: If scaled for production, question caching and database storage would be necessary.

---

## 🛠 Setup Instructions (Local Running)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/interview-question-generator.git
cd interview-question-generator



