import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.error(`${err.message}`, { stack: err.stack });
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
      messgae: "Invalid Request Fields.",
    });
  }

  if (err instanceof CustomError) {
    console.error(`${err.message}`, { stack: err.stack });
    return res.status(err.statusCode).send({ errors: [err.serializeError()] });
  }
  console.error(`${err.message}`, { stack: err.stack });
  return res.status(400).send({
    errors: [{ message: err.message }],
  });
};
