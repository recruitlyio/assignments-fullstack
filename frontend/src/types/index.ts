export type TPayload = "body" | "params" | "query" | "header";

export type TError = {
  payloadType?: TPayload;
  message: string;
  path?: string;
};

export type TErrors = TError[];

export enum InterviewStatusEnum {
  Init = "init",
  Finished = "finished",
}
