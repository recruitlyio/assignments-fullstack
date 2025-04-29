import { v4 as uuidv4 } from "uuid";
import { openai, GPT_MODEL } from "../config/openai";
import logger from "../utils/logger";
import {
  Message,
  Conversation,
  CandidateProfile,
  JobDescription,
} from "../types";
import jobDescription from "../data/jobDescription.json";

class OpenAIService {
  /**
   * Generate a response message using OpenAI
   */
  async generateResponse(
    conversation: Conversation,
    candidateProfile: CandidateProfile
  ): Promise<Message> {
    try {
      // Get system prompt for conversation
      const systemPrompt = this.createSystemPrompt();

      // Format conversation messages for OpenAI
      const messages = this.formatConversationForOpenAI(
        conversation,
        systemPrompt
      );

      // Make API call to OpenAI
      const completion = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      });

      // Extract response content
      const responseContent =
        completion.choices[0]?.message?.content ||
        "I'm sorry, I couldn't generate a response.";

      // Create and return the assistant message
      return {
        id: uuidv4(),
        role: "assistant",
        content: responseContent,
        timestamp: Date.now(),
      };
    } catch (error) {
      logger.error("Error generating OpenAI response:", error);
      throw new Error("Failed to generate response from OpenAI");
    }
  }

  /**
   * Extract candidate profile information from the conversation
   */
  async extractProfileInformation(
    conversation: Conversation,
    currentProfile: CandidateProfile
  ): Promise<CandidateProfile> {
    try {
      // Create a specialized system prompt for profile extraction
      const extractionPrompt =
        this.createProfileExtractionPrompt(currentProfile);

      // Format conversation messages for OpenAI
      const messages = this.formatConversationForOpenAI(
        conversation,
        extractionPrompt
      );

      // Make API call to OpenAI
      const completion = await openai.chat.completions.create({
        model: GPT_MODEL,
        messages: messages,
        temperature: 0,
        max_tokens: 4096,
      });

      // Extract response content
      const responseContent = completion.choices[0]?.message?.content || "{}";

      // Parse the JSON response
      const profileJson = this.extractJsonFromString(responseContent);

      if (!profileJson) {
        logger.error(
          "Failed to extract JSON from OpenAI response:",
          responseContent
        );
        return currentProfile;
      }

      // Update the candidate profile with new information
      const updatedProfile: CandidateProfile = {
        ...currentProfile,
        ...profileJson,
        lastUpdated: Date.now(),
      };

      // Calculate a confidence score based on how much information we have
      updatedProfile.confidenceScore =
        this.calculateProfileConfidence(updatedProfile);

      return updatedProfile;
    } catch (error) {
      logger.error("Error extracting profile information:", error);
      return currentProfile;
    }
  }

  /**
   * Format conversation messages for OpenAI
   */
  private formatConversationForOpenAI(
    conversation: Conversation,
    systemPrompt: string
  ): Array<any> {
    // Start with the system message
    const messages = [{ role: "system", content: systemPrompt }];

    // Add conversation messages
    conversation.messages
      .filter((message) => message.role !== "system") // Remove system messages
      .forEach((message) => {
        messages.push({
          role: message.role,
          content: message.content,
        });
      });

    return messages;
  }

  /**
   * Create system prompt for conversation
   */
  private createSystemPrompt(): string {
    const jd = jobDescription as JobDescription;

    return `You are a friendly and helpful AI assistant for a job recruitment platform.
    Your role is to provide information about job positions and collect relevant information about candidates.
    Be conversational, informative, and engaging.
    
    Here is the job description:
    
    Title: ${jd.title}
    Company: ${jd.company}
    Location: ${jd.location}
    Remote: ${jd.remote ? "Yes" : "No"}
    
    Description:
    ${jd.description}
    
    Responsibilities:
    ${jd.responsibilities.map((r) => `- ${r}`).join("\n")}
    
    Requirements:
    ${jd.requirements
      .map(
        (r) =>
          `- ${r.description} ${r.isRequired ? "(Required)" : "(Preferred)"}`
      )
      .join("\n")}
    
    Benefits:
    ${
      jd.benefits
        ? jd.benefits.map((b) => `- ${b}`).join("\n")
        : "Not specified"
    }
    
    Salary:
    ${
      jd.salary
        ? `${jd.salary.min} - ${jd.salary.max} ${jd.salary.currency}`
        : "Not specified"
    }
    
    Guidelines:
    1. Be conversational and friendly, but professional.
    2. Answer questions about the job accurately based on the job description.
    3. If asked about something not in the job description, acknowledge that you don't have that specific information.
    4. Naturally collect information about the candidate's skills, experience, and qualifications without directly asking for a resume or formal application.
    5. Don't ask too many questions at once. Keep the conversation flowing naturally.
    6. Don't explicitly mention that you are extracting profile information.
    7. Customize your answers to the candidate's experience level and interests when possible.`;
  }

  /**
   * Create a specialized prompt for profile extraction
   */
  private createProfileExtractionPrompt(
    currentProfile: CandidateProfile
  ): string {
    const jd = jobDescription as JobDescription;

    return `You are an AI specialized in extracting structured candidate profile information from conversations.
    
    Your task is to analyze the conversation and extract relevant information about the candidate's background, skills, and qualifications.
    Focus on information that is relevant for the ${jd.title} position.
    
    Return ONLY a JSON object with the following structure, without any additional text:
    
    {
      "name": "Candidate's name if mentioned",
      "email": "Candidate's email if mentioned",
      "phone": "Candidate's phone if mentioned",
      "location": "Candidate's location if mentioned",
      "summary": "A brief professional summary of the candidate based on the conversation",
      "skills": [
        {
          "name": "Skill name",
          "level": "Expertise level if mentioned (beginner/intermediate/expert)",
          "yearsOfExperience": years of experience with this skill if mentioned
        }
      ],
      "experience": [
        {
          "company": "Company name",
          "title": "Job title",
          "startDate": "Start date in any format mentioned",
          "endDate": "End date or 'Present'",
          "description": "Brief description of responsibilities",
          "isCurrentRole": boolean indicating if this is their current role
        }
      ],
      "education": [
        {
          "institution": "School/University name",
          "degree": "Degree type (e.g., Bachelor's, Master's)",
          "field": "Field of study",
          "graduationYear": "Year of graduation"
        }
      ],
      "availableFrom": "When the candidate is available to start",
      "salaryExpectation": "Candidate's salary expectations if mentioned"
    }
    
    Important guidelines:
    1. Only include fields where you have information from the conversation.
    2. For any field you're unsure about, omit it completely rather than guessing.
    3. Don't make up information that wasn't mentioned.
    4. Preserve existing information already in the profile.
    5. Return valid JSON with no additional text, explanations, or formatting.
    6. Focus on skills relevant to the ${jd.title} role.`;
  }

  /**
   * Extract JSON from a string response
   */
  private extractJsonFromString(text: string): any | null {
    try {
      // Try to parse directly first
      try {
        return JSON.parse(text);
      } catch (e) {
        // If direct parsing fails, look for JSON within the string
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return null;
      }
    } catch (error) {
      logger.error("Error parsing JSON from OpenAI response:", error);
      return null;
    }
  }

  /**
   * Calculate a confidence score for the profile
   */
  private calculateProfileConfidence(profile: CandidateProfile): number {
    let score = 0;
    let totalFields = 0;

    // Basic information
    const basicFields = [
      "name",
      "email",
      "phone",
      "location",
      "summary",
      "availableFrom",
      "salaryExpectation",
    ];
    basicFields.forEach((field) => {
      totalFields++;
      if (profile[field as keyof CandidateProfile]) score++;
    });

    // Skills
    totalFields += 5; // We expect at least 5 skills for a complete profile
    score += Math.min(profile.skills.length, 5);

    // Experience
    totalFields += 3; // We expect at least 3 experience entries for a complete profile
    score += Math.min(profile.experience.length, 3);

    // Education
    totalFields += 1; // We expect at least 1 education entry for a complete profile
    score += Math.min(profile.education.length, 1);

    // Calculate percentage
    return Math.round((score / totalFields) * 100);
  }
}

export default new OpenAIService();
