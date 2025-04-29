import axios from 'axios';
import {CandidateProfile} from "../types";

export async function extractCandidateProfileFromLLM(userMessage: string, url: string): Promise<Partial<CandidateProfile>> {
  const systemPrompt = `
Extract the following candidate information from the message below.

Return ONLY valid JSON with the following keys:
- name (string, if mentioned)
- email (string, if mentioned)
- yearsOfExperience (number, if mentioned)
- skills (array of strings, if mentioned)
- education (string, if mentioned)

If a field is not mentioned, exclude it from the response.

Message:
"${userMessage}"
`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{text: systemPrompt}],
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return {};

    const match = raw.match(/\{[\s\S]*}/);
    if (match) {
      return JSON.parse(match[0]);
    }

    return {};
  } catch (err) {
    console.error("LLM profile extraction error:", err);
    return {};
  }
}