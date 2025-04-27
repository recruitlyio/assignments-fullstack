# Tech Interview Ace

This application helps technical recruiters generate relevant, practical interview questions tailored to specific job requirements and candidate experience levels. It leverages AI (specifically Google's Gemini model via Genkit) to analyze job descriptions, extract key skills, and formulate insightful questions with clear evaluation criteria.

## Problem Solving Approach

The approach to question generation is broken down into distinct steps:

1.  **Skill Extraction:** An AI prompt (`skillExtractionPrompt`) analyzes the job requirements to identify the core technical skills, programming languages, frameworks, and methodologies mentioned. It focuses on extracting distinct, actionable technical competencies and avoids soft skills.
2.  **Question Generation:** For each extracted skill (up to a limit, currently 7, to manage response time and relevance), another AI prompt (`questionGenerationPrompt`) is invoked. This prompt uses the specific skill, the candidate's experience level, and the full job requirements as context.
3.  **Difficulty Calibration:** The `experienceLevel` is given as input to tailor the complexity of the question and the expected depth of the answer accordingly.

This multi-step approach, using separate prompts for skill extraction and question generation, aims to produce more targeted and higher-quality questions than a single, monolithic prompt might achieve. It focuses the AI on specific sub-tasks, improving relevance and adherence to the desired output format.

## AI Integration Strategy

The AI integration leverages Genkit for structuring the AI interaction logic. Key aspects include:

*   **Genkit Flows:** Structure the AI interaction logic, making it modular and testable.
*   **Genkit Prompts:** Define the specific instructions and input/output schemas for the AI, utilizing Handlebars templating. Zod is used for schema definition and validation.

## Difficulty Calibration

Difficulty calibration is primarily handled within the `questionGenerationPrompt`. The prompt is explicitly given the `experienceLevel` (Entry, Mid, Senior) as input and instructed to tailor the complexity of the question and the expected depth of the answer accordingly.

*   **Entry-Level:** Questions focus on foundational concepts, basic syntax, and simple application scenarios. Evaluation criteria look for core understanding and ability to explain fundamental ideas.
*   **Mid-Level:** Questions involve more complex scenarios, integration of concepts, debugging, and understanding common patterns or trade-offs. Evaluation criteria expect more detailed explanations and consideration of alternatives.
*   **Senior-Level:** Questions probe deeper into architectural decisions, system design, performance optimization, advanced features, and handling complex trade-offs or edge cases. Evaluation criteria look for strategic thinking, experience-based insights, and awareness of best practices and potential pitfalls.

The AI model uses the provided experience level as a key parameter when generating the question content, its difficulty rating, and the associated evaluation criteria.

## System Design & Technical Decisions

Key architectural decisions include:

*   **Framework:** Next.js (App Router) was chosen for its robust features, performance optimizations (Server Components, Route Handlers), and seamless integration with React.
*   **UI Components:** ShadCN UI library provides pre-built, accessible, and customizable components, accelerating UI development while maintaining a consistent look and feel. Tailwind CSS is used for styling, offering utility-first CSS for rapid development.
*   **AI Integration:** Genkit is used as the framework for interacting with the AI model (Google Gemini).
*   **State Management:** React's built-in state (`useState`) is sufficient for managing form inputs, loading status, errors, and the generated questions on the client-side. React Hook Form handles form validation and submission logic.
*   **PDF Generation:** `jspdf` library is used on the client-side to generate PDF documents containing the interview questions.

**Tradeoffs:**

*   **LLM Dependency:** The quality of generated questions depends heavily on the underlying AI model's capabilities and its interpretation of the prompts. There's always a risk of irrelevant, inaccurate, or poorly formulated questions (hallucination). Prompt engineering aims to minimize this, but it's an inherent tradeoff.
*   **Consistency:** While prompts guide the AI, there can be variability in question style and difficulty even for the same inputs. The structured approach helps, but perfect consistency is challenging.
*   **Latency:** AI model calls introduce latency. The process is asynchronous, and loading indicators are used to manage user expectations. Extracting fewer skills helps balance quality and speed.
*   **Client-Side PDF Generation:** Generating the PDF on the client-side avoids server load but relies on the user's browser capabilities and can potentially block the UI thread for large documents (though unlikely in this scenario).

## Code Quality

*   The code is well-structured with clear separation of concerns (UI components, AI flows, client-side logic).
*   TypeScript is used throughout the project for enhanced type safety and developer experience.
*   Components are generally well-named and modular.
*   Comments are used where necessary to explain complex logic (e.g., in AI prompts and flows).
*   Consistent formatting is maintained.

## Core Functionality

The application allows users to:

1.  Input job requirements (e.g., job description) via a text area.
2.  Select the target candidate experience level (Entry, Mid, Senior).
3.  Generate tailored technical interview questions based on the provided input by clicking a button.
4.  View the generated questions in a clear, structured format (accordion view), each displaying:
    *   The question itself.
    *   Detailed evaluation criteria.
    *   The associated skill area(s).
    *   The difficulty level (Easy, Medium, Hard) with a visual badge.
5.  Download the generated questions and criteria as a PDF document.
6.  Receive feedback via loading indicators during generation and error messages if issues occur.

## Setup Instructions

1.  **Prerequisites:**
    *   Node.js (LTS version recommended)
    *   npm or yarn

2.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

4.  **Set Up Environment Variables:**
    *   Create a `.env` file in the root of the project.
    *   Obtain an API key for Google AI (Gemini):
        *   Go to [Google AI Studio](https://aistudio.google.com/).
        *   Sign in and create an API key.
    *   Add the API key to your `.env` file:
        ```env
        GOOGLE_GENAI_API_KEY=YOUR_API_KEY_HERE
        ```
    *   **Important:** Do **not** commit your `.env` file to version control. Add `.env` to your `.gitignore` file if it's not already there.

5.  **Run Genkit Development Server:**
    Genkit needs its own development server running to handle AI flow executions during development. Open a separate terminal window and run:
    ```bash
    npm run genkit:dev
    ```
    Or, for automatic reloading on file changes:
    ```bash
    npm run genkit:watch
    ```
    *Keep this terminal running alongside the Next.js development server.*

6.  **Run Next.js Development Server:**
    In another terminal window, run:
    ```bash
    npm run dev
    ```
    This will start the Next.js application, typically on `http://localhost:9002`.

7.  **Open the Application:**
    Navigate to `http://localhost:9002` (or the specified port) in your web browser. You should now be able to use the Tech Interview Ace application locally.
```