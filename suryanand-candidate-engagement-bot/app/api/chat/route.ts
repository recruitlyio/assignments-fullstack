import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"
import { jobDescriptionText } from "@/lib/job-description"
import { extractCandidateInfo } from "@/lib/extract-info"
import type { Message, CandidateInfo } from "@/types"

// System prompt to guide the AI's behavior
const systemPrompt = `
You are an AI assistant for TechInnovate Solutions, helping with the initial screening of job applicants for the Senior Software Engineer position.

Your goals are:
1. Answer questions about the job based on the provided job description
2. Gather information about the candidate's qualifications, experience, and fit for the role
3. Be conversational and friendly, but professional

Here is the job description:
${jobDescriptionText}

Guidelines:
- Be helpful and informative about the job details
- Ask follow-up questions to learn more about the candidate's experience and skills
- Don't ask too many questions at once - keep the conversation natural
- If the candidate asks about something not in the job description, be honest about not having that information
- Don't make up information about the company or role
- Focus on technical skills, experience, and qualifications relevant to the position
- Be respectful of the candidate's time and privacy

Remember, you're conducting an initial screening, not a full interview. Your goal is to provide information and gather basic qualifications.
`

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Check if there's an initial system message with candidate info
  let initialCandidateInfo: CandidateInfo | null = null

  if (
    messages.length > 0 &&
    messages[0].role === "system" &&
    messages[0].content.includes("Initial candidate information")
  ) {
    try {
      const infoMatch = messages[0].content.match(/Initial candidate information: (.+)/)
      if (infoMatch && infoMatch[1]) {
        initialCandidateInfo = JSON.parse(infoMatch[1])
      }
    } catch (error) {
      console.error("Error parsing initial candidate info:", error)
    }
  }

  // Extract candidate information from previous messages
  const extractedInfo = extractCandidateInfo(messages.filter((m: Message) => m.role !== "system"))

  // Merge initial info with extracted info
  const candidateInfo = initialCandidateInfo
    ? {
        ...initialCandidateInfo,
        ...extractedInfo,
        confidence: {
          ...initialCandidateInfo.confidence,
          ...extractedInfo.confidence,
        },
      }
    : extractedInfo

  // Add the extracted info to the system message for context
  const contextualizedMessages: Message[] = [
    {
      id: "system-1",
      role: "system",
      content: systemPrompt,
    },
  ]

  // If we have meaningful candidate info, add it to the system context
  if (Object.keys(candidateInfo.confidence).length > 0) {
    contextualizedMessages.push({
      id: "system-2",
      role: "system",
      content: `
Current information about the candidate:
${JSON.stringify(candidateInfo, null, 2)}

Continue gathering information naturally. Focus on areas where confidence is low or information is missing.
      `,
    })
  }

  // Add the conversation history (excluding system messages)
  contextualizedMessages.push(...messages.filter((m: Message) => m.role !== "system"))

  // Stream the response
  const result = streamText({
    model: xai("grok-2-1212"),
    messages: contextualizedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  })

  return result.toDataStreamResponse()
}
