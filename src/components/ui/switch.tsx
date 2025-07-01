import { cn } from "@/lib/utils";
import * as React from "react";

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, disabled, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-flex items-center",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="checkbox"
        role="switch"
        className="sr-only peer"
        disabled={disabled}
        ref={ref}
        {...props}
      />

      <div
        className={cn(
          "h-[1.1rem] w-8 rounded-full transition-all",
          "bg-input peer-checked:bg-green-600",
          "peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring"
        )}
      />

      <span
        className={cn(
          "absolute top-[0.9px] block h-4 w-4 rounded-full bg-background",
          "transition-all duration-200 ease-in-out",
          "left-[0.5px] peer-checked:left-[calc(48%)]"
        )}
      />
    </label>
  )
);

Switch.displayName = "Switch";

export { Switch };
