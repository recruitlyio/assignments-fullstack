# Resume Parser

A modern resume parsing application that uses AI to extract structured information from unstructured resume text.

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd resume-parser
```

2. Set up environment variables

**Backend Setup (.env)**
```bash
cd backend
cp .env.example .env
```
Edit the `.env` file to add your OpenAI API key:
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

**Frontend Setup (.env)**
```bash
cd frontend
cp .env.example .env
```
Edit the `.env` file:
```
REACT_APP_API_URL=http://localhost:3001/api
```

3. Install dependencies and start servers

**Backend**
```bash
cd backend
npm install
npm start
```

**Frontend**
```bash
cd frontend
npm install
npm start
```

4. Open your browser to `http://localhost:3000`

## Features

- **Intelligent Resume Parsing**: Extracts details like contact information, work experience, education, skills, and projects
- **Visual Skills Analysis**: Interactive pie chart showing skills distribution
- **Resume Highlights**: Automatically identifies and highlights key information
- **Tabbed Organization**: Clearly organized sections for different resume components
- **Responsive Design**: Elegant UI that works across different devices

## AI Model Implementation

The parser uses OpenAI's GPT-4o model to understand and extract information from resume text. The process works as follows:

1. The frontend collects the resume text from the user
2. The backend sends this text to OpenAI's API with a specialized prompt
3. The model extracts structured information and returns it as JSON
4. If the API call fails, a fallback rule-based parser is used
5. The parser enhances the data by standardizing dates, inferring missing information, and categorizing skills

## Parsing Strategy

Our resume parser employs a sophisticated, multi-stage approach:

### 1. Text Preprocessing

- **Normalization**: We standardize formatting, whitespace, and line breaks
- **Section Detection**: The system identifies distinct resume sections using headings, patterns, and structural cues

### 2. Information Extraction

- **Named Entity Recognition**: Identifies names, locations, job titles, companies, and dates
- **Pattern Matching**: Uses regex and fuzzy matching for structured information like phone numbers and emails
- **Contextual Analysis**: Determines relationships between entities based on proximity and context

### 3. Semantic Understanding with LLM

Our parser leverages GPT-4o to achieve deeper semantic understanding:

- **Skill Classification**: Automatically categorizes skills and determines proficiency levels
- **Experience Analysis**: Interprets job descriptions to extract responsibilities and achievements
- **Temporal Reasoning**: Understands and normalizes different date formats and durations

### 4. Structured Data Generation

The extracted information is organized into a consistent JSON structure with the following components:

- Contact information
- Professional summary
- Work experience (with company, position, dates, and responsibilities)
- Education details
- Skills (with optional proficiency levels)
- Projects
- Certifications

## Technical Implementation

The application consists of:

- **Frontend**: React with TypeScript, tailored components for resume visualization
- **Parsing API**: Backend service that processes text and returns structured data
- **UI Components**: Skills pie chart, resume highlights, and skill badges

## License

[MIT License](LICENSE)

## Contact

For questions or support, please contact me. 