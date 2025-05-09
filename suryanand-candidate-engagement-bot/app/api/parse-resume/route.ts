import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import type { CandidateInfo } from "@/types"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 },
      )
    }

    // Check file type
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".docx") && !file.name.endsWith(".doc")) {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF and DOCX files are supported",
        },
        { status: 400 },
      )
    }

    // Extract text from the file
    const fileText = await extractTextFromFile(file)

    if (!fileText) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to extract text from file",
        },
        { status: 400 },
      )
    }

    // Use Grok to extract structured information
    const candidateInfo = await extractInfoWithGrok(fileText)

    return NextResponse.json({
      success: true,
      candidateInfo,
    })
  } catch (error) {
    console.error("Error parsing resume:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to parse resume",
      },
      { status: 500 },
    )
  }
}

async function extractTextFromFile(file: File): Promise<string | null> {
  try {
    // For a real implementation, you would use libraries like pdf-parse or mammoth
    // to extract text from PDF or DOCX files
    // For this demo, we'll simulate text extraction by reading the file as text

    const arrayBuffer = await file.arrayBuffer()

    // In a real implementation, this would be replaced with proper parsing
    // Here we're just converting the file to text directly which won't work well for binary files
    // but serves as a placeholder for the demo
    const text = new TextDecoder().decode(arrayBuffer)

    return text
  } catch (error) {
    console.error("Error extracting text from file:", error)
    return null
  }
}

async function extractInfoWithGrok(resumeText: string): Promise<CandidateInfo> {
  try {
    const prompt = `
Extract structured information from the following resume text.
Return a valid JSON object with the following fields:
- name: The candidate's full name
- currentRole: Their current job title
- experience: Years of experience (e.g., "5+ years")
- location: Where they are located
- education: Their educational background
- skills: An array of technical skills mentioned
- availability: When they can start (if mentioned)
- salaryExpectations: Salary expectations (if mentioned)

IMPORTANT: Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
Do NOT include \`\`\`json or any other markdown formatting.

Resume text:
${resumeText}
`

    const { text } = await generateText({
      model: xai("grok-2-1212"),
      prompt,
    })

    // Extract JSON from the response, handling potential markdown formatting
    return extractJsonFromText(text)
  } catch (error) {
    console.error("Error extracting info with Grok:", error)
    return {
      skills: [],
      interests: [],
      questions: [],
      strengths: [],
      relevantProjects: [],
      confidence: {},
    }
  }
}

function extractJsonFromText(text: string): CandidateInfo {
  // Initialize with empty values
  const defaultInfo: CandidateInfo = {
    skills: [],
    interests: [],
    questions: [],
    strengths: [],
    relevantProjects: [],
    confidence: {},
  }

  try {
    // First, try to parse the text directly as JSON
    try {
      const parsedInfo = JSON.parse(text.trim())
      return addConfidenceScores(parsedInfo)
    } catch (e) {
      console.log("Direct JSON parsing failed, trying to extract JSON from text")
    }

    // Look for JSON inside markdown code blocks
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/
    const codeBlockMatch = text.match(codeBlockRegex)

    if (codeBlockMatch && codeBlockMatch[1]) {
      try {
        const parsedInfo = JSON.parse(codeBlockMatch[1].trim())
        return addConfidenceScores(parsedInfo)
      } catch (e) {
        console.log("Code block JSON parsing failed:", e)
      }
    }

    // Try to find any JSON-like structure with curly braces
    const jsonRegex = /\{[\s\S]*\}/
    const jsonMatch = text.match(jsonRegex)

    if (jsonMatch) {
      try {
        const parsedInfo = JSON.parse(jsonMatch[0])
        return addConfidenceScores(parsedInfo)
      } catch (e) {
        console.log("JSON regex extraction failed:", e)
      }
    }

    // If all parsing attempts fail, log the response for debugging
    console.log("Failed to extract JSON from response. Raw response:", text)

    return defaultInfo
  } catch (error) {
    console.error("Error in extractJsonFromText:", error)
    return defaultInfo
  }
}

function addConfidenceScores(parsedInfo: Partial<CandidateInfo>): CandidateInfo {
  // Add confidence scores
  const confidence: Record<string, number> = {}

  for (const [key, value] of Object.entries(parsedInfo)) {
    if (value && key !== "confidence") {
      // Assign confidence based on presence of data
      confidence[key] =
        key === "skills" && Array.isArray(value) && value.length > 0
          ? 0.8
          : typeof value === "string" && value.trim() !== ""
            ? 0.7
            : 0
    }
  }

  return {
    name: parsedInfo.name || undefined,
    currentRole: parsedInfo.currentRole || undefined,
    experience: parsedInfo.experience || undefined,
    location: parsedInfo.location || undefined,
    education: parsedInfo.education || undefined,
    skills: parsedInfo.skills || [],
    availability: parsedInfo.availability || undefined,
    salaryExpectations: parsedInfo.salaryExpectations || undefined,
    interests: [],
    questions: [],
    strengths: [],
    relevantProjects: [],
    confidence,
  }
}
