# Interview Questions Generator AI

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)

## Description
This project includes features like new interview creation, ai based question generation and visiting previously generated interviews based on the date and the difficulty level. 
Client: ReactJS (Vite)
Server: NodeJS (Express)
Database: MongoDB


## Features
- **Question Interface**: User-friendly interface which showcases questions in a chat like interface.
- **Interview Generation**: AI algorithm generates questions based on the difficulty level and the topic.
- **Interview Creation**: User can create new interviews with the job description, years of experience, and the difficulty level.

## Installation

https://www.loom.com/share/a15908a1a94b4c3f8666db1c7cbf9a2f?sid=449254c0-b7f2-4238-9f29-d681120ebfc9

### Prerequisites
Ensure the following are installed:
- **Node.js**  
- **Docker**  

### Steps
1. **Clone the repository**:
   
  ```bash
   git clone https://github.com/keshavsaini2607/user-management-app.git
  ```
2. **Setup Frontend:**
   
  ```bash
    cd assignments-fullstack/client
    npm install
    npm run dev
  ```
  Access the frontend at: http://localhost:3000/

3. **Setup Backend:**

Open a new terminal and navigate to the backend directory:
  ```
    cd assignments-fullstack/server
  ```

4. **Pull and run the Docker image:**

 ```
    docker pull keshavsaini0905/interview-server:latest
    docker run -d -p 8000:8000 keshavsaini0905/interview-server:latest
  ```
Backend API: http://localhost:8000/

5. **Access the Application:**:
Visit http://localhost:3000/ to use the application.

**Key Components:**

1. **Client (ReactJS/Vite):** The frontend of the application, built using ReactJS with Vite as the build tool, handles user interactions and displays the interview interface.
2. **Express Server:** A Node.js web application framework that handles the backend logic, processes API requests, and integrates with the AI service for question generation.
3. **MongoDB:** A NoSQL database that stores interview data, questions, and user responses. It provides flexible schema design for handling various types of interview data.
4. **AI Integration:** An artificial intelligence component that generates relevant interview questions based on provided parameters like difficulty level and topic.

**Data Flow and Interactions**

1. **Client to Server:** The React frontend sends requests to the Express backend when users create new interviews or request question generation.
2. **Server to AI Service:** The Express server communicates with the AI service to generate appropriate interview questions based on user parameters.
3. **Server to Database:** The Express server interacts with MongoDB to store and retrieve interview data, including generated questions and user responses.
4. **Client Display:** The React frontend receives and displays the generated questions in a chat-like interface, allowing for an interactive interview experience.
