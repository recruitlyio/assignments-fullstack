import { CustomError } from "./custom-error";
export class DBConnectionFailedError extends CustomError {
  statusCode = 500;
  constructor() {
    super("Database Connection Error.");
    Object.setPrototypeOf(this, DBConnectionFailedError.prototype);
  }

  serializeError(): {
    message: string;
    statusCode: number;
  } {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
