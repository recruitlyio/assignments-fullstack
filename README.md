# Interview Generator

AI Powered Interview Generator.

## Tech Stack

Frontend: NextJS, tailwind css, Typescript

Backend: Express.js, Typescript

DB: MongoDb

Model: OpenAI openai/gpt-4o

## Algorithm

1. Collect the candidate details.
2. Build the Chat Prompt.
3. Ask the AI to repond for the prompt.
4. Parse the AI Response.
5. Return the question and answers.
6. Save the marks obtained for each question.
7. Grade the candidate's performance based on the marks obtained.

### Caliberating the difficulty:

1. The work experience of the candidate information is collected and used in the chat prompt.
2. Difficulty level manually inputted by the interviewer (easy, medium, hard).

### Tradeoffs

1. AI APIs
2. Time Constraint

## How to Set-Up

1. Clone the repository [repository](https://github.com/PranuPranav97/recruitly-interview-generator).
2. `cd` into the backend. Run `npm install`
3. Create `.env` file and add `OPENAI_API_KEY` and `MONGO_URI` to backend .env
4. Run `npm run dev` to start dev server.
5. `cd` into frontend and run `npm install`
6. Create `.env.development` file and add `NEXT_PUBLIC_BACKEND_BASE_URL`.
7. Run `npm run dev` to start development server.
8. Open the URL Shown by the frontend terminal.

## Demo & Source Code

[Video](https://drive.google.com/file/d/1YxCgyZUZezHSPk_aJkK4Fuz611j5Qxx8/view?usp=sharing)

[GitHub Repository](https://github.com/PranuPranav97/recruitly-interview-generator)

## Improvements

1. Candidate's Experience based question generation.
2. Diffferent Prompt types.
3. Functionality to switch LLMs
4. Precise Skill based question and answer generation.
