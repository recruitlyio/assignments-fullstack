import { TErrors } from "@/types";
import { buildClient } from "@/utility/http-client";
import { toastErrors } from "@/utility/toast-errors";
import { TInterviewValidation } from "../validations/interview";

export const saveInterviewApi = async (args: TInterviewValidation) => {
  try {
    const htpClient = buildClient({ timeout: 1500000 });
    const response = await htpClient.post(`/interview/save`);
    if (response.status !== 200) {
      throw new Error(`POST /interview/save request failed.`);
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      toastErrors(error.response.data.errors as TErrors);
    }
    throw new Error((error as any).message);
  }
};
