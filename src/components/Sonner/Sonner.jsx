import React from "react";
import { Toaster, toast } from "sonner";

export const useToast = () => {
  const toastify = (message, type = "default") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "action":
        toast.action(message);
        break;
      default:
        toast(message);
    }
  };

  return toastify;
};

const SonnerToaster = () => {
  return <Toaster position="top-right" expand={true} richColors closeButton />;
};

export default SonnerToaster;
