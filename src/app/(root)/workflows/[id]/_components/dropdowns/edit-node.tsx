"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { AppTaskType } from "../types/task";
import { ConfirmationModal } from "@/app/(root)/workflows/[id]/_components/dropdowns/confirmation-popup";
import SetActionDialog from "@/app/(root)/workflows/[id]/_components/dialogs/set-action.dialog";
import { InstructionDialog } from "@/app/(root)/workflows/[id]/_components/dialogs/instructions/instruction.dialog";
import { useReactFlow } from "@xyflow/react";

const appData = [
  {
    icon: "/media/integrations-companies/google.webp",
    name: "Gmail",
    type: AppTaskType.GOOGLE,
  },
  {
    icon: "/media/integrations-companies/gmail-icon.webp",
    name: "Zoom",
    type: AppTaskType.ZOOM,
  },
  {
    icon: "/media/integrations-companies/hubspot.webp",
    name: "HubSpot",
    type: AppTaskType.HUBSPOT,
  },
  {
    icon: "/media/integrations-companies/github.webp",
    name: "Github",
    type: AppTaskType.GITHUB,
  },
  {
    icon: "/media/integrations-companies/notion.webp",
    name: "Notion",
    type: AppTaskType.NOTION,
  },
];

interface EditNodeProps {
  children: React.ReactNode;
  state?: "connected" | "disconnected";
  type: "app" | "instruction";
  onEditAction: () => void;
  onChangeApp: (appType: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  canDuplicate: boolean;
  data?: any;
}

const EditNode = ({
  children,
  state,
  onEditAction,
  type,
  data,
  onChangeApp,
  onDuplicate,
  canDuplicate,
  onDelete,
}: EditNodeProps) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={state === "disconnected"}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 rounded-[10px] font-gilroyMedium"
        align="start"
      >
        <DropdownMenuGroup>
          {type === "app" ? (
            <SetActionDialog
              onDelete={onDelete}
              data={data}
              open={openEdit}
              setOpen={setOpenEdit}
            >
              <DropdownMenuItem
                className="flex items-center cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onEditAction();
                  setOpenEdit(true);
                }}
              >
                <img
                  src="/media/edit-condition.svg"
                  alt="edit action"
                  width={16}
                  height={16}
                />
                Edit Action
              </DropdownMenuItem>
            </SetActionDialog>
          ) : (
            <InstructionDialog
              data={data}
              onDelete={onDelete}
              open={openEdit}
              setOpen={setOpenEdit}
            >
              <DropdownMenuItem
                className="flex items-center cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onEditAction();
                  setOpenEdit(true);
                }}
              >
                <img
                  src="/media/edit-condition.svg"
                  alt="edit action"
                  width={16}
                  height={16}
                />
                Edit Action
              </DropdownMenuItem>
            </InstructionDialog>
          )}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-3">
              <img
                src="/media/workflows/change-app.svg"
                alt="change app"
                className="-ml-0.5"
                width={18}
                height={18}
              />
              Change app
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40 flex flex-col gap-2">
                {appData?.map((data, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center cursor-pointer"
                    onClick={() => onChangeApp(data.type)}
                  >
                    <img
                      src={data?.icon || "/placeholder.svg"}
                      alt="App"
                      className="w-4 h-4"
                      width={16}
                      height={16}
                    />
                    <p className="font-gilroyMedium">{data?.name}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {canDuplicate ? (
            <DropdownMenuItem className="cursor-pointer" onClick={onDuplicate}>
              <img
                src="/media/duplicate.svg"
                alt="duplicate"
                width={16}
                height={16}
              />
              Duplicate
            </DropdownMenuItem>
          ) : null}

          <ConfirmationModal
            open={open}
            setOpen={setOpen}
            functionToBeExecuted={() => {
              onDelete();
              setOpen(false);
            }}
            title="Are you sure?"
            description="Are you sure you want to delete the node?"
            type="failure"
            successBtnText="Delete"
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="text-red-500 font-gilroyMedium w-full cursor-pointer"
            >
              <HugeiconsIcon icon={Delete01Icon} size={16} />
              Delete Node
            </DropdownMenuItem>
          </ConfirmationModal>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditNode;
