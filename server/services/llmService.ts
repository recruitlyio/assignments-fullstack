import { GoogleGenAI } from '@google/genai'
import {
  resumeParsingPromptInstructions,
  summaryGenerationPromptInstructions,
} from './resumePrompts'
import { EducationEntry } from '../types/education'
import { ExperienceEntry } from '../types/experience'

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
    return text
  } catch (error) {
    console.error('Error in LLM extraction:', error)
    throw error
  }
}





export const generateSummary = async (
  educationData: EducationEntry[], 
  experienceData: ExperienceEntry[] 
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    // Format the structured data into readable text for the LLM
    let formattedEducation = ''
    if (
      educationData &&
      Array.isArray(educationData) &&
      educationData.length > 0
    ) {
      formattedEducation = 'Education:\n'
      formattedEducation += educationData
        .map((edu: EducationEntry) => {
          const degree = edu.degree || ''
          const major = edu.major || ''
          const institution = edu.institution || ''
          const location = edu.location || ''
          const startDate = edu.start_date || ''
          const endDate = edu.end_date || ''

          let line = `- ${degree} ${major ? 'in ' + major : ''}`.trim()
          if (line === '-') line = '' // Avoid lines with just '-'
          if (institution) line += `${line ? ', ' : ''}${institution}`
          if (location) line += `${line ? ', ' : ''}${location}`

          const dateRange =
            startDate || endDate
              ? `(${startDate}${startDate && endDate ? ' - ' : ''}${endDate})`
              : ''
          if (dateRange) line += `${line ? ' ' : ''}${dateRange}`

          return line.trim()
        })
        .filter((line) => line.length > 0)
        .join('\n') // Filter out empty lines
    }

    let formattedExperience = ''
    if (
      experienceData &&
      Array.isArray(experienceData) &&
      experienceData.length > 0
    ) {
      formattedExperience = 'Experience:\n'
      formattedExperience += experienceData
        .map((exp: ExperienceEntry) => {
          const title = exp.job_title || ''
          const company = exp.company || ''
          const location = exp.location || ''
          const startDate = exp.start_date || ''
          const endDate = exp.end_date || ''
          const description = exp.description || ''

          let header = `${title}${
            title && company ? ' at ' : ''
          }${company}`.trim()
          if (header) header += `${header && location ? ', ' : ''}${location}`

          const dateRange =
            startDate || endDate
              ? `(${startDate}${
                  startDate && endDate && endDate !== 'Present' ? ' - ' : ''
                }${endDate})`
              : '' // Handle "Present" correctly
          if (dateRange) header += `${header ? ' ' : ''}${dateRange}`

          let detail = header.trim()

          if (description.trim()) {
            detail += '\n' + description.trim()
          }

          return detail.trim()
        })
        .filter((block) => block.length > 0)
        .join('\n\n') // Use double newline between experience blocks
    }

    // Combine sections, adding a double newline between if both exist
    const combinedContentParts = [
      formattedEducation,
      formattedExperience,
    ].filter((part) => part.length > 0)
    const combinedContent = combinedContentParts.join('\n\n')

    if (!combinedContent) {
      console.warn(
        'No valid education or experience data formatted for summary.'
      )
      return '' // Return empty string if no data is available
    }


    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', 
      contents: combinedContent, 
      config: {
        systemInstruction: summaryGenerationPromptInstructions, 
      },
    })

    const summary = response.text

    return summary ? summary.trim() : ''
  } catch (error) {
    console.error('Error in LLM summary generation:', error)
    throw error
  }
}
