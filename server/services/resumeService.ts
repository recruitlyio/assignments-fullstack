import { extractWithLLM } from './llmService'
import dotenv from 'dotenv'
import { parseLLMResponse } from './parseLLMResponse'

// Call dotenv.config() once, early. If index.ts does it, this might not be needed here
dotenv.config()

export const parseAndValidateResume = async (
  resumeText: string
): Promise<any> => {
  try {
    const llmOutput = await extractWithLLM(resumeText)
    const parsedData = parseLLMResponse(llmOutput)
    return parsedData
  } catch (error:any) {
    console.error(`Error in service (parseAndValidateResume): ${error.message}`);
    throw error
  }
}
