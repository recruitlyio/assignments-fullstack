import { OpenAI } from "openai";
import { ParsedResume } from "../types";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseResume(text: string): Promise<ParsedResume> {
  const systemPrompt = `You are an intelligent resume parser.
    If the following text does not appear to be a valid resume (e.g., it's too short, irrelevant, or unrelated to job applications), return the exact string:
    "INVALID_RESUME" with boolean value true
    Otherwise, extract and return structured data in this JSON format:
    {
        skills: [
        {
          name: string;
          proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
        }
      ];
      workExperience: [
        {
          company: string;
          role: string;
          startDate: string;  // e.g., "2020-01"
          endDate: string;    // e.g., "2023-03" or "Present"
          description?: string;
        }
      ];
      education: [
        {
          institution: string;
          degree: string;
          fieldOfStudy?: string;
          startYear: string;  // e.g., "2014"
          endYear: string;    // e.g., "2018"
        }
      ];
    }`;

  const userPrompt = `Resume Text:\n\n${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0,
    response_format: { "type": "json_object" }
  });

  const parsed = JSON.parse(response.choices[0].message.content || "{}");
  return parsed;
}
