import { TErrors } from "@/types";
import { buildClient } from "@/utility/http-client";
import { toastErrors } from "@/utility/toast-errors";

export const listCandidatesApi = async () => {
  try {
    const htpClient = buildClient({});
    const response = await htpClient.get(`/candidate/list`);
    if (response.status !== 200) {
      throw new Error(`GET /candidate/list request failed.`);
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      toastErrors(error.response.data.errors as TErrors);
    }
    throw new Error((error as any).message);
  }
};
