import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-14 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-gilroyMedium file:text-foreground placeholder:text-[#8A8A8A] focus-visible:outline-none focus-visible:border-primary  disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
