# CVX - Intelligent Resume Parser

The **CVX - Intelligent Resume Parser** is a powerful tool designed to parse and validate resumes using a single AI prompt powered by Gemini AI Flow. This project extracts structured data such as personal information, skills, work experience, and education from raw resume text.

## Features

- **Single Prompt Parsing**: Uses a single AI prompt to handle both parsing and validation of resume data.
- **Structured Data Extraction**: Extracts personal information, skills, work experience, and education details.
- **Error Handling**: Provides detailed error messages for invalid or incomplete resumes.
- **Validation**: Ensures the extracted data adheres to predefined schemas.

## Dependencies

This project is built using a next js stack and includes the following key dependencies:

- **[Genkit](https://www.npmjs.com/package/genkit)**: Core AI toolkit used for schema validation and prompt orchestration, with support for Google AI via `@genkit-ai/googleai`.
- **[Lucide React](https://www.npmjs.com/package/lucide-react)**: A collection of open-source, beautifully designed icons for React applications.
- **[Next.js](https://nextjs.org/)**: React framework used for server-side rendering and optimized web performance.
- **[React 19](https://react.dev/)** and **React DOM**: The core libraries for building and rendering user interfaces.
- **[Radix UI](https://www.radix-ui.com/)**: Provides unstyled, accessible UI components such as `react-accordion` and `react-slot`.
- **[Tailwind CSS](https://tailwindcss.com/)** and **tailwind-merge**: Utility-first CSS framework and helper for merging class names efficiently.
- **[class-variance-authority](https://www.npmjs.com/package/class-variance-authority)** and **clsx**: Utilities to manage conditional class names and style variants.

## Installation & Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

## How It Works

1. **Input:** User pastes raw resume text into the input field.
2. **AI Prompt:** A single AI prompt, defined using Gemini AI Flow, processes the input text to extract structured data.
3. **Validation:** Extracted data is validated against predefined schemas by gemini to ensure accuracy and consistency.
4. **Output:** Parsed data is displayed in a user-friendly format.

## Demo

[Watch Demo Video](demo/video.mp4)

## Author

- [Hritik R](https://github.com/HritikR)
