import { Icons } from "@/components/icons";

export const MemberIcon = ({
  src,
  isPlaceholder,
}: {
  src?: string;
  isPlaceholder: boolean;
}) => (
  <div
    className={`size-9 rounded-full border-2 border-white flex items-center justify-center ${
      isPlaceholder ? "bg-gray-200 text-gray-500" : ""
    }`}
  >
    {isPlaceholder ? (
      "-uyfguhijtrfyg"
    ) : (
      // <Icons.team_no_memeber_logo className="size-40" />
      <img
        src={src}
        alt="Member"
        className="rounded-full w-full h-full object-cover"
      />
    )}
  </div>
);
