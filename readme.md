# 🧠 AI Technical Interview Question Generator

An AI-powered system that generates technical interview questions tailored to job roles and candidate experience levels. It helps recruiters create role-specific, skill-focused, and difficulty-calibrated questions — along with evaluation criteria.

---

## 📌 Features

- Input job role, skills, and candidate experience level
- Generate domain-specific technical questions using GPT-3.5-turbo
- Clear evaluation guidelines for each question
- Categorized by skill topic (e.g., React, Node.js, SQL)

---

## 🛠 Tech Stack

- Frontend React JS
- Backend Node.js (TypeScript)
- API OpenAI GPT-3.5-turbo
- Styling TailwindCSS

---

## 🧠 How It Works

1. Recruiter enters

   - Job Role (e.g., Frontend Developer)
   - Core Skills (e.g., React, TypeScript)
   - Experience In Years
   - Job Description
   - No Of Question

2. Backend processes this into a structured GPT prompt.

3. GPT-3.5-turbo generates

   - A technical question
   - Suggested answer or key points
   - Evaluation criteria

---

## 🧪 Sample Output

```json
{
  "result": [
    {
      "question": "What is JSX in React?",
      "answer": "JSX is a syntax extension for JavaScript that allows writing HTML-like code within React components."
    },
    {
      "question": "What is the difference between state and props in React?",
      "answer": "Props are passed from parent to child components, while state is managed within the component itself."
    },
    {
      "question": "What are React Hooks?",
      "answer": "Hooks are functions like useState and useEffect that let you use state and lifecycle features in functional components."
    }
  ]
}
```

## 🤖 AI Integration

This project integrates with the **OpenAI GPT-3.5-Turbo** model to generate role-specific technical interview questions.

### ⚠️ Important Notes:

- You need a valid OpenAI API key to enable dynamic question generation.
- GPT-3.5-Turbo is a paid API, and free-tier access may be limited or unavailable.
- Without an API key, the system UI will load, but question generation will not work.
- I have tried using several alternative APIs, but most of them are paid and the ones that are free do not provide quality questions or generate them accurately. If you could provide me with the purchased OpenAI credentials or API key, I would be able to complete everything perfectly.

### 🧪 Fallback System

- I attempted integration with **Hugging Face models**, but the **response accuracy was poor and inconsistent** for technical interview tasks.
- As a workaround, I have included a local `sample.json` file that:
  - Mimics the structure of real AI-generated questions.
  - Allows the UI and logic to function for **demo purposes**, even without an API key.

### 🔐 Setup Your OpenAI API Key

Create a `.env` file inside the `server` folder:

```env
OPENAI_API_KEY=your-api-key-here

```
