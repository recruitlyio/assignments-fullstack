# Technical Interview Questions Generator

A full-stack application that generates tailored technical interview questions based on job requirements and candidate profiles. Built with TypeScript, React, and Node.js.

## Features

- **General Question Generation**: Generate technical interview questions based on:

  - Categories (Algorithms, System Design, Frontend, etc.)
  - Difficulty levels (Easy, Medium, Hard, Expert)
  - Seniority levels (Junior, Mid, Senior, Staff)
  - Custom keywords

- **Job-Match Question Generation**: Generate questions specifically tailored to:

  - Candidate's experience level
  - Required skills for the position
  - Job description
  - Years of experience

- **Question Management**:
  - Search and filter questions
  - View detailed question information
  - Submit feedback on questions -- will be done later
  - Question difficulty calibration -- will be done later

## Tech Stack

- **Frontend**:

  - React with TypeScript
  - Tailwind CSS for styling
  - React Toastify for notifications

- **Backend**:
  - Node.js with TypeScript
  - Express.js
  - OpenAI API integration

## Screenshots and Demos

<img width="1582" alt="Question Generation Interface" src="https://github.com/user-attachments/assets/3e827fa3-7251-4ff6-9b68-dffb9db89aec" />

## Screen Recordings

![Question Generation Demo](https://github.com/user-attachments/assets/6b463a4a-053a-480d-9843-74736502de49)
_Demo of the question generation process_

- [Job-Match Question Generation Demo](https://github.com/user-attachments/assets/b2dcf6e0-be07-44c1-9e74-037e131444e5)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/technical-interview-questions-generator.git
   cd technical-interview-questions-generator
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Add your OpenAI API key and other configuration

### Running the Application

1. Make the run-local script executable:

   ```bash
   chmod +x run-local.sh
   ```

2. Run the application:

   ```bash
   ./run-local.sh
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
technical-interview-questions-generator/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the language model API
- The open-source community for various libraries and tools used in this project
