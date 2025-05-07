export const parseLLMResponse = (llmTextResponse: string): any => {
  // This function will parse the LLM response and convert it into a structured format
  // For example, if the response is in JSON format, you can use JSON.parse
  try {
    const jsonClean = llmTextResponse
      .replace(/^\s*```json\s*/, '') // Remove leading ```json and whitespace
      .replace(/\s*```\s*$/, '') // Remove trailing ``` and whitespace
      .trim()   
    const parsedResponse = JSON.parse(jsonClean) // Parse the cleaned JSON string
    return parsedResponse
  } catch (error) {
    console.error('Error parsing LLM response:', error)
    throw new Error('Failed to parse LLM response')
  }
}