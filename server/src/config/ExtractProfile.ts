import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

import { llm, graphState } from "./langchainConfig";

const profileSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  skills: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  currentTitle: z.string().optional(),
});

// Create a parser for structured output
const profileParser = StructuredOutputParser.fromZodSchema(profileSchema);

// Structured output format string for the parser
const formatInstructions = profileParser.getFormatInstructions();

// New extractor: runs after each user+bot turn to build/update a JSON profile
export const extractProfile = async (state: typeof graphState.State) => {
  if (
    state.messages.filter((m) => m.getType() === "human").map((m) => m.content)
      .length === 0
  ) {
    console.log("No human messages to process");
    return { messages: state.messages, profile: state.profile || {} };
  }

  console.log("Profile current", state.profile);
  // Prompt to instruct the model to extract structured profile data
  const extractionPrompt = {
    role: "system",
    content: `
      You are a profile extraction system analyzing a job candidate conversation.
      
      TASK: Extract ONLY information that the candidate has explicitly confirmed or provided about themselves.
      
      RULES:
      - Only extract data points that are explicitly stated by the candidate
      - If information is ambiguous or uncertain, DO NOT include it
      - Extract information incrementally - add new fields as they become available in the conversation
      - For lists (skills, education), accumulate items as they are mentioned
      - If a field is not mentioned at all, omit it entirely from the JSON
      - Years of experience should be a number (convert text like "five years" to 5)
      - Only update the profile with new information, do not overwrite existing fields with empty values

      Existing profile:
      ${JSON.stringify(state.profile)}
      
      OUTPUT FORMAT:
      ${formatInstructions}
      
      EXAMPLES:
      
      If a candidate says "I've been working as a software engineer for about 5 years now" → include "yearsOfExperience": 5
      If they say "I graduated from MIT in Computer Science" → include "education": ["MIT - Computer Science"]
      
      DO NOT ASSUME.
      
      Return ONLY the JSON object with no additional text, explanations or markdown formatting.
    `,
  };

  // Invoke the model with both the conversation and the extraction instruction
  const extractionResult = await llm.invoke([
    extractionPrompt,
    ...state.messages.filter(
      (m) => m.getType() === "human" || m.getType() === "ai"
    ),
  ]);

  console.log("Extraction Result:", extractionResult.text);

  let profile = {};
  try {
    profile = await profileParser.parse(extractionResult.text);
    console.log("Extracted profile:", profile);
  } catch (err) {
    console.error("Failed to parse profile JSON:", extractionResult.text);
  }

  // Attach profile to state context for persistence
  // (state.context as any).candidateProfile = profile;
  return { messages: state.messages, profile };
};
