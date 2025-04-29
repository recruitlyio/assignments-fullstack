import {GeminiChatMessage} from "../types";

const conversations: Record<string, GeminiChatMessage[]> = {};

export function manageConversationContext(conversationId?: string, newHistory?: GeminiChatMessage[]) {
  if (newHistory && conversationId) {
    conversations[conversationId] = newHistory;
  }

  if (conversationId && conversations[conversationId]) {
    return conversations[conversationId];
  }

  return [];
}