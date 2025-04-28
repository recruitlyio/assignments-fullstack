# Advanced Candidate Matching System

## Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Core Challenges and Solutions](#core-challenges-and-solutions)
- [Technical Decisions and Tradeoffs](#technical-decisions-and-tradeoffs)
- [Scaling and Future Improvements](#scaling-and-future-improvements)
- [Setup Instructions](#setup-instructions)
- [Demo](#demo)

---

## Overview

This project implements an AI-augmented candidate matching system that intelligently connects job roles to candidates.
It goes beyond basic keyword matching to address real-world recruiting complexities such as skill equivalence, experience depth, and potential fit.

Built with:
- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + TypeScript
- **Database**: Neo4js
- **AI Integration**: LLM API for semantic augmentation

---

## System Architecture

### High-Level Components
- **Frontend (React)**  
  - Simple Form Component to submit job descriptions and role
  - View best candidate and explainability details

- **Backend (Node.js/TypeScript)**  
  - Skill normalization and extraction
  - Scoring engine based on structured algorithms
  - LLM augmentation for skill equivalence and experience depth
  - Knowledge graph for related skills and technologies

 - **Database (Neo4j)**
   - Stores skills, aliases, technologies, and relationships
   - Dynamically queried to expand skills and infer connections

- **LLM Usage**  
  - Identify equivalent/related skills
  - Enrich candidate profiles with inferred skills
  - Not responsible for final scoring (adheres to constraint)

### Flow Diagram
1. Upload Job Description & Role
2. Extract Skills & Requirements from the job description and resume which is saved on server
3. Normalize and Expand Skills using Knowledge Graph + LLM
4. Score Candidates via Structured Algorithm
5. Return Best Candidates with Explainable Insights

---

## Core Challenges and Solutions

### 1. Skill Equivalence
**Challenge:** "React" vs "ReactJS" vs "React.js"  
**Solution:**  
- Created a basic Knowledge Graph of skill aliases.
- Queried LLM to expand skill relationships.
- Normalized extracted skills before matching.

### 2. Experience Depth
**Challenge:** Distinguishing real expertise from keyword stuffing.  
**Solution:**  
- Extracted context around skills from resumes.
- Asked LLM to classify experience depth (e.g., "Beginner", "Intermediate", "Advanced") based on context.

### 3. Potential Fit
**Challenge:** Recognizing transferable and adjacent skills.  
**Solution:**  
- Used Knowledge Graph + LLM to identify transferable skills.
- Boosted match scores if candidates had adjacent, relevant experience.

---

## Technical Decisions and Tradeoffs

- **Structured Extraction First:**  
  Avoided sending full documents to LLM, instead extracted key points and processed them selectively.

- **LLM for Expansion Only:**  
  LLM was only used for skill expansion, transferability mapping, and experience classification — not final decision making.

- **Simple Knowledge Graph Implementation:**  
  Used Neo4j to efficiently store and query relationships between skills, allowing real-time expansion and related skill discovery.

- **Sample Data Approach:**  
  Used mock resumes and job descriptions to focus on core logic rather than data cleaning or real-world noise.

---

## Scaling and Future Improvements

- **Graph Database Integration:**  
  Optimize Neo4j queries for large-scale production datasets.

- **Continuous Learning:**  
  Track successful hires to refine matching heuristics over time.

- **Resume Parsing Improvements:**  
  Integrate dedicated NLP resume parsers for better entity extraction.

- **Feedback Loop:**  
  Allow recruiters to provide feedback on matches to retrain and improve scoring models.

- **Multi-Language Support:**  
  Support multilingual resumes and job descriptions.

- **Test-Case:**
  Should implement end to end to test case
---

## Setup Instructions

### Prerequisites
- Node.js v18+
- pnpm

### Backend Setup
```bash
cd as1-backend
yarn install
yarn dev
```

### Frontend Setup
```bash
cd as1-frontend
yarn install
yarn dev
```

> Ensure the backend server is running before starting the frontend and check the console if log has normailized resume in backend then submit the form.

### Environment Variables
- Create a `.env` file in the backend:
```bash
PORT=your_port
NODE_ENV=development
GEMINI_API="your apiKey"
NEO4J_URI="your apikey"
NEO4J_USERNAME="your neo4j Username"
NEO4J_PASSWORD="your neo4j Password"
FRONTEND_URL="http://localhost:3000"
```
- CREATE A `.env` file in the frontend
```bash
NEXT_PUBLIC_BACKEND="http://localhost:4000"
```

---

## Demo

- Upload a job description and role
- View best ranked candidates along with explainability details showing:
  - Skill matches
  - Related skill matches
  - Depth of experience
  - Transferable skills considered
  - Reason why he is best

---

