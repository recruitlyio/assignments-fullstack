import { TApiRequestValidationResult, TErrors } from "../types/errors";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public validationRes: TApiRequestValidationResult[]) {
    super("Invalid Request Fields.");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    const processedResponse: TErrors = [];
    return this.validationRes.map((res) => {
      const errors = res.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          message: issue.message,
          payloadType: res.payloadType,
        };
      });
      return errors;
    });
  }
}
