"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  Delete01FreeIcons,
  MoreVerticalIcon,
  PlayCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import React, { memo, useRef, useState } from "react";
import type { AppNodeData } from "../types/app-node";
import { TaskRegistry } from "../workflow/task/registry";
import { NodeCard } from "./node-card";
import { NodeHeader } from "./node-header";

import { ConfirmationModal } from "@/app/(root)/workflows/[id]/_components/dropdowns/confirmation-popup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteBranch,
  updatePathNameOrNextNode,
} from "@/server/workflowActions/workflowById/workflowPaths";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { WorkFlowIcons } from "../../../_components/icons";
import DeviceFlowDialog from "../dialogs/device-flow-dialog";
import { InstructionDialog } from "../dialogs/instructions/instruction.dialog";
import SetActionDialog from "../dialogs/set-action.dialog";
import SetConditionDialog from "../dialogs/set-condition.dialog";
import AddPopUp from "../dropdowns/add-popup";
import EditPath from "../dropdowns/edit-path";
import { useFlowContext } from "../flow-editor";
import { useDeleteNode } from "../hooks/use-delete-node";
import { useSplitDeletion } from "../hooks/use-split-deletion";
import { AppTaskType, TaskType } from "../types/task";
import { addNodeAfterNode } from "../utils/backend-actions";
import ConnectIntegrationFlow from "./connect-integration-workflow";

export const NodeComponent = memo((props: NodeProps) => {
  const queryClient = useQueryClient();
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  const [rename, setRename] = useState(false);
  const [label, setLabel] = useState(nodeData.pathName ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  // Dialog states
  type DialogType = "APP" | "INSTRUCTION" | "PATH" | null;
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  const {
    handleAddNode,
    handleAddNodeForPath,
    handleAddSplitPath,
    handleAddSplitPathForPath,
    hasOutgoingConnection,
    handleAddNodeFromHandle,
    hasConnectionFromHandle,
  } = useFlowContext();

  const { handleSplitDeletion } = useSplitDeletion(
    nodeData.backendData?.workflowId || ""
  );

  const { deleteNodeMutation } = useDeleteNode();

  // Get proper handle IDs from task registry
  const getInputHandleId = () => {
    return task?.inputs?.[0]?.name || "input";
  };

  const getOutputHandleId = () => {
    return task?.outputs?.[0]?.name || "output";
  };

  const [splitDelete, setSplitDelete] = React.useState(false);

  const handleDuplicateMutation = useMutation({
    mutationFn: async ({
      sourceNodeId,
      nodeType,
      appType,
      position,
      workflowId,
    }: {
      sourceNodeId: string;
      nodeType: TaskType;
      appType?: AppTaskType;
      position: { x: number; y: number };
      workflowId: string;
    }) =>
      await addNodeAfterNode({
        nodeType,
        position,
        sourceNodeId,
        workflowId,
        appType,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-by-id"] });
      setSplitDelete(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to duplicate");
    },
  });

  // Add button component
  const AddButton = ({
    className = "",
    nodeData,
  }: {
    className?: string;
    nodeData: any;
  }) => (
    <AddPopUp
      onAddInstruction={(appName) => {
        handleAddNode(
          nodeData?.backendData?.parentNodeId,
          TaskType.INSTRUCTION,
          appName
        );
      }}
      onAddApp={(appType) =>
        handleAddNode(
          nodeData?.backendData?.parentNodeId,
          TaskType.APP,
          appType
        )
      }
      onSplitPath={() => {
        handleAddSplitPath(nodeData?.backendData?._id);
      }}
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

  const AddButtonForPath = ({
    className = "",
    nodeData,
  }: {
    className?: string;
    nodeData: any;
  }) => (
    <AddPopUp
      onAddInstruction={(appName) => {
        handleAddNodeForPath(
          nodeData?.backendData?.parentNodeId,
          nodeData?.branchData?.branchId,
          TaskType.INSTRUCTION,
          appName
        );
      }}
      onAddApp={(appType) =>
        handleAddNodeForPath(
          nodeData?.backendData?.parentNodeId,
          nodeData?.branchData?.branchId,
          TaskType.APP,
          appType
        )
      }
      onSplitPath={(key) => {
        // console.log(key);
        handleAddSplitPathForPath(
          nodeData?.backendData?.parentNodeId,
          nodeData?.branchData?.branchId,
          TaskType.SPLIT,
          key
        );
      }}
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

  // Edit handlers
  const handleEditAction = () => {
    console.log(
      "Edit action clicked for node:",
      props.id,
      "type:",
      nodeData.type
    );
  };

  const handleDuplicateNode = async () => {
    handleDuplicateMutation.mutate({
      nodeType: nodeData.type,
      position: {
        x: nodeData.backendData.appPosition.x + 350,
        y: nodeData.backendData.appPosition.y,
      },
      sourceNodeId: nodeData.backendData._id,
      workflowId: nodeData.backendData.workflowId,
      appType: nodeData.appType as AppTaskType,
    });
  };

  const handleEditCondition = () => {
    console.log("Edit condition clicked for path:", props.id);
  };

  const renamePathMutation = useMutation({
    mutationFn: updatePathNameOrNextNode,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id"],
      });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update path name");
    },
  });

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
    renamePathMutation.mutate({
      branchId: nodeData?.branchData?._id,
      label: label,
      nodeId: nodeData.branchData.parentNodeId,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
      renamePathMutation.mutate({
        branchId: nodeData?.branchData?._id,
        label: label,
        nodeId: nodeData.branchData.parentNodeId,
      });
    }
  };

  const deletePathMutation = useMutation({
    mutationFn: ({ branchId, nodeId }: { branchId: string; nodeId: string }) =>
      deleteBranch({ branchId, nodeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-by-id"] });
    },
    onError: () => {
      toast.error("Error deleting path");
    },
  });

  const handleDeletePath = () => {
    deletePathMutation.mutate({
      nodeId: nodeData?.branchData?.parentNodeId,
      branchId: nodeData.branchData?._id,
    });
  };
  // console.log(nodeData);

  // Handle split deletion - pass nodeData for better context
  const handleSplitDeleteClick = () => {
    console.log(
      "Split delete clicked for node:",
      props.id,
      "nodeData:",
      nodeData
    );
    handleSplitDeletion(props.id, nodeData);
    setSplitDelete(false);
  };

  // Handle node click to open dialogs
  const handleNodeClick = (nodeData?: any) => {
    // console.log(nodeData);

    if (nodeData?.type === "PATH") {
      setOpenDialog("PATH");
    }

    if (nodeData?.appType === "Instructions") {
      setOpenDialog("INSTRUCTION");
    } else if (
      nodeData?.appType !== "Instructions" &&
      nodeData?.type === "APP"
    ) {
      setOpenDialog("APP");
    }
  };

  const closeDialog = () => setOpenDialog(null);

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
            <AddButton
              className="-right-8 top-1/2 -translate-y-1/2"
              nodeData={nodeData}
            />
          )}
        </div>
      );

    case TaskRegistry.APP:
      return (
        <div className="relative">
          {nodeData.appType === "Device Flow" &&
          nodeData.appType !== "Device Flow" &&
          nodeData?.backendData?.isDeviceFlowWithStartParent ? (
            <DeviceFlowDialog data={nodeData}>
              <NodeCard
                className={cn(
                  !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
                  "rounded-xl w-[260px]"
                )}
                nodeId={props.id}
                isSelected={!!props.selected}
              >
                <div className="flex justify-between items-center w-full gap-2 p-2">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <img
                        src={
                          nodeData?.backendData?.template?.image ?? "/logo.png"
                        }
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
                  </div>
                </div>
                <div className="p-2">
                  <Input
                    value={"Create user on deviceflow"}
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
            </DeviceFlowDialog>
          ) : (
            <>
              <SetActionDialog
                onDelete={() => deleteNodeMutation.mutate(props.id)}
                data={nodeData}
                open={openDialog === "APP"}
                setOpen={closeDialog}
              />
              <InstructionDialog
                data={nodeData}
                onDelete={() => {
                  deleteNodeMutation.mutate(props.id);
                }}
                open={openDialog === "INSTRUCTION"}
                setOpen={closeDialog}
              />
              <NodeCard
                className={cn(
                  !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
                  nodeData?.backendData?.isIntegrated === false &&
                    nodeData.appType !== "Device Flow" &&
                    nodeData.appType !== "Instructions" &&
                    "border-red-500 shadow-sm shadow-red-400",
                  "rounded-xl w-[260px] cursor-pointer",
                  "rounded-xl w-[260px] cursor-pointer"
                )}
                nodeId={props.id}
                isSelected={!!props.selected}
                onClick={() => {
                  handleNodeClick(nodeData);
                }}
              >
                <NodeHeader
                  canDuplicate={!hasOutgoingConnection(props.id, nodeData.type)}
                  taskType={nodeData.type}
                  nodeData={nodeData}
                  nodeId={props.id}
                  onEditAction={handleEditAction}
                  onDuplicate={handleDuplicateNode}
                />
                <div className="p-2">
                  {nodeData?.backendData?.isIntegrated === false &&
                  nodeData?.appType !== "Device Flow" &&
                  nodeData?.appType !== "Instructions" ? (
                    <>
                      <Button
                        onClick={() => {
                          setShowConnectModal(true);
                          (e) => e.stopPropagation();
                        }}
                        className="w-full cursor-pointer"
                        variant="outline"
                      >
                        Connect
                      </Button>

                      <ConnectIntegrationFlow
                        data={nodeData?.backendData}
                        setShowConnectModal={setShowConnectModal}
                        showConnectModal={showConnectModal}
                      />
                    </>
                  ) : (
                    <Input
                      value={
                        nodeData?.backendData?.serviceDescription?.length > 28
                          ? `${nodeData?.backendData?.serviceDescription?.slice(
                              0,
                              28
                            )}...`
                          : nodeData?.backendData?.serviceDescription ||
                            "No action selected"
                      }
                      disabled
                      className="text-sm bg-[#00000003] disabled:cursor-auto select-none line-clamp-1 overflow-hidden"
                    />
                  )}
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
            </>
          )}

          {/* AddButton if no outgoing connection */}
          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButton
              className="-right-12 top-1/2 -translate-y-1/2"
              nodeData={nodeData}
            />
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
                handleAddNodeFromHandle(
                  nodeData?.backendData?.parentNodeId,
                  "branch-0",
                  TaskType.PATH
                )
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
                handleAddNodeFromHandle(
                  nodeData?.backendData?.parentNodeId,
                  "branch-1",
                  TaskType.PATH
                )
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
                handleAddNodeFromHandle(
                  nodeData?.backendData?.parentNodeId,
                  "branch-2",
                  TaskType.PATH
                )
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
              functionToBeExecuted={handleSplitDeleteClick}
              title="Are you sure?"
              description="Are you sure you want to delete the node?"
              type="failure"
              successBtnText="Delete"
            >
              <Button
                variant="outline"
                className="absolute hover:bg-white rounded-full px-12 py-1 -bottom-16 left-1/2 -translate-x-1/2 text-[#DC2626] hover:text-[#DC2626] border"
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
          <SetConditionDialog
            onDelete={() => handleDeletePath()}
            parentData={nodeData}
            open={openDialog === "PATH"}
            setOpen={closeDialog}
          />
          <NodeCard
            className={cn(
              !!props.selected && "border-[#0062FF] ring ring-[#D4E4FF]",
              "rounded-[5px] flex items-center justify-between min-w-20 w-full max-w-fit  p-2 bg-blue-50 border-[#0062FF]"
            )}
            nodeId={props.id}
            onClick={() => {
              handleNodeClick(nodeData);
            }}
            isSelected={!!props.selected}
          >
            <div className="text-center cursor-pointer flex items-center">
              {!nodeData?.branchData?.condition && (
                <HugeiconsIcon
                  icon={AlertCircleIcon}
                  className="text-[#F59E0B] size-3.5 mr-1"
                />
              )}
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
                    "disabled:bg-transparent bg-transparent",
                    !rename && "pointer-events-none cursor-move select-none"
                  )}
                />
              ) : (
                <p className="text-xs font-gilroySemiBold text-[#0062FF]">
                  {/* {nodeData.pathName} */}
                  {nodeData.branchData?.label}
                </p>
              )}
            </div>
            <EditPath
              parentData={nodeData}
              type={"set"}
              onEditCondition={handleEditCondition}
              onRename={handleRenamePath}
              onDelete={handleDeletePath}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              >
                <HugeiconsIcon
                  icon={MoreVerticalIcon}
                  size={16}
                  className="text-[#0062FF]"
                />
              </div>
            </EditPath>

            <Handle
              id={getInputHandleId()}
              type="target"
              position={Position.Left}
              className={cn("!bg-transparent !border-none !left-1 !w-0 !h-0")}
            />
            <Handle
              id={getOutputHandleId()}
              type="source"
              position={Position.Right}
              className={cn("!bg-transparent !border-none !right-1 !w-0 !h-0")}
            />
          </NodeCard>

          {!hasOutgoingConnection(props.id, nodeData.type) && (
            <AddButtonForPath
              className="-right-8 top-1/2 -translate-y-1/2"
              nodeData={nodeData}
            />
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
