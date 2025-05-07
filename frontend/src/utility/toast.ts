import { toast } from "react-toastify";

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: "top-right",
  });
export const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-right",
  });

export const notifyWarn = (message: string) =>
  toast.warn(message, {
    position: "top-right",
  });
