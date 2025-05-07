import { GoogleGenAI } from '@google/genai'
import { resumeParsingPromptInstructions } from './resumePrompts'

export const extractWithLLM = async (resumeText: string): Promise<any> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: resumeText,
      config: {
        systemInstruction: resumeParsingPromptInstructions,
      },
    })
    const text = response.text
    console.log(text)
    return text
  } catch (error) {
    console.error('Error in LLM extraction:', error)
    throw error
  }
}
