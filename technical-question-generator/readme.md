# 🧠 Technical Interview Question Generator

This is a full-stack web application that generates technical interview questions based on a user's input for job title, skills, and experience level.

Built with:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- LLM API Integration (Claude / Groq / OpenAI)

---

## ✨ Features

- Enter job title, skills, and experience level
- Automatically generates 5 technical interview questions
- Displays questions along with evaluation criteria
- Clean, responsive UI
- Full error handling for API responses

---

## 📦 Project Structure

/frontend (React Vite app)

- components/

  - Form.tsx

  - QuestionCard.tsx

-pages/

  - Home.tsx

- App.tsx

- axiosInstance.ts

- package.json

/backend (Express server)

- claudeService.js

- questionController.js

-questionRoutes.js

- app.js

- server.js

- package.json

- .env

## 🚀 Getting Started

### 1. Clone the repository

  
        git clone https://github.com/yourusername/technical-question-generator.git
       cd technical-question-generator

### 2. Setup Backend
    
     cd backend
     npm install
### Create a .env file inside /backend:

    CLAUDE_API_KEY=your_real_api_key_here
     PORT=
     
 Start the backend server:

bash
Copy
Edit
npm run dev
Backend will be available at http://localhost:5000.

3. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Frontend will run at http://localhost:5173.

Make sure axiosInstance.ts in frontend points to:

typescript
Copy
Edit
baseURL: 'http://localhost:5000/api'
🛠 Environment Variables (.env)
Only needed for the backend:


Variable	Description
CLAUDE_API_KEY	Your API key from Anthropic, Groq, OpenAI, etc.
PORT	Port to run Express server (default: 5000)
📋 API Endpoints

Method	Route	Description
POST	/api/questions	Generates interview questions
POST Request Body:

json
Copy
Edit
{
  "jobTitle": "Frontend Developer",
  "skills": "React, JavaScript, CSS",
  "experienceLevel": "Mid"
}
Example Response:

json
Copy
Edit
{
  "questions": [
    {
      "question": "Explain the concept of Virtual DOM in React.",
      "evaluationCriteria": "Understanding of how React optimizes DOM manipulation."
    }
  ]
}
🎨 Technologies Used
React

Vite

Tailwind CSS

TypeScript

Express.js

Axios

dotenv

Nodemon

Anthropic Claude / Groq API

🧠 Future Improvements
Add loading spinner during API call

Let user choose model (Claude, Groq, OpenAI)

Add authentication and protected routes

Deploy frontend and backend (Vercel + Render)

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Anthropic Claude    