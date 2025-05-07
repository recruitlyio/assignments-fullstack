import { TErrors } from "@/types";
import { notifyError } from "./toast";

export const toastErrors = (errors: TErrors) => {
  errors?.forEach((error) => {
    notifyError(error.message);
  });
};
