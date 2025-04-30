# Smart Resume Parser

Smart Resume Parser is a modern web application that uses Google Gemini AI to extract structured information from resumes. It transforms unstructured resume text into clean, categorized JSON data and displays it with a polished UI.

## Features

- AI-powered resume parsing using Google Gemini
- Categorized skill tags
- Clean, readable UI with Tailwind CSS
- Modal-based suggestion viewer
- LocalStorage support to preserve parsed data
- Back navigation to home

## Getting Started

Follow the steps below to set up and run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-resume-parser.git
cd smart-resume-parser
```

### 2. Install dependencies

Make sure you have Node.js and npm installed. Then run:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your Google Gemini API key:

```ini
GEMINI_API_KEY=your_google_gemini_api_key
```

How to get a Gemini API Key:

1. Go to https://makersuite.google.com/app
2. Sign in with your Google account.
3. Click your profile icon and go to “API Keys”.
4. Click “Create API key”.
5. Copy it and paste it into your .env.local file as shown above.
   `

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see the app.

### Project Structure

`app/`: Main Next.js routing and layout

`components/`: Shared UI components (Card, Modal, etc.)

`lib/`: Resume parsing logic

`styles/`: Tailwind CSS setup

`public/`: Static assets

Technologies Used

- Next.js – React framework for SSR and routing
- Tailwind CSS – Utility-first CSS for styling

* Google Gemini API – For parsing resume content with AI
* TypeScript – Static typing for safety
* shadcn/ui – Prebuilt accessible UI components
