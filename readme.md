# Advanced Candidate Matching System

A sophisticated candidate matching system that uses AI-augmented matching to solve real-world recruitment challenges.

## System Architecture

The system consists of two main components:

### Backend (Node.js/TypeScript)

- **Knowledge Model**: Maintains a graph of related skills and their relationships
- **Matching Engine**: Implements intelligent scoring and matching algorithms
- **AI Service**: Integrates with LLM for specific subtasks like explanation generation
- **Evolution Mechanism**: Tracks usage patterns and improves matching quality over time
- **Skill Extractor**: (Future Implementation) Will handle extraction and normalization of skills from raw resumes and job descriptions

### Frontend (React/TypeScript)

- **Home Page**: Displays available candidates and jobs
- **Match Page**: Shows detailed match analysis with explanations
- **State Management**: Uses Zustand for efficient state handling
- **Styling**: Custom CSS for clean, responsive UI

## Design Decisions

### Knowledge Graph

- Used a JSON-based structure for simplicity and ease of maintenance
- Implemented skill normalization to handle variations (e.g., "React" vs "ReactJS")
- Added confidence scores to track skill relationships

### Matching Algorithm

- Implemented a multi-factor scoring system:
  - Direct skill matches
  - Transferable skills with potential scores
  - Missing skills impact
- Used LLM strategically for:
  - Generating human-readable explanations
  - Identifying transferable skills
  - Normalizing skill variations

### Evolution Mechanism

- Tracks skill usage patterns
- Updates relationship strengths based on successful matches
- Maintains version history for auditability

### Note on Skill Extraction

For the scope of this assignment, we're using mock data with pre-extracted skills. The `SkillExtractor` component is implemented but not integrated, as it's designed for future use with real resumes and job descriptions. In a production environment, this component would:

- Extract skills and experience levels from raw resumes
- Parse job requirements from job descriptions
- Normalize extracted skills using the knowledge graph
- Handle various formats and structures of input documents

## Core Challenges Addressed

1. **Skill Equivalence**

   - Implemented skill normalization in `knowledgeModel.ts`
   - Used LLM to identify equivalent skills
   - Maintained a growing knowledge base of skill relationships

2. **Experience Depth**

   - Scored matches based on multiple factors
   - Considered transferable skills and learning potential
   - Generated detailed explanations for match scores

3. **Potential Fit**
   - Identified transferable skills with potential scores
   - Provided growth recommendations
   - Tracked successful matches to improve future recommendations

## Scaling and Improvement

The system is designed to improve over time through:

1. **Data Collection**

   - Tracks successful matches
   - Records skill usage patterns
   - Maintains relationship strengths

2. **Feedback Integration**

   - Can be extended to collect user feedback
   - Uses feedback to adjust scoring algorithms
   - Updates knowledge graph based on real-world data

3. **Performance Monitoring**
   - Tracks match quality metrics
   - Identifies areas for improvement
   - Provides insights for system enhancement

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GOOGLE_GEMINI API key

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your GOOGLE_GEMINI API key:
   ```
   GOOGLE_GEMINI_KEY=your_api_key_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Application

1. Access the frontend at `http://localhost:5173`
2. The backend API will be available at `http://localhost:3000`
3. Use the interface to view candidates, jobs, and match results

## Future Enhancements

Given more time, we would:

1. Implement user authentication and authorization
2. Add a feedback collection system
3. Enhance the knowledge graph with more sophisticated relationships
4. Implement automated testing
5. Add performance monitoring and analytics
6. Create an admin interface for managing the knowledge graph
