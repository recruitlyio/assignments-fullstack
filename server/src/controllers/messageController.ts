import { Request, Response, NextFunction } from "express";
import * as langChainService from "../services/langChainService";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, thread_id } = req.body;

    if (!thread_id) {
      res.status(400).json({ error: "thread_id is required" });
      return;
    }

    if (!message) {
      res.status(400).json({ error: "message is required" });
      return;
    }

    const response = await langChainService.processMessage(message, thread_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
