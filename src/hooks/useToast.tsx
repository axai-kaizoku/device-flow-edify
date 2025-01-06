import React from "react"; // Import React explicitly for JSX
import { toast, Slide } from "react-toastify";
import {
  Check,
  MessageCircleWarningIcon,
  InfoIcon,
  LucideIcon,
} from "lucide-react";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const openToast = (type: ToastType, message: string): void => {
    let Icon: LucideIcon | null = null;

    switch (type) {
      case "success":
        Icon = Check;
        break;
      case "error":
        Icon = MessageCircleWarningIcon;
        break;
      case "info":
        Icon = InfoIcon;
        break;
      default:
        Icon = null;
    }

    toast(
      <span className="flex gap-1 items-center justify-between">
        {Icon && <Icon />} {message}
      </span>,
      {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      }
    );
  };

  return { openToast };
};
