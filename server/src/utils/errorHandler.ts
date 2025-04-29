import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Operational, trusted error: send message to client
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  logger.error("Unexpected error", { error: err });
  return res.status(500).json({
    success: false,
    error: "Something went wrong",
  });
};

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
