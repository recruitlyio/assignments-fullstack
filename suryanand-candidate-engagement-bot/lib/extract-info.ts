import type { CandidateInfo, ExtractedInfo, Message } from "@/types"

// Initialize empty candidate info
export const initialCandidateInfo: CandidateInfo = {
  confidence: {},
}

// Extract candidate information from messages
export function extractCandidateInfo(messages: Message[]): CandidateInfo {
  // In a real implementation, we would use the AI to extract this information
  // For this demo, we'll use a simplified approach with regex patterns

  const candidateInfo: CandidateInfo = {
    skills: [],
    interests: [],
    questions: [],
    strengths: [],
    relevantProjects: [],
    confidence: {},
  }

  // Only process user messages
  const userMessages = messages.filter((m) => m.role === "user")

  for (const message of userMessages) {
    // Extract name
    const nameMatch = message.content.match(/my name is ([A-Za-z\s]+)/i)
    if (nameMatch && nameMatch[1]) {
      candidateInfo.name = nameMatch[1].trim()
      candidateInfo.confidence["name"] = 0.9
    }

    // Extract experience
    const expMatch = message.content.match(/(\d+)(?:\+)? years? (?:of)? experience/i)
    if (expMatch && expMatch[1]) {
      candidateInfo.experience = `${expMatch[1]}+ years`
      candidateInfo.confidence["experience"] = 0.8
    }

    // Extract current role
    const roleMatch = message.content.match(/(?:I am|I'm|I work as) (?:an?|the) ([A-Za-z\s]+) (?:at|for|with)/i)
    if (roleMatch && roleMatch[1]) {
      candidateInfo.currentRole = roleMatch[1].trim()
      candidateInfo.confidence["currentRole"] = 0.7
    }

    // Extract skills (simplified)
    const skillKeywords = [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "SQL",
      "NoSQL",
      "MongoDB",
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "DevOps",
      "Python",
      "Java",
      "C#",
      "Go",
    ]

    for (const skill of skillKeywords) {
      if (message.content.toLowerCase().includes(skill.toLowerCase()) && !candidateInfo.skills?.includes(skill)) {
        candidateInfo.skills?.push(skill)
        candidateInfo.confidence["skills"] = candidateInfo.confidence["skills"] || 0
        candidateInfo.confidence["skills"] += 0.1
        candidateInfo.confidence["skills"] = Math.min(candidateInfo.confidence["skills"], 0.9)
      }
    }

    // Extract education
    const eduMatch = message.content.match(/(?:degree|graduated|studied) (?:in|from|at) ([A-Za-z\s]+)/i)
    if (eduMatch && eduMatch[1]) {
      candidateInfo.education = eduMatch[1].trim()
      candidateInfo.confidence["education"] = 0.6
    }

    // Extract location
    const locMatch = message.content.match(
      /(?:I live|I'm based|I am based|I am located|I'm located) (?:in|at) ([A-Za-z\s,]+)/i,
    )
    if (locMatch && locMatch[1]) {
      candidateInfo.location = locMatch[1].trim()
      candidateInfo.confidence["location"] = 0.7
    }
  }

  return candidateInfo
}

// Get a summary of the extracted information
export function getInfoSummary(candidateInfo: CandidateInfo): ExtractedInfo {
  return {
    candidateInfo,
    lastUpdated: new Date().toISOString(),
  }
}

// In a real implementation, we would use the AI to extract information
// Here's a placeholder for that function
export async function extractInfoWithAI(messages: Message[]): Promise<CandidateInfo> {
  // This would call an AI endpoint to extract structured information
  // For now, we'll use our simple extraction logic
  return extractCandidateInfo(messages)
}
