import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { parserService } from '../services/parserService';
import { StatusCodes } from 'http-status-codes';

const parseResumeSchema = z.object({
  resumeText: z
    .string({
      required_error: 'resumeText is required',
      invalid_type_error: 'resumeText must be a string',
    })
    .min(10, 'Resume text seems too short to be valid.'),
});

export const parserController = {
  parseResume: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = parseResumeSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validationResult.error.errors,
        });
      }

      const { resumeText } = validationResult.data;

      const parsedData = await parserService.parseResume(resumeText);

      res.status(StatusCodes.OK).json({ data: parsedData });
    } catch (error: any) {
      console.error('Error in parserController:', error);
      next(error);
    }
  },
};
