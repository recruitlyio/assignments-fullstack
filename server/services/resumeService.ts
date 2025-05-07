import { extractWithLLM } from './llmService'
import dotenv from 'dotenv'

// Call dotenv.config() once, early. If index.ts does it, this might not be needed here
// However, services might be tested independently, so it can be good practice.
dotenv.config()

export const parseAndValidateResume = async (
  resumeText: string
): Promise<any> => {
  try {
    const llmOutput = await extractWithLLM(resumeText)
    return llmOutput
  } catch (error:any) {
    console.error(`Error in service (parseAndValidateResume): ${error.message}`);
    throw error
  }
}
