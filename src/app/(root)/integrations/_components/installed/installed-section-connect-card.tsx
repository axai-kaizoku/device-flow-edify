import React from "react";
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
    <div className="border border-[#B4B4B4] max-w-md w-full rounded-xl py-6 px-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <img
          src={src ?? "/media/slack.png"}
          alt="logo-slack"
          className="object-contain size-14"
        />
        <div className="text-[#2E8016] font-gilroySemiBold bg-[#E2FBE6] rounded-full py-2 px-4">
          Connected
        </div>
      </div>
      <h1 className="text-xl font-gilroySemiBold">{name ?? "Slack"}</h1>
      <p className="text-[#7F7F7F] text-sm font-gilroyMedium">
        {description ?? "-"}
      </p>
      <div className="h-[1px] bg-[#f3f3f3]"></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img
            src="/media/integrations/purse.png"
            className="size-5"
            alt="Amount-logo"
          />
          <h1 className="text-sm font-gilroyMedium">${amount}/Month</h1>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src="/media/integrations/user.png"
            className="size-5"
            alt="User-logo"
          />
          <h1 className="text-sm font-gilroyMedium">{seats} Seats</h1>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <img
            src="/media/integrations/settings.png"
            className="size-5"
            alt="Settings-logo"
          />
          <h1 className="text-sm font-gilroyMedium">Manage</h1>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
