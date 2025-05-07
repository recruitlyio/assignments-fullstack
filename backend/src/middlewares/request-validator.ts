import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError, ZodType } from "zod";
import { RequestValidationError } from "../errors/request-validation-error";
import { TApiRequestValidationResult } from "../types/errors";

export const validateRequest = (
  zBody: AnyZodObject | ZodType | undefined,
  zQuery: AnyZodObject | ZodType | undefined,
  zParam: AnyZodObject | ZodType | undefined
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestValidationErrors: TApiRequestValidationResult[] = [];
    try {
      if (zBody) await zBody.parseAsync(req.body);
    } catch (error) {
      requestValidationErrors.push({
        payloadType: "body",
        error: error as ZodError,
      });
    }
    try {
      if (zParam) await zParam.parseAsync(req.params);
    } catch (error) {
      requestValidationErrors.push({
        payloadType: "params",
        error: error as ZodError,
      });
    }
    try {
      if (zQuery) await zQuery.parseAsync(req.query);
    } catch (error) {
      requestValidationErrors.push({
        payloadType: "query",
        error: error as ZodError,
      });
    }
    if (requestValidationErrors.length) {
      throw new RequestValidationError(requestValidationErrors);
    }
    return next();
  };
};
