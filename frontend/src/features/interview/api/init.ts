import { TErrors } from "@/types";
import { buildClient } from "@/utility/http-client";
import { toastErrors } from "@/utility/toast-errors";

export const initInterviewApi = async (args: {
  candidateId: string;
  difficulty?: string;
}) => {
  try {
    const htpClient = buildClient({ timeout: 1500000 });
    const response = await htpClient.get(
      `/interview/init?candidateId=${args.candidateId}&difficultyLevel=${args.difficulty}`
    );
    if (response.status !== 200) {
      throw new Error(`GET /interview/init request failed.`);
    }
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      toastErrors(error.response.data.errors as TErrors);
    }
    throw new Error((error as any).message);
  }
};
