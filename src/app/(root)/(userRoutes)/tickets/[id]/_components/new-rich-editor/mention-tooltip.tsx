"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MentionType } from "./rich-text-editor";
import { GetAvatar } from "@/components/get-avatar";

export const MentionToolTip = ({
  children,
  mention,
}: {
  children: React.ReactNode;
  mention: MentionType;
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="">
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center gap-2">
              <GetAvatar name={mention?.first_name ?? mention?.title} />
              {/* </div> */}
              {/* <div> */}
              {mention?.first_name ?? mention?.title}
              <br />
              {mention?.email ?? mention?.description}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
