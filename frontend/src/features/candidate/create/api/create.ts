import { TErrors } from "@/types";
import { buildClient } from "@/utility/http-client";
import { toastErrors } from "@/utility/toast-errors";
import { TCandidateInformation } from "../validations/candidate-information-form";

export const createCandidatesApi = async (
  candidateInfo: TCandidateInformation
) => {
  try {
    const htpClient = buildClient({});
    const response = await htpClient.post(`/candidate/create`, candidateInfo);
    if (response.status !== 200) {
      throw new Error(`POST /candidate/create request failed.`);
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      toastErrors(error.response.data.errors as TErrors);
    }
    throw new Error((error as any).message);
  }
};
