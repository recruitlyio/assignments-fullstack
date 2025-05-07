import { BACKEND_BASE_URL } from "@/config/app";
import axios, { AxiosInstance, CancelToken } from "axios";

interface IBuildClientArgs {
  timeout?: number;
  headers?: { [key: string]: string };
  cancelToken?: CancelToken;
  nextClient?: boolean;
}
export const buildClient = ({
  timeout = 15000,
  headers,
  cancelToken,
  nextClient = false,
}: IBuildClientArgs): AxiosInstance => {
  if (!headers) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  return axios.create({
    baseURL: nextClient ? "/api" : BACKEND_BASE_URL,
    timeout,
    cancelToken,
  });
};
