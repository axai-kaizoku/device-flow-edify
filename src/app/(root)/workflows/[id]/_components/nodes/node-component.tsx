"use client";

import { cn } from "@/lib/utils";
import { Handle, type NodeProps, Position, useReactFlow } from "@xyflow/react";
import React, { memo, useEffect, useRef, useState } from "react";
import type { AppNodeData } from "../types/app-node";
import { TaskRegistry } from "../workflow/task/registry";
import { NodeCard } from "./node-card";
import { NodeHeader } from "./node-header";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01FreeIcons,
  MoreVerticalIcon,
  PlayCircleIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { useFlowContext } from "../flow-editor";
import AddPopUp from "../dropdowns/add-popup";
import EditPath from "../dropdowns/edit-path";
import { TaskType } from "../types/task";
import { PlusIcon } from "lucide-react";
import { WorkFlowIcons } from "../../../_components/icons";
import { ConfirmationModal } from "@/app/(root)/workflows/[id]/_components/dropdowns/confirmation-popup";
import { Input } from "@/components/ui/input";

export const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  const [rename, setRename] = useState(false);
  const [label, setLabel] = useState(nodeData.pathName ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    handleAddNode,
    handleAddSplitPath,
    handleDeleteNode,
    hasOutgoingConnection,
    handleAddNodeFromHandle,
    hasConnectionFromHandle,
  } = useFlowContext();
  const { setNodes, getNode } = useReactFlow();

  // Get proper handle IDs from task registry
  const getInputHandleId = () => {
    return task?.inputs?.[0]?.name || "input";
  };

  const getOutputHandleId = () => {
    return task?.outputs?.[0]?.name || "output";
  };

  const [splitDelete, setSplitDelete] = React.useState(false);

  // Add button component
  const AddButton = ({ className = "" }: { className?: string }) => (
    <AddPopUp
      onAddInstruction={() => handleAddNode(props.id, TaskType.INSTRUCTION)}
      onAddApp={(appType: string) =>
        handleAddNode(props.id, TaskType.APP, appType)
      }
      onSplitPath={() => handleAddSplitPath(props.id)}
    >
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "absolute w-6 h-6 p-0 border-none hover:text-[#0062FF] text-[#0062FF] bg-[#EDF4FF] rounded-full hover:bg-blue-50",
          className
        )}
        type={"button"}
      >
        <PlusIcon size={12} />
      </Button>
    </AddPopUp>
  );

  // Add button for specific handle
  const HandleAddButton = ({
    handleId,
    className = "",
  }: {
    handleId: string;
    className?: string;
  }) => (
    <AddPopUp
      onAddInstruction={() =>
        handleAddNodeFromHandle(props.id, handleId, TaskType.INSTRUCTION)
      }
      onAddApp={(appType: string) =>
        handleAddNodeFromHandle(props.id, handleId, TaskType.APP, appType)
      }
      onSplitPath={() => handleAddSplitPath(props.id)}
    >
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "absolute w-6 h-6 p-0 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50",
          className
        )}
      >
        <PlusIcon size={12} className="text-blue-500" />
      </Button>
    </AddPopUp>
  );

  // Edit handlers
  const handleEditAction = () => {
    console.log(
      "Edit action clicked for node:",
      props.id,
      "type:",
      nodeData.type
    );
  };

  const handleChangeApp = (appType: string) => {
    console.log(nodeData, "node-data");
    // const node = getNode(props.id);
    // node.type = appType;
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === props.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              type: "APP",
              appType: appType,
            },
          };
        }
        return nd;
      })
    );
  };

  const handleDuplicateNode = () => {
    handleAddNode(props.id, nodeData.type);
  };

  const handleEditCondition = () => {
    console.log("Edit condition clicked for path:", props.id);
  };

  const handleAddPath = () => {
    console.log("Add path clicked for path:", props.id);
  };

  const handleRenamePath = () => {
    setRename(true);
    requestAnimationFrame(() => {
      const input = inputRef?.current;
      if (input) {
        input.focus();
        input.select(); // auto-selects the text
      }
    });
  };

  const handleBlur = () => {
    setRename(false);
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === props.id) {
          return {
            ...nd,
            data: {
              ...nd.data,
              pathName: label,
            },
          };
        }
        return nd;
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      setNodes((nds) =>
        nds.map((nd) => {
          if (nd.id === props.id) {
            return {
              ...nd,
              data: {
                ...nd.data,
                pathName: label,
              },
            };
          }
          return nd;
        })
      );
    }
  };
  const handleDeleteNodeClick = () => {
    handleDeleteNode(props.id);
  };

  const handleDuplicatePath = () => {
    handleAddNode(props.id, nodeData.type);
  };

  const handleDeletePath = () => {
    // console.log("Delete path clicked for path:", props.id);
    handleDeleteNode(props.id);
  };

  switch (task) {
    case TaskRegistry.START:
      return (
        <div className="relative">
          <NodeCard
            className="bg-[#DEF4E0] w-fit py-1.5 px-3 border border-[#0C941C]"
            nodeId={props.id}
            isSelected={!!props.selected}
          >
            <div className="flex items-center gap-1.5 text-[#0C941C]">
              <HugeiconsIcon icon={PlayCircleIcon} size={16} />
              Start
            </div>

            <Handle
              id={getOutputHandleId()}
              type="source"
              position={Position.Right}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-right-0 !w-2.5 !h-2.5",
                !hasOutgoingConnection(props.id, nodeData.type) && "invisible"
              )}
            />
          </NodeCard>

          {/* Always show add button for start node */}
          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButton className="-right-8 top-1/2 -translate-y-1/2" />
          )}
        </div>
      );

    case TaskRegistry.APP:
      return (
        <div className="relative">
          <NodeCard
            className={cn(
              !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
              "rounded-xl w-[260px]"
            )}
            nodeId={props.id}
            isSelected={!!props.selected}
          >
            <NodeHeader
              canDuplicate={!hasOutgoingConnection(props.id, nodeData.type)}
              taskType={nodeData.type}
              nodeData={nodeData}
              nodeId={props.id}
              onEditAction={handleEditAction}
              onChangeApp={handleChangeApp}
              onDuplicate={handleDuplicateNode}
              onDelete={handleDeleteNodeClick}
            />

            <div className="p-2">
              <Input
                value={"Send onboarding mail"}
                disabled
                className="text-sm bg-[#00000003] disabled:cursor-auto select-none"
              />
            </div>

            <Handle
              id={getInputHandleId()}
              type="target"
              position={Position.Left}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-left-0 !w-2.5 !h-2.5"
              )}
            />
            <Handle
              id={getOutputHandleId()}
              type="source"
              position={Position.Right}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-right-0 !w-2.5 !h-2.5"
              )}
            />
          </NodeCard>

          {/* Show add button if no outgoing connection */}
          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButton className="-right-12 top-1/2 -translate-y-1/2" />
          )}
        </div>
      );

    case TaskRegistry.INSTRUCTION:
      return (
        <div className="relative">
          <NodeCard
            className={cn(
              !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
              "rounded-xl w-[260px]"
            )}
            nodeId={props.id}
            isSelected={!!props.selected}
          >
            <NodeHeader
              canDuplicate={!hasOutgoingConnection(props.id, nodeData.type)}
              taskType={nodeData.type}
              nodeData={nodeData}
              nodeId={props.id}
              onEditAction={handleEditAction}
              onChangeApp={handleChangeApp}
              onDuplicate={handleDuplicateNode}
              onDelete={handleDeleteNodeClick}
            />

            <div className="p-2">
              <Input
                value={"Send onboarding mail"}
                disabled
                className="text-sm bg-[#00000003] disabled:cursor-auto select-none"
              />
            </div>
            <Handle
              id={getInputHandleId()}
              type="target"
              position={Position.Left}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-left-0 !w-2.5 !h-2.5"
              )}
            />
            <Handle
              id={getOutputHandleId()}
              type="source"
              position={Position.Right}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-right-0 !w-2.5 !h-2.5"
              )}
            />
          </NodeCard>

          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButton className="-right-12 top-1/2 -translate-y-1/2" />
          )}
        </div>
      );

    case TaskRegistry.SPLIT:
      return (
        <div className="relative">
          <NodeCard
            className={cn(
              !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
              "rounded-[10px] rotate-45 size-12 bg-green-100 border-green-500 flex items-center justify-center"
            )}
            nodeId={props.id}
            isSelected={!!props.selected}
          >
            <div className="-rotate-45">
              <WorkFlowIcons.splitPathIcon />
            </div>

            {/* 1 Target handle (left) */}
            <Handle
              id={getInputHandleId()}
              type="target"
              position={Position.Left}
              className={cn(
                " !top-12 !bg-transparent !rounded-none !border-none"
              )}
              children={
                <img
                  src="/media/workflows/handle.svg"
                  className=" absolute -top-1.5 -rotate-45 text-xl -left-[1px]"
                />
              }
            />

            {/* 3 Source handles (top, right, bottom) */}
            <Handle
              id="branch-0"
              type="source"
              position={Position.Top}
              className={cn(
                "!bg-transparent !rounded-none !border-none !-left-0 ",
                !hasConnectionFromHandle(props.id, "branch-0") && "invisible"
              )}
              children={
                <img
                  src="/media/workflows/handle.svg"
                  className=" absolute -top-2 rotate-45 text-xl -left-[2px]"
                />
              }
            />
            <Handle
              id="branch-1"
              type="source"
              position={Position.Right}
              className={cn(
                "!bg-transparent !rounded-none !border-none !-top-0 !-right-1",
                !hasConnectionFromHandle(props.id, "branch-1") && "invisible"
              )}
              children={
                <img
                  src="/media/workflows/handle.svg"
                  className=" absolute -top-2.5 rotate-[130deg] text-xl -left-[3px]"
                />
              }
            />
            <Handle
              id="branch-2"
              type="source"
              position={Position.Bottom}
              className={cn(
                "!bg-transparent !rounded-none !border-none !left-12 !w-2.5 !h-2.5",
                !hasConnectionFromHandle(props.id, "branch-2") && "invisible"
              )}
              children={
                <img
                  src="/media/workflows/handle.svg"
                  className=" absolute -top-1 rotate-[-135deg] text-xl !left-0.5"
                />
              }
            />
          </NodeCard>

          {!hasConnectionFromHandle(props.id, "branch-0") && (
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 p-0 border-none hover:text-[#0062FF] text-[#0062FF] bg-[#EDF4FF] rounded-full hover:bg-blue-50"
              )}
              onClick={() =>
                handleAddNodeFromHandle(props.id, "branch-0", TaskType.PATH)
              }
              type={"button"}
            >
              <PlusIcon size={12} />
            </Button>
          )}
          {!hasConnectionFromHandle(props.id, "branch-1") && (
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 p-0 border-none hover:text-[#0062FF] text-[#0062FF] bg-[#EDF4FF] rounded-full hover:bg-blue-50"
              )}
              onClick={() =>
                handleAddNodeFromHandle(props.id, "branch-1", TaskType.PATH)
              }
              type={"button"}
            >
              <PlusIcon size={12} />
            </Button>
          )}
          {!hasConnectionFromHandle(props.id, "branch-2") && (
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 p-0 border-none hover:text-[#0062FF] text-[#0062FF] bg-[#EDF4FF] rounded-full hover:bg-blue-50"
              )}
              onClick={() =>
                handleAddNodeFromHandle(props.id, "branch-2", TaskType.PATH)
              }
              type={"button"}
            >
              <PlusIcon size={12} />
            </Button>
          )}

          {!!props.selected && (
            <ConfirmationModal
              open={splitDelete}
              setOpen={setSplitDelete}
              functionToBeExecuted={() => {
                handleDeleteNode(props.id);
                setSplitDelete(false);
              }}
              title="Are you sure?"
              description="Are you sure you want to delete the node?"
              type="failure"
              successBtnText="Delete"
            >
              <Button
                size="sm"
                variant="outline"
                className="absolute hover:bg-white rounded-full -bottom-16 left-1/2 -translate-x-1/2 text-[#DC2626] hover:text-[#DC2626] border"
                // onClick={() => handleDeleteNode(props.id)}
              >
                <HugeiconsIcon icon={Delete01FreeIcons} size={16} /> Delete
              </Button>
            </ConfirmationModal>
          )}
        </div>
      );

    case TaskRegistry.PATH:
      return (
        <div className="relative">
          <NodeCard
            className={cn(
              !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
              "rounded-lg flex items-center justify-between min-w-20 w-full max-w-fit  p-2 bg-blue-50 border-blue-300"
            )}
            nodeId={props.id}
            isSelected={!!props.selected}
          >
            <div className="text-center cursor-pointer">
              {rename ? (
                <input
                  ref={inputRef}
                  value={label}
                  autoFocus={rename}
                  disabled={!rename}
                  onChange={(e) => setLabel(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "text-xs focus:outline-none font-gilroyMedium  text-[#0062FF] w-14",
                    "disabled:bg-transparent bg-white",
                    !rename && "pointer-events-none cursor-move select-none"
                  )}
                />
              ) : (
                <p className="text-xs font-medium text-blue-700">
                  {nodeData.pathName}
                </p>
              )}

              {/* {branchData?.condition && (
                <p className="text-xs text-gray-500 mt-1">
                  {branchData.condition.field} {branchData.condition.operator}{" "}
                  {branchData.condition.value}
                </p>
              )} */}
            </div>
            <EditPath
              appType={nodeData.type}
              type={"set"}
              onEditCondition={handleEditCondition}
              onAddPath={handleAddPath}
              onRename={handleRenamePath}
              onDuplicate={handleDuplicatePath}
              onDelete={handleDeletePath}
            >
              <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
            </EditPath>

            <Handle
              id={getInputHandleId()}
              type="target"
              position={Position.Left}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-left-0 !w-2.5 !h-2.5"
              )}
            />
            <Handle
              id={getOutputHandleId()}
              type="source"
              position={Position.Right}
              className={cn(
                "!bg-[#0062FF] !ring-2 !ring-[#D4E4FF] !-right-0 !w-2.5 !h-2.5"
              )}
            />
          </NodeCard>

          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButton className="-right-8 top-1/2 -translate-y-1/2" />
          )}
        </div>
      );

    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
});

NodeComponent.displayName = "NodeComponent";
