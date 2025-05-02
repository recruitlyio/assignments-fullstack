# Intelligent Resume Parser

## Overview

This project is an **Intelligent Resume Parser** built using a hybrid approach:

- Combines a **Large Language Model (LLM)** (Gemini 2.0 Flash) for flexible extraction from unstructured resumes.
- Uses a **Node.js/TypeScript** backend for refinement, validation, and standardization.
- Features a **React frontend** for an interactive and clean user experience.

## Features

- Enter plain-text resumes directly into the app.
- LLM extracts key resume data points using dynamic prompting.
- Backend refines and structures the extracted data:
  - Parses dates and calculates durations.
  - Filters incomplete entries.
  - Validates data consistency and required fields.
  - Standardizes formats (dates, names, etc.).
- Displays parsed data and validation issues in a user-friendly UI.

## Parsing Approach

1. **Preprocessing**: Backend identifies resume sections, dates, and keywords.
2. **Dynamic Prompting**: Generates tailored prompts based on preprocessing hints.
3. **LLM Extraction**: Gemini 2.0 Flash extracts raw data.
4. **Structured Refinement**: Backend processes and structures the raw data.
5. **Validation**: Detects inconsistencies and missing fields.
6. **Standardization**: Ensures uniform formats for dates, durations, and labels.

## Edge Case Handling

- **Varied Formats**: Dynamic prompting supports both structured and narrative resumes.
- **Inconsistent Dates**: Robust date parsing handles multiple date formats.
- **Missing Data**: Incomplete entries are filtered and flagged.
- **Work Experience Overlaps**: Conflicts are detected and shown clearly.

## Technical Decisions & Tradeoffs

- **Tech Stack**: React (frontend), Node.js + TypeScript (backend).
- **LLM**: Gemini 2.0 Flash used for initial extraction due to its flexibility.
- **Hybrid Model**: More backend complexity in exchange for improved accuracy and reliability.
- **Validation & Parsing in Code**: Avoids reliance on strict LLM formatting.
- **No Hardcoded Lists**: Skill/degree names extracted flexibly using the LLM.

## Setup Instructions

### Prerequisites

- Node.js and npm (or yarn) installed
- Google API key (for Gemini 2.0 Flash)

### Clone the Repository

```bash
git clone <repo_url>
cd <repo_dir>
```

### Backend Setup (Node.js/TypeScript)

```bash
cd server-app
npm install           # or yarn install
```

Create a `.env` file in server-app:

```env
GOOGLE_API_KEY=your_google_api_key
```

Build and run the server:

```bash
npm run build         # or tsc
npm run dev           # or npm start if using compiled JS
```

### Frontend Setup (React)

```bash
cd ../frontend
npm install           # or yarn install
npm start             # or yarn start
```

Open your browser at: http://localhost:3000

## Usage

1. Paste your resume as plain text into the input box.
2. Click Parse.
3. View structured data and validation results instantly.

## Future Enhancements & Roadmap

### Enterprise-Grade Scalability

- **Background Job Orchestration**: Implementation of Trigger.dev or Ingest for asynchronous parsing operations, allowing for robust error handling, retries, and distributed processing.
- **Persistent Resume Storage**: MongoDB/PostgreSQL integration for parsed resume storage, eliminating redundant processing and enabling historical analysis.
- **Horizontal Scaling Architecture**: Containerization with Docker and Kubernetes for seamless scaling during high-volume recruitment periods.

### Advanced AI & Analytics

- **Intelligent Candidate Ranking**: ML-powered scoring algorithm to match candidates against job descriptions with configurable weighting parameters.
- **Sentiment & Context Analysis**: Enhanced LLM implementation to detect candidate strengths beyond explicit resume content.
- **Trend Identification**: Automated discovery of emerging skills and qualifications across parsed resumes.

### Recruiter Experience

- **Advanced Search & Filter Interface**: Elasticsearch integration for lightning-fast filtering by multiple dimensions (skills, experience levels, education).
- **Multi-format Support**: Seamless handling of PDF, DOCX, HTML, and plain text resumes using specialized parsers and OCR capabilities.
- **Interactive Visualization**: Dynamic charts and graphs for comparing candidates across key metrics.

### DevOps & Monitoring

- **Comprehensive Telemetry**: OpenTelemetry integration for performance monitoring, error tracking, and usage analytics.
- **A/B Testing Framework**: Infrastructure for testing different parsing strategies against accuracy metrics.
- **CI/CD Pipeline**: Automated testing and deployment workflows to ensure parsing quality and system reliability.

## License

MIT License
