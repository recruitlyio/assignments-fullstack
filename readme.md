# Technical Interview Question Generator

## Overview

The **Technical Interview Question Generator** is a web-based tool designed to assist recruiters by generating role-specific technical interview questions based on job requirements and candidate experience levels. The application leverages OpenAI's GPT API to create meaningful questions and provides evaluation criteria for each question. It also allows for easy customization and adjustments to the generated questions based on the specific needs of the recruiter.

---

## Features

- **Customizable Question Generation**: Generate technical questions based on the job title, primary skills, and experience level.
- **Experience Level Calibration**: Adjusts question difficulty based on candidate experience (e.g., Junior, Mid-Level, Senior).
- **Skill Area Categorization**: Categorize questions into specific skill areas (e.g., Frontend, Backend).
- **Evaluation Criteria**: Provides guidelines for evaluating candidates' answers to each generated question.

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Node.js, TypeScript, Express (for API communication with OpenAI)
- **AI Integration**: OpenAI API for question generation
- **Environment**: `.env` configuration for API keys and secret settings

---

## Project Structure

The project is split into two separate parts: **Client (Frontend)** and **Server (Backend)**.

```
Project/
├── client/          # Frontend (React + Vite)
└── server/          # Backend (Node.js + Express)
```

### Frontend (Client)

- **React** with **Vite** for fast development and HMR (Hot Module Replacement).
- **Tailwind CSS** for styling.
- **Radix UI** for accessible UI components.

### Backend (Server)

- **Node.js** with **Express** for REST API handling.
- **OpenAI API** integration for generating technical interview questions.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/technical-interview-question-generator.git
cd technical-interview-question-generator
```

### 2. Set Up Backend

#### a. Navigate to the `server` folder:

```bash
cd server
```

#### b. Install Backend Dependencies

```bash
npm install
```

#### c. Set Up Environment Variables

Create a `.env` file in the `server` folder and add the following:

```bash
PORT=3000
ENV=development
GITHUB_TOKEN=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
```

**Disclaimer**: The **GITHUB_TOKEN** is a dummy account used for testing purposes and will expire in a few days. Please replace it with your own token if necessary.

#### d. Run the Backend Server

To start the backend server:

```bash
npm start
```

This will run the backend server on `http://localhost:3000`.

---

### 3. Set Up Frontend

#### a. Navigate to the `client` folder:

```bash
cd client
```

#### b. Install Frontend Dependencies

```bash
npm install
```

#### c. Run the Frontend Server

To start the frontend server:

```bash
npm run dev
```

This will run the frontend development server on `http://localhost:8080`.

---

### 4. Testing the Application

Once both the backend and frontend are running, you can visit `http://localhost:8080` in your browser to see the Technical Interview Question Generator in action.

---

## Working Demo

[**Loom Demo Link**](your-loom-video-link-here)

This demo showcases the functionality of the Technical Interview Question Generator, including question generation, experience calibration, and categorization.

---

## Future Enhancements

- **Voice Interaction**: Integrate voice recording for candidates to answer interview questions via speech.
- **Multiple AI Models**: Add support for additional LLMs (e.g., Claude, DeepSeek) to offer diversity in question generation.
- **Question Bank**: Implement a system to store and reuse previously generated questions.
- **Database Integration**: Store candidate data, job roles, and generated questions for quicker reuse.
