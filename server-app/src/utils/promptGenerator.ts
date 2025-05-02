/**
 * Generates a dynamic prompt for the LLM based on preprocessing findings.
 * This helps guide the LLM's extraction process.
 * @param resumeText The original raw resume text.
 * @param findings Preprocessing findings from preprocessResumeText.
 * @returns A dynamically generated prompt string.
 */
export const generateDynamicPrompt = (resumeText: string): string => {
  let prompt = `Your task is to act as a data extraction agent for a resume.
    - Resumes may be in paragraph form without clear formatting.
    - Do NOT rely on formatting or headings. Read every sentence carefully and identify entities by context.
    - Ignore vague or subjective phrases like “passionate about…”, “proven track record”, “excellent communication skills”, etc. 
    - Extract all roles, even if described in narrative form.
    - Do not repeat or inflate generic adjectives ("visionary", "innovative") — only output measurable responsibilities and impact.
    - Convert vague titles to standard equivalents
    - Standardize degree names and eliminate redundant terms like "with honors", "summa cum laude", etc.
    
    Extract the following information from the resume text below and return it in a valid JSON format:
   
  1. Skills: Include all technical and soft skills mentioned in the resume.
     - For each skill, extract:
       - name: The skill name
       - proficiency: Any mentioned proficiency level (if specified, otherwise null)

  2. Work Experience: Extract all work history entries.
     - For each position, extract:
       - title: Job title
       - company: Company name
       - location: Work location (if specified, otherwise null)
       - dateRangeText: Employment period (if specified, otherwise null)
       - responsibilities: List of job responsibilities (if specified, otherwise null)

  3. Education: Extract all education entries.
     - For each entry, extract:
       - degree: The degree or certification name
       - institution: School/university name
       - location: Institution location (if specified, otherwise null)
       - yearText: Year(s) of study/graduation (if specified, otherwise null)
       - fieldOfStudy: Major or specialization (if specified, otherwise null)

  The output must strictly follow this JSON schema:
  {
    "skills": [
      {
        "name": "string",            // Actual skill or tool (e.g., "Python", "Customer Journey Mapping")
        "proficiency": "string | null" // Level if mentioned (e.g., "Expert", "Intermediate"), otherwise null
      }
    ],
    "workExperience": [
      {
        "title": "string",           // Job title
        "company": "string",         // Company name
        "location": "string | null", // City or country if mentioned
        "dateRangeText": "string | null", // Employment period (e.g., "Jan 2020 – Dec 2022")
        "responsibilities": [        // List of specific tasks or achievements, no vague items
          "string"
        ] | null
      }
    ],
    "education": [
      {
        "degree": "string",              // Degree or certification (e.g., "BSc in Computer Science")
        "institution": "string",         // University or school
        "location": "string | null",     // City or country if mentioned
        "yearText": "string | null",     // Year or duration (e.g., "2015–2019")
        "fieldOfStudy": "string | null"  // Major (e.g., "Computer Science")
      }
    ]
  }

  Resume text:
  [${resumeText}]
  `;

  return prompt;
};
