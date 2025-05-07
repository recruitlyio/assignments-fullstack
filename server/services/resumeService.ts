import { extractWithLLM } from './llmService'
import { parseLLMResponse } from './parseLLMResponse'

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
