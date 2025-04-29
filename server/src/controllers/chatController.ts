import { Request, Response } from "express";
import { catchAsync } from "../utils/errorHandler";
import openaiService from "../services/openaiService";
import { ChatRequest, ChatResponse } from "../types";
import logger from "../utils/logger";

// Process chat messages and extract profile information
export const processChat = catchAsync(async (req: Request, res: Response) => {
  const { message, conversation, candidateProfile } = req.body as ChatRequest;

  logger.info("Processing chat message", {
    messageId: message.id,
    conversationId: conversation.id,
  });

  // Generate response from OpenAI
  const responseMessage = await openaiService.generateResponse(
    conversation,
    candidateProfile
  );

  // Extract profile information in parallel
  const updatedProfile = await openaiService.extractProfileInformation(
    {
      ...conversation,
      messages: [...conversation.messages, message], // Include the latest user message
    },
    candidateProfile
  );

  const response: ChatResponse = {
    message: responseMessage,
    candidateProfile: updatedProfile,
  };

  return res.json({
    success: true,
    data: response,
  });
});
