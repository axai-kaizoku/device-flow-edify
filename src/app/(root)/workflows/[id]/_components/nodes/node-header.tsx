"use client";

import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, Note02Icon } from "@hugeicons/core-free-icons";
import { TaskType, AppTaskType } from "../types/task";
import { TaskRegistry } from "../workflow/task/registry";
import type { AppNodeData } from "../types/app-node";
import EditNode from "../dropdowns/edit-node";

interface NodeHeaderProps {
  taskType: TaskType;
  nodeData?: AppNodeData;
  nodeId: string;
  onEditAction: () => void;
  onChangeApp: (appType: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  canDuplicate: boolean;
}

export const NodeHeader = ({
  taskType,
  nodeData,
  canDuplicate,
  nodeId,
  onEditAction,
  onChangeApp,
  onDuplicate,
  onDelete,
}: NodeHeaderProps) => {
  const task = TaskRegistry[taskType];

  switch (task.type) {
    case TaskType.APP:
      return (
        <div className="flex justify-between items-center w-full gap-2 p-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <img
                src={`/media/integrations-companies/gsuite-icon.webp`}
                alt={task.label}
                width={45}
                height={45}
                className="rounded-md bg-neutral-100"
              />
              <div className="flex flex-col gap-1.5">
                <p className="font-gilroySemiBold capitalize text-sm">
                  {nodeData.appType}
                </p>
                <Badge className="text-xs p-0.5 px-2 w-fit rounded-md bg-transparent border border-[#0000000D] text-primary">
                  Action
                </Badge>
              </div>
            </div>
            <EditNode
              state="connected"
              canDuplicate={canDuplicate}
              type="app"
              data={{ ...nodeData }}
              onEditAction={onEditAction}
              onChangeApp={onChangeApp}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            >
              <div className="cursor-pointer hover:bg-gray-100 p-1 rounded">
                <HugeiconsIcon icon={MoreVerticalIcon} />
              </div>
            </EditNode>
          </div>
        </div>
      );

    case TaskType.INSTRUCTION:
      return (
        <div className="flex justify-between items-center w-full gap-2 p-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <div className="size-11 rounded-md flex justify-center border border-[#0062FF] bg-[#0062FF0D] items-center">
                <HugeiconsIcon icon={Note02Icon} size={28} color="#0062FF" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-gilroySemiBold capitalize text-sm">
                  {task.label}
                </p>
                <Badge className="text-xs p-0.5 px-2 w-fit rounded-md bg-transparent border border-[#0000000D] text-primary">
                  Action
                </Badge>
              </div>
            </div>
            <EditNode
              type="instruction"
              canDuplicate={canDuplicate}
              data={{ ...nodeData }}
              onEditAction={onEditAction}
              onChangeApp={onChangeApp}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            >
              <div className="cursor-pointer hover:bg-gray-100 p-1 rounded">
                <HugeiconsIcon icon={MoreVerticalIcon} />
              </div>
            </EditNode>
          </div>
        </div>
      );

    default:
      return <div className="text-xs font-gilroyMedium">default</div>;
  }
};
