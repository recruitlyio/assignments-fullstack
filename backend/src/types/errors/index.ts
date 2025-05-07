import { ZodError } from "zod";

export type TPayload = "body" | "params" | "query" | "header";

//This type is used in the api validator middleware/
export type TApiRequestValidationResult = {
  payloadType: TPayload;
  error: ZodError;
};

export type TError = {
  payloadType?: TPayload;
  message: string;
  path?: string;
};

export type TErrors = TError[];
