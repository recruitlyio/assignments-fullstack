import { Request, Response } from "express";
import { catchAsync } from "../utils/errorHandler";
import jobDescription from "../data/jobDescription.json";
import logger from "../utils/logger";

// Get the job description
export const getJobDescription = catchAsync(
  async (req: Request, res: Response) => {
    logger.info("Fetching job description");

    return res.json({
      success: true,
      data: jobDescription,
    });
  }
);
