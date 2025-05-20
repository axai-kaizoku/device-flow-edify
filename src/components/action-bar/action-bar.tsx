import { cn } from "@/lib/utils";
import { NewBackButton } from "./new-back-button";

export const ActionBar = ({
  children,
  className,
  showBackBtn = false,
}: {
  children: React.ReactNode;
  className?: string;
  showBackBtn?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white"
      )}
    >
      <div className="flex items-center gap-2 w-full h-full">
        {showBackBtn && <NewBackButton />}
        <div
          className={cn(
            "flex items-center justify-between w-full h-full",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
