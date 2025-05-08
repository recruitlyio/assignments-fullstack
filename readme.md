# Resume Analyzer

This project helps analyze resumes.

## Setup

### Backend

The backend is built with NodeJS, TypeScript, and the Gemini API.

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm i
    ```
3.  Create a `.env` file or rename `.env.local` and add your `GEMINI_API_KEY`:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### Frontend

The frontend is built with React, Vite, and TypeScript. Axios is used for API calls.

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm i
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```