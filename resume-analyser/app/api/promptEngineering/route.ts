import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: 'AIzaSyCAdlBcDqU5JtuPbpIRl54ZZmPVEaMnWYM' });
const DATA_PATH = path.join(process.cwd(), 'data', 'resume.json');

function extractJsonFromResponse(text: string | undefined,response_type:string): any | null {
  if (!text) return null;
  
  if(response_type=='{}'){
    const cleaned = text.replace(/```json|```/g, '').trim();
    const match = cleaned.match(/{[\s\S]*}/);
    return match && match[0] ? JSON.parse(match[0]) : null;
  }
  else if(response_type=='[{}]'){
    const cleaned = text.replace(/``````/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*?\]/)
    return match && match[0] ? JSON.parse(match[0]) : null;
    }
  else{
    const cleaned = text.replace(/```json|```/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    return match && match[0] ? JSON.parse(match[0]): null;
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


    const final_json1 = extractJsonFromResponse(response1?.text,'{[]}')
    const final_json2 = extractJsonFromResponse(response2?.text,'[{}]')
    const final_json3 = extractJsonFromResponse(response3?.text,'[{..,[]}]')
    const final_json4 = extractJsonFromResponse(response4?.text,'[{..,[]}]')
    const final_json5 = extractJsonFromResponse(response5?.text,'[{}]')



    return NextResponse.json({ analysis: [final_json1,final_json2,final_json3,final_json4,final_json5]}, { status: 200 });

    
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
