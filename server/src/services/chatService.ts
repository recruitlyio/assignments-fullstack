import axios from "axios";
import { jobDescription } from "../data/jobDescription";

// Types
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  message: string;
  candidateInfo?: {
    skills?: string[];
    experience?: string;
    education?: string;
    otherQualifications?: string;
  };
}

// System prompt to guide the AI's behavior
const systemPrompt = `
You are a friendly AI assistant representing CandiBot's recruiting team. Your job is to engage with candidates, answer their questions about our open positions, and gather information about their qualifications.

The company has multiple positions available, including roles in development, design, management, and more. When asked about specific positions, provide general information about the requirements and responsibilities for that type of role.

Guidelines:
1. Be conversational, warm, and professional - like a helpful recruiter.
2. Answer questions based on common job requirements for requested positions.
3. Don't use asterisks, bullet points, or markdown formatting in your responses.
4. Write naturally as if you're having a conversation.
5. Make candidates feel comfortable sharing their experience.
6. Extract information about candidates whenever they share relevant details.
7. When greeting candidates, always introduce yourself as part of CandiBot (not TechSolutions).

When you detect ANY information about their skills, experience, education, or qualifications, use the extractCandidateInfo function to record it.
`;

// Maximum retries for API calls
const MAX_RETRIES = 3;
const RETRY_DELAY = 1500; // 1.5 seconds

// Add a separate function to manually extract candidate info as fallback
function extractCandidateInfoManually(messages: Message[]): any {
  try {
    // Get last few messages to analyze
    const recentMessages = messages.slice(-5);
    let candidateText = "";

    // Combine user messages into a single text for analysis
    recentMessages.forEach((msg) => {
      if (msg.role === "user") {
        candidateText += msg.content + " ";
      }
    });

    // Simple extraction patterns
    const candidateInfo: any = {};

    // Extract skills
    const skillPatterns = [
      /experience (?:with|in) ([\w\s,\.]+)/i,
      /know(?:ledge)? of ([\w\s,\.]+)/i,
      /skills? (?:in|with) ([\w\s,\.]+)/i,
      /familiar with ([\w\s,\.]+)/i,
      /proficient (?:in|with) ([\w\s,\.]+)/i,
      /worked with ([\w\s,\.]+)/i,
    ];

    const skills = new Set<string>();

    // Check for common programming languages and frameworks
    const techKeywords = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "C++",
      "Ruby",
      "PHP",
      "React",
      "Angular",
      "Vue",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "MongoDB",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "GraphQL",
      "REST",
      "API",
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Git",
      "HTML",
      "CSS",
    ];

    techKeywords.forEach((keyword) => {
      if (candidateText.toLowerCase().includes(keyword.toLowerCase())) {
        skills.add(keyword);
      }
    });

    skillPatterns.forEach((pattern) => {
      const match = candidateText.match(pattern);
      if (match && match[1]) {
        const extractedSkills = match[1].split(/,|and/).map((s) => s.trim());
        extractedSkills.forEach((skill) => {
          if (skill.length > 2) skills.add(skill);
        });
      }
    });

    if (skills.size > 0) {
      candidateInfo.skills = Array.from(skills);
    }

    // Extract years of experience
    const experienceTextPatterns = [
      /(?:i have|i've) worked (?:as|with|on|in) ([\w\s,\.]+)/i,
      /(?:i have|i've) been (?:a|an) ([\w\s,\.]+)/i,
      /(?:worked|been) (?:at|with) ([\w\s,\.]+)/i,
      /(?:my experience|my background) (?:is|includes) ([\w\s,\.]+)/i,
      /(?:i am|i'm) (?:a|an) ([\w\s,\.]+)/i, // This might catch job titles
    ];

    for (const pattern of experienceTextPatterns) {
      const match = candidateText.match(pattern);
      if (match && match[1] && match[1].length > 3) {
        // Only keep if the matched text is meaningful
        candidateInfo.experience = candidateInfo.experience
          ? `${candidateInfo.experience}. ${match[1]}`
          : match[1];
      }
    }

    // Extract education
    const educationKeywords = [
      "bachelor",
      "master",
      "degree",
      "phd",
      "diploma",
      "certificate",
      "university",
      "college",
      "school",
      "graduated",
      "certification",
      "computer science",
      "engineering",
      "information technology",
    ];

    educationKeywords.forEach((keyword) => {
      if (candidateText.toLowerCase().includes(keyword.toLowerCase())) {
        // Find the sentence containing the keyword
        const sentences = candidateText.split(/[.!?]+/);
        for (const sentence of sentences) {
          if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
            candidateInfo.education = candidateInfo.education
              ? `${candidateInfo.education}. ${sentence.trim()}`
              : sentence.trim();
            break;
          }
        }
      }
    });

    // Extract candidate name
    const namePatterns = [
      /i am (\w+(?:\s+\w+)*)/i,
      /my name is (\w+(?:\s+\w+)*)/i,
      /this is (\w+(?:\s+\w+)*)/i,
    ];

    for (const pattern of namePatterns) {
      const match = candidateText.match(pattern);
      if (match && match[1]) {
        // Store the name in otherQualifications for now
        candidateInfo.otherQualifications = `Name: ${match[1]}`;
        break;
      }
    }

    return Object.keys(candidateInfo).length > 0 ? candidateInfo : null;
  } catch (error) {
    console.error("Error in manual candidate info extraction:", error);
    return null;
  }
}

// Function to process user messages
export async function processMessage(
  userMessage: string,
  conversationHistory: Message[]
): Promise<ChatResponse> {
  // Trim conversation history to prevent token overload
  const limitedHistory = conversationHistory.slice(-10);

  let retries = 0;
  let lastError = null;

  // Retry logic for API calls
  while (retries <= MAX_RETRIES) {
    try {
      // Prepare messages for the API call
      const messages = [
        { role: "system", content: systemPrompt },
        ...limitedHistory,
        { role: "user", content: userMessage },
      ];

      console.log(
        `Attempt ${retries + 1}/${
          MAX_RETRIES + 1
        }: Sending request to Groq API...`
      );
      console.log(`Total messages in context: ${messages.length}`);

      // Call the Groq API
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192", // Try a smaller model if the larger one is causing issues
          messages,
          temperature: 0.7,
          max_tokens: 800,
          tools: [
            {
              type: "function",
              function: {
                name: "extractCandidateInfo",
                description:
                  "Extract candidate information from the conversation",
                parameters: {
                  type: "object",
                  properties: {
                    skills: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "Technical or soft skills mentioned by the candidate",
                    },
                    experience: {
                      type: "string",
                      description:
                        "Years of experience and relevant work history",
                    },
                    education: {
                      type: "string",
                      description:
                        "Educational background including degrees and institutions",
                    },
                    otherQualifications: {
                      type: "string",
                      description:
                        "Other relevant qualifications, certifications, or achievements",
                    },
                  },
                  required: [],
                },
              },
            },
          ],
          tool_choice: "auto",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          timeout: 30000, // 30 second timeout
        }
      );

      // Verify we have a valid response
      if (!response.data?.choices?.length) {
        throw new Error("Empty or invalid response from Groq API");
      }

      const responseMessage = response.data.choices[0].message;

      // Make sure we have actual content
      if (!responseMessage.content || responseMessage.content.trim() === "") {
        throw new Error("Groq API returned empty content");
      }

      console.log("✅ Successfully received response from Groq API");

      // Process candidate info if available
      let candidateInfo: any = undefined;

      // First try to get info from tool calls
      if (responseMessage.tool_calls?.length > 0) {
        const toolCall = responseMessage.tool_calls.find(
          (tool: any) => tool.function?.name === "extractCandidateInfo"
        );

        if (toolCall?.function?.arguments) {
          try {
            candidateInfo = JSON.parse(toolCall.function.arguments);
            console.log(
              "📊 Extracted candidate info from tool call:",
              JSON.stringify(candidateInfo).substring(0, 100) + "..."
            );
          } catch (parseError) {
            console.error("Error parsing tool call arguments:", parseError);
          }
        }
      }

      // If no info from tool calls, try manual extraction
      if (!candidateInfo || Object.keys(candidateInfo).length === 0) {
        const allMessages: Message[] = [
          ...conversationHistory,
          { role: "user" as const, content: userMessage },
        ];
        const manualExtraction = extractCandidateInfoManually(allMessages);

        if (manualExtraction) {
          console.log(
            "📊 Extracted candidate info manually:",
            JSON.stringify(manualExtraction)
          );
          candidateInfo = manualExtraction;
        }
      }

      // Add this before returning the response
      console.log("FINAL RETURN VALUE:", {
        message: responseMessage.content,
        candidateInfo,
      });

      // Return the successful response
      return {
        message: responseMessage.content,
        candidateInfo,
      };
    } catch (error: any) {
      lastError = error;
      console.error(
        `⚠️ API Error (attempt ${retries + 1}/${MAX_RETRIES + 1}):`,
        error.message
      );

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error(
          "Response data:",
          JSON.stringify(error.response.data).substring(0, 200)
        );
      }

      // If we've reached max retries, return a fallback message
      if (retries === MAX_RETRIES) {
        console.error("❌ All retries failed, returning fallback response");
        break;
      }

      // Wait before retrying with exponential backoff
      const delay = RETRY_DELAY * Math.pow(2, retries);
      console.log(`Waiting ${delay}ms before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
    }
  }

  // If we get here, all retries failed
  // Provide a helpful error message based on the last error
  let errorMessage =
    "I apologize, but I'm having trouble processing your request right now.";

  if (lastError?.response?.status === 401) {
    errorMessage =
      "I'm experiencing authentication issues. Please contact support with error code: AUTH-401.";
  } else if (lastError?.response?.status === 429) {
    errorMessage =
      "I've received too many requests. Please try again in a moment.";
  } else if (lastError?.code === "ECONNABORTED") {
    errorMessage =
      "The request timed out. Please try a simpler question or try again later.";
  }

  return {
    message: errorMessage,
    candidateInfo: undefined,
  };
}
