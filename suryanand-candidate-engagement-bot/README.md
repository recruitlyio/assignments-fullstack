# Job Applicant Screening Chatbot

A specialized chatbot that engages job applicants with contextually relevant information while qualifying their fit for a position.

## Features

- Interactive chat interface for job applicants
- Resume parsing (PDF/DOCX) using AI
- Information collection form
- Contextual job information responses
- Candidate qualification extraction
- Real-time candidate profile building

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Vercel account (for deployment)
- Access to xAI (Grok) API

### Local Development

1. Clone the repository:
   \`\`\`bash
   git clone
   cd job-applicant-chatbot
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   \`\`\`
   XAI_API_KEY=your_xai_api_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment

The easiest way to deploy this application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set the required environment variables
4. Deploy

## Usage

1. Fill out the basic information form or upload a resume
2. Chat with the AI assistant to learn about the position and share qualifications
3. View the summary to see what information has been collected

## Customization

To customize the job description, modify the `lib/job-description.ts` file with details about the position.

## Limitations

- Currently supports a single job description
- Basic resume parsing capabilities
- English language only


# SUBMISSION BY 

- Suryanand Sunil | work@suryanand.com