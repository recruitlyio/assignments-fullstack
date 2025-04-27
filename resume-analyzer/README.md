# Intelligent Resume Parser

A modern web application that uses AI to extract structured data from unstructured resumes with high accuracy. Built with Next.js, TypeScript, and Google's Gemini AI.

## Features

- Intelligent extraction of skills, work experience, and education details
- Standardized data formatting and validation
- Clean and modern user interface
- Real-time processing with error handling
- Responsive design for all devices

## Technical Approach

### Parsing Strategy
1. **AI-Powered Extraction**: Uses Gemini AI to intelligently parse resume content
2. **Structured Validation**: Implements Zod schemas to ensure data consistency
3. **Standardized Formatting**: Normalizes dates, degree names, and skill levels
4. **Error Handling**: Gracefully handles edge cases and invalid inputs

### Edge Cases Handled
1. **Date Formats**:
   - Standardizes various date formats (e.g., "Jan 2020", "01/2020", "January 2020")
   - Handles relative dates (e.g., "Present", "Current")
   - Validates date ranges for consistency

2. **Degree Names**:
   - Standardizes common variations (e.g., "BSc" → "Bachelor of Science")
   - Handles international degree formats
   - Validates degree names against known patterns

3. **Skill Levels**:
   - Standardizes proficiency levels (Beginner, Intermediate, Advanced, Expert)
   - Infers levels from context when not explicitly stated
   - Handles various skill level descriptions

4. **Content Validation**:
   - Minimum content length check
   - Keyword-based resume validation
   - Pattern matching for invalid content
   - Structure validation for extracted data

### Technical Decisions and Tradeoffs

1. **AI Model Selection**:
   - Chose Gemini AI for its strong natural language understanding
   - Tradeoff: Requires API key and has usage costs
   - Alternative: Could use local models for privacy but with lower accuracy

2. **Data Encoding**:
   - Using base64 encoding for URL-safe data transfer
   - Tradeoff: Slightly larger URL size
   - Alternative: Could use local storage but less shareable

3. **Validation Strategy**:
   - Using Zod for runtime type checking
   - Tradeoff: Additional bundle size
   - Alternative: Manual validation but less maintainable

4. **UI Framework**:
   - Using Next.js with Tailwind CSS
   - Tradeoff: Larger initial bundle
   - Alternative: Could use lighter framework but less developer experience

## Future Enhancements

Given more time, the following features could be added:
1. **File Upload Support**:
   - PDF and DOCX parsing
   - Image-based resume processing
   - Multiple file format support

2. **Advanced Features**:
   - Resume scoring and ranking
   - Skill matching with job descriptions
   - Custom validation rules for specific industries
   - Batch processing of multiple resumes

3. **Integration Options**:
   - ATS system integration
   - HR system integration
   - Export to various formats (JSON, CSV, PDF)

4. **Enhanced AI Features**:
   - Custom training for specific industries
   - Multi-language support
   - Improved context understanding

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Paste your resume content into the text area
2. Click "Parse Resume"
3. View the extracted information in a structured format
4. The parsed data includes:
   - Skills with proficiency levels
   - Work experience with company details
   - Education history with standardized degree names

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
