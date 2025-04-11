import React from "react";
import { toast, Slide } from "react-toastify";
import { cn } from "@/lib/utils";
import ToastIcons from "@/icons/ToastIcons";

type ToastType = "success" | "error";

export const useToast = () => {
  const openToast = (type: ToastType, message: string): void => {
    let Icon: React.ReactNode;
    let containerStyles = "";
    let textStyles = "";

    switch (type) {
      case "error":
        Icon = <ToastIcons.toast_error />;
        containerStyles = "bg-[#FFE5E8] text-[#FF0000]";
        textStyles = "text-[#FF0000]";
        break;

      case "success":
        Icon = <ToastIcons.toast_success />;
        containerStyles = "bg-[#ECFDF3] text-[#0D9B00]";
        textStyles = "text-[#0D9B00]";
        break;
    }

    toast(
      <div
        className={cn(
          "flex pl-4 rounded-xl p-3 w-full h-full font-gilroyMedium flex-col gap-1 items-start justify-start",
          containerStyles
        )}
      >
        <div className="flex gap-2 items-center font-gilroySemiBold w-full ">
          {Icon} {type === "success" ? "Success" : "Error"}
        </div>
        <div className={cn("pl-6 text-sm w-full", textStyles)}>• {message}</div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
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
