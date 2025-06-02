import { Badge } from "@/components/ui/badge";
import { UserIcon, Wallet01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
export type CardInterface = {
  src?: string;
  name?: string;
  description?: string;
  amount?: string | number;
  seats?: string | number;
};
function ConnectionCard({
  src,
  name,
  description,
  amount,
  seats,
}: CardInterface) {
  return (
    <div className="border border-[#B4B4B4] hover:border-black max-w-md w-full rounded-lg py-4 px-3 flex flex-col gap-3 relative">
      <div className="flex justify-between items-center">
        <img
          src={src ?? "/media/slack.png"}
          alt="logo-slack"
          className="object-contain size-14"
        />

        <Badge className="text-[#2E8016] font-gilroySemiBold bg-[#E2FBE6] absolute top-4 right-4">
          Connected
        </Badge>
      </div>
      <h1 className="text-xl/5 -mb-1 font-gilroySemiBold">{name ?? "Slack"}</h1>
      <p className="text-[#7F7F7F] text-sm font-gilroyMedium line-clamp-2">
        {description ?? "-"}
      </p>
      <div className="h-[1px] bg-[#f3f3f3]"></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <HugeiconsIcon
            icon={Wallet01FreeIcons}
            className="text-neutral-400 size-4"
          />
          <h1 className="text-sm font-gilroyMedium">₹{amount}/Month</h1>
        </div>
        <div className="flex gap-2 items-center">
          <HugeiconsIcon icon={UserIcon} className="text-neutral-400 size-4" />
          <h1 className="text-sm font-gilroyMedium">{seats} Seats</h1>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
