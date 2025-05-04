import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });
const DATA_PATH = path.join(process.cwd(), 'data', 'resume.json');
function extractJsonFromResponse1(text: string | undefined): any[] | null {
    if (!text) {
    //   console.error("Input text is undefined or empty");
      return null;
    }
  
    // Clean the text from unwanted markdown/code block characters
    const cleaned = text.replace(/```json|```/g, '').trim();
    console.log("Cleaned Text:", cleaned); // Log to check if the text is cleaned properly
  
    // Match the JSON structure (either object or array)
    const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/); // Match both objects and arrays
  
    if (!match || !match[0]) {
      console.error("No valid JSON match found in the text");
      return null;
    }
  
    const jsonString = match[0].trim();
    console.log("JSON String Found:", jsonString); // Log the matched JSON string
  
    try {
      const parsed = JSON.parse(jsonString);
  
      // If the parsed result is an object, wrap it in an array
      if (typeof parsed === 'object') {
        return Array.isArray(parsed) ? parsed : [parsed]; // Return as an array
      }
  
      // If it's neither an object nor an array, return null
      console.error("Parsed result is neither an object nor an array");
      return null;
  
    } catch (e) {
      console.error("JSON parsing failed:", e, "Input string:", jsonString);
      return null;
    }
  }


export async function POST() {
  try {
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    const { text } = JSON.parse(fileContent);

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const prompt1 = `Can you extract Name, Email, Phone Number, LinkdIN profile from ${text} in a list of objects format?`;

    const prompt2 = `Can you extract Education details from ${text} in a json format?Keep 
                                            the Keys as Institution/University, Degree, Major/Honors,Start Data, End date, 
                                                    and Extra info if there is anything in extra. The scheme should be like this
                                                    "Institution/University": "string",
                                                    "Degree": "string",
                                                    "Major/Honors": "string",
                                                    "Start Date": "string",
                                                    "End Date": "string", 
                                                    "Extra info": "string"
                                                    "Location: "string". Just give the data as list of objects.`;

    const prompt3 = `Can you extract all the projects from ${text} in a json format? Keep keys as Name and Description, 
                                            and if there is any extra information, add it to the description at the begining. 
                                            Just give the data as list of objects. The schema should be like this:
                                            "Name": "string",
                                            "Description": "array"`;

    const prompt4 = `Can you extract all the experience from ${text} in a json format? Just give the data as list of objects. 
                                            The schema should be like this:
                                            "title": "string",
                                            "company": "string",
                                            "location": "string",
                                            "dates": "string",
                                            "description": "array"`;

    const prompt5 = `Can you extract all the skills from ${text} into a json format? Don't group the skills 
                                    and please use skills mentioned in the skill section only.`;


    const response1 = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ parts: [{ text: prompt1 }] }],
    });

    const response2 = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ parts: [{ text: prompt2 }] }],
      });

    const response3 = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ parts: [{ text: prompt3 }] }],
      });

    const response4 = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ parts: [{ text: prompt4 }] }],
      });

      const response5 = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ parts: [{ text: prompt5 }] }],
      });

    console.log(response1?.text)
    console.log(response2?.text)
    console.log(response3?.text)
    console.log(response4?.text)
    console.log(response5?.text)


    const final_json1 = extractJsonFromResponse1(response1?.text)
    const final_json2 = extractJsonFromResponse1(response2?.text)
    const final_json3 = extractJsonFromResponse1(response3?.text)
    const final_json4 = extractJsonFromResponse1(response4?.text)
    const final_json5 = extractJsonFromResponse1(response5?.text)



    return NextResponse.json({ analysis: [final_json1,final_json2,final_json3,final_json4,final_json5]}, { status: 200 });

    
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
