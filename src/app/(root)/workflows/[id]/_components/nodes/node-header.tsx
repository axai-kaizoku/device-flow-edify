"use client";

import { Badge } from "@/components/ui/badge";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import EditNode from "../dropdowns/edit-node";
import { useDeleteNode } from "../hooks/use-delete-node";
import type { AppNodeData } from "../types/app-node";
import { TaskType } from "../types/task";
import { TaskRegistry } from "../workflow/task/registry";

interface NodeHeaderProps {
  taskType: TaskType;
  nodeData?: AppNodeData;
  nodeId: string;
  onEditAction: () => void;
  onChangeApp: any;
  onDuplicate: () => void;
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
}: NodeHeaderProps) => {
  const task = TaskRegistry[taskType];

  const { deleteNodeMutation } = useDeleteNode();

  switch (task.type) {
    case TaskType.APP:
      return (
        <div className="flex justify-between items-center w-full gap-2 p-2">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <img
                src={nodeData?.backendData?.template?.image ?? "/logo.png"}
                alt={nodeData.appType}
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
              onDelete={() => deleteNodeMutation.mutate(nodeId)}
            >
              <div
                className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                onClick={(e) => e.stopPropagation()}
              >
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
