import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";

export const MemberIcon = ({
  src,
  isPlaceholder,
  className,
}: {
  src?: string;
  isPlaceholder: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "size-9 rounded-full border-2 border-white flex items-center justify-center",
      isPlaceholder ? "bg-gray-200 text-gray-500" : "",
      className
    )}
  >
    {isPlaceholder ? (
      "-uyfguhijtrfyg"
    ) : // <Icons.team_no_memeber_logo className="size-40" />
    src ? (
      <img
        src={src}
        alt="Member"
        className="rounded-full w-full h-full object-cover"
      />
    ) : (
      <UserIcon />
    )}
  </div>
);
