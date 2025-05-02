# Candidate Engagement Chatbot

An AI-powered chatbot designed to interact with candidates, collect their information, and enhance the overall recruitment experience. This project includes a full-stack implementation with a React frontend and a Node.js backend.

---

## 🧠 Conversation Design Approach

The chatbot is designed to simulate a natural and guided conversation with a candidate. The flow includes:

- A friendly welcome message to set the tone.
- Provide input bar to enter candidate doubts.
- Loading message appear while fetching generated responses.

The conversation is structured in a way that:
- Uses clear and concise language.
- Persists user responses in context to avoid repetitive questions.

---

## 🗃️ Extracting and Structuring Candidate Information

Candidate information is collected from free-form input using the following approach:

- **Keyword Extraction** & **Pattern Matching** (e.g., email, numbers for experience).
- **Simple NLU logic** to map user responses to structured fields.


## 🛠️ Setup Instructions (Run Locally)

### Step-by-step:

1. Folder Location: Project present in `candidate-engagement-bot-yashrsb/`.

2. Navigate to the project folder:
```bash
cd candidate-engagement-bot-yashrsb
```

3. Install all dependencies:
```bash
npm install
```

4. Set up environment variables:
    In the server/ folder, copy the .env.example file and rename it to .env.
    Add Gemini API key in the following format:
```ini
# Server Port
PORT=3001

# Gemini API Key
GEMINI_API_KEY=gemini-api-key
```

4. Run the application:

```bash
npm run dev
```

4. Access the app:
Open ````http://localhost:3000``` in the browser.