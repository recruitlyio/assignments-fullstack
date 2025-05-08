import { ResumeData } from '../types/resume'
import { extractWithLLM, generateSummary } from './llmService'
import { parseLLMResponse } from './parseLLMResponse'

export const parseAndValidateResume = async (
  resumeText: string
): Promise<ResumeData> => {
  try {
    const llmOutput = await extractWithLLM(resumeText)
    const parsedData = parseLLMResponse(llmOutput)
    if (!parsedData.summary) {
      // If summary is not present in the parsed data, generate it
      const { experience, education } = parsedData
      parsedData.summary = await generateSummary(education, experience)
    }
    return parsedData
  } catch (error: any) {
    console.error(`Error in service (parseAndValidateResume): ${error.message}`)
    throw error
  }
}
