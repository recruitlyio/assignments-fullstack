import { CustomError } from "./custom-error";
export class NotFoundError extends CustomError {
  statusCode = 404;
  isError = true;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError(): {
    message: string;
  } {
    return {
      message: this.message,
    };
  }
}
