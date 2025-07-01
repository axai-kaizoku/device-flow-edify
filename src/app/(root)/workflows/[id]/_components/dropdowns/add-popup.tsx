"use client";

import type React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown";
import { HugeiconsIcon } from "@hugeicons/react";
import { File01Icon, Share08Icon } from "@hugeicons/core-free-icons";
import { AppTaskType } from "../types/task";

export const appData = [
  {
    icon: "/media/integrations-companies/google.webp",
    name: "Gmail",
    type: AppTaskType.GOOGLE
  },
  {
    icon: "/media/integrations-companies/gmail-icon.webp",
    name: "Zoom",
    type: AppTaskType.ZOOM
  },
  {
    icon: "/media/integrations-companies/hubspot.webp",
    name: "HubSpot",
    type: AppTaskType.HUBSPOT
  },
  {
    icon: "/media/integrations-companies/github.webp",
    name: "Github",
    type: AppTaskType.GITHUB
  },
  {
    icon: "/media/integrations-companies/notion.webp",
    name: "Notion",
    type: AppTaskType.NOTION
  }
];

interface AddPopUpProps {
  children: React.ReactNode;
  onAddInstruction: () => void;
  onAddApp: (appType: string) => void;
  onSplitPath: () => void;
}

const AddPopUp = ({
                    children,
                    onAddInstruction,
                    onAddApp,
                    onSplitPath
                  }: AddPopUpProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 rounded-[10px] font-gilroyMedium"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={onAddInstruction}
          >
            <HugeiconsIcon icon={File01Icon} />
            Add Instructions
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-3">
              <img src="/media/workflows/change-app.svg" alt="app" className="-ml-0.5" width={18} height={18} />
              Add App
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40 flex flex-col gap-2 rounded-[10px]">
                {appData?.map((data) => (
                  <DropdownMenuItem
                    key={data.type}
                    className="flex items-center cursor-pointer"
                    onClick={() => onAddApp(data.type)}
                  >
                    <img
                      src={data?.icon || "/placeholder.svg"}
                      alt="App"
                      className="w-4 h-4"
                    />
                    <p className="font-gilroyMedium">{data?.name}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={onSplitPath}
          >
            <HugeiconsIcon icon={Share08Icon} className="rotate-90" />
            Split Path
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddPopUp;
