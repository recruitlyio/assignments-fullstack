# Recruitly.io - Interview Question Generator

## Project Overview
Create a system that generates relevant technical interview questions tailored to specific job requirements and skill levels.

---

## System Requirements
Ensure your system meets the following requirements before proceeding:

- **Node.js**: v21.2.0 or higher
- **npm/yarn**: Latest version
- **MongoDB**: v4.0 or higher (for backend database)

## Tech Stack

- **Backend**: Node.js, Exprses
- **Database**: MongoDB
- **Frontend**: React.js, Tailwind CSS

## Installation Instructions
In Github, client & server reside under the same directory, so just clone the parent one.
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git

### Backend (BE)

1. Change directory:
    ```bash
    cd server
2. Install dependencies:
   ```bash
   npm install
3. Copy all env's from env.example, create .env & paste all here
4. Make sure you have Mongo DB & Google Gemini setup. For MongoDB, we need MongoURL (either local or atlas), for gemini, we need API KEY, you can generate it from google ai studio (https://aistudio.google.com/apikey). Once both is setup, you can update your env variables.
5. Start the backend server:
    ```bash
   npm run dev

Make sure to copy all envs from env.example to .env

### Frontend (FE)

1. Change directory:
    ```bash
    cd client
2. Install dependencies:
   ```bash
   npm install
3. Start the clinet:
    ```bash
   npm run dev

## Postman Collection
I have also added postman collection, please import it while calling API's

    ```bash
    ./recruitly.io.postman_collection.json


## DB Schema
We have just one collection called Questions, where we hold questions related to specific job title, skill & difficulty.

```js
const questionSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        skill: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'easy',
        },
        evaluationCriteria: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

