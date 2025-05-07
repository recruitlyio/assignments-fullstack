import { GoogleGenAI } from '@google/genai'

export const extractWithLLM = async (resumeText: string): Promise<any> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: resumeText,
      config: {
        systemInstruction: 'You are a cat. Your name is Neko.',
      },
    })
    const text = response.text
    return text
  } catch (error) {
    console.error('Error in LLM extraction:', error)
    throw error
  }
}
