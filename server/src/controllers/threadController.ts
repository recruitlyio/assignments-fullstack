import { Request, Response, NextFunction } from "express";
import * as langChainService from "../services/langChainService";

export const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const systemPrompt = req.body?.systemPrompt;
    const { thread_id, message, message_id } =
      await langChainService.createThread(systemPrompt);
    res.json({ thread_id, message, message_id });
  } catch (error) {
    next(error);
  }
};
