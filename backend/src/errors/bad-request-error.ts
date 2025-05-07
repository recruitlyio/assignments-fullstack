import { CustomError } from "./custom-error";
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): {
    message: string;
  } {
    return {
      message: this.message,
    };
  }
}
