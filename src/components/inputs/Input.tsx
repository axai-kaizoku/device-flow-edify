import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import CalanderIcon from "@/icons/CalanderIcon";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "h-12 w-full  rounded-[10px] border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-gilroyMedium file:text-foreground placeholder:text-[#8A8A8A] focus-visible:outline-none focus-visible:border-primary  disabled:cursor-not-allowed disabled:opacity-50 md:text-base font-gilroyRegular",
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "date" && (
        <button
          type="button"
          className="absolute top-2.5 right-4"
          onClick={(e) => {
            const input = e.currentTarget
              .previousElementSibling as HTMLInputElement;
            input?.focus();
            input?.click();
          }}
        >
          <CalanderIcon className="cursor-pointer" />
        </button>
      )}
    </div>
  );
});
Input.displayName = "Input";
