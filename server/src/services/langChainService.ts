import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid";
import {
  createWorkflow,
  DEFAULT_SYSTEM_PROMPT,
} from "../config/langchainConfig";
import { profile } from "console";

// Initialize workflow once for reuse
const llmApp = createWorkflow();

/**
 * Creates a new conversation thread with a system prompt
 * @param systemPrompt Custom system prompt or default if not provided
 * @returns Thread ID for the new conversation
 */
export const createThread = async (
  systemPrompt: string = DEFAULT_SYSTEM_PROMPT
) => {
  // Generate a new thread ID
  // const thread_id = "1";
  const thread_id = uuidv4();

  // Initialize the thread with a system message
  const response = await llmApp.invoke(
    {
      messages: [new SystemMessage(systemPrompt)],
    },
    { configurable: { thread_id } }
  );

  return {
    thread_id,
    message_id: response.messages[response.messages.length - 1].id,
    message: response.messages[response.messages.length - 1].content.toString(),
  };
};

/**
 * Processes a user message in an existing thread
 * @param message User message content
 * @param thread_id Existing thread ID
 * @returns Processed message and profile data
 */
export const processMessage = async (message: string, thread_id: string) => {
  // Create the human message
  const humanMessage = new HumanMessage(message);

  // Invoke the model with the new message using the existing thread_id
  const response = await llmApp.invoke(
    { messages: [humanMessage] },
    { configurable: { thread_id } }
  );
  // Return just the last assistant message
  return {
    thread_id,
    message: response.messages[response.messages.length - 1].content.toString(),
    message_id: response.messages[response.messages.length - 1].id,
    profile: response.profile,
  };
};
