import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';


const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_PATH = path.join(process.cwd(), 'data', 'resume.json');



export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { text } = body;
  
      if (!text || text.trim() === '') {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
      }
  
      console.log('Received text:', text);
      // Create and Save to JSON file
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(DATA_PATH, JSON.stringify({ text }, null, 2));
  
      return new Response(JSON.stringify({ message: 'Resume Text uploaded successfully' }));
    } catch (error) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
  }