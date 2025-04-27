import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const ParsedResumeSchema = z.object({
  skills: z.array(z.object({
    name: z.string(),
    proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  })),
  workExperience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    graduationYear: z.string(),
  })),
});

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    // Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are an expert resume parsing and enrichment agent. Your task is to deeply understand resumes and extract structured information with attention to missing details, inconsistencies, or formatting issues.

Extract the following information accurately:
1. Skills and Technologies: List all skills and technologies mentioned, and intelligently infer the proficiency level if not explicitly stated (use "Beginner", "Intermediate", "Advanced", "Expert").
2. Work Experience: For each role, extract the company name, job title, duration (start and end dates or years), and a concise description of responsibilities and achievements.
3. Education: Extract educational qualifications, including institution names, degrees, fields of study, and graduation years. Correct common typos if any.

Enrichment Instructions:
- If a proficiency level is missing, infer it based on the context of experience (e.g., 5+ years experience suggests "Expert").
- Standardize inconsistent naming (e.g., "Bsc" → "Bachelor of Science", "Comp Sci" → "Computer Science").
- If duration is mentioned vaguely (e.g., "Summer Internship 2021"), reformat it into standard readable duration ("June 2021 - August 2021").
- Ensure company names are clean and free from typos.

Output Format (strict JSON, no additional text):
{
  "skills": [
    {
      "name": string,
      "proficiency": "Beginner" | "Intermediate" | "Advanced" | "Expert"
    }
  ],
  "workExperience": [
    {
      "company": string,
      "role": string,
      "duration": string,
      "description": string
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "field": string,
      "graduationYear": string
    }
  ]
}

If any information is missing or unclear, do your best to infer based on context, or mark it as "Unknown".

Resume Content:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
   
    const cleanedText = text
      .replace(/```json\n?/g, '') 
      .replace(/```\n?/g, '')     
      .trim();                   
    
    console.log('Cleaned response:', cleanedText);
    
    const parsedData = JSON.parse(cleanedText);
    
    const validatedData = ParsedResumeSchema.parse(parsedData);
    console.log("Validate Data", validatedData)
    return NextResponse.json(validatedData);
  } catch (error) {
    console.error('Error processing resume:', error);
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
} 