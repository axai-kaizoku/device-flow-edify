"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TaskType, AppTaskType } from "../types/task";
import {
  addNodeAfterNode,
  addNodeAfterPath,
  addSplitPathAfterPath,
  addNodeFromSplitPath,
} from "../utils/backend-actions";
import { createDoubleSplitPath } from "@/server/workflowActions/workflowById/workflowPaths";
import type { AppNode } from "../types/app-node";
import { useNodePositions } from "./use-node-positions";

export const useFlowActions = (workflow: any, nodes: AppNode[]) => {
  const queryClient = useQueryClient();
  const {
    getPositionForNewNode,
    getPositionForPathNode,
    getPositionForSplitPath,
    getPositionForHandleNode,
  } = useNodePositions(nodes);

  const invalidateWorkflow = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["workflow-by-id", workflow.data.workflow._id],
    });
  }, [queryClient, workflow.data.workflow._id]);

  const handleAddNode = useCallback(
    async (sourceNodeId: string, nodeType: TaskType, appType?: string) => {
      if (!workflow?.data) return;

      try {
        const newPosition = getPositionForNewNode(sourceNodeId);

        await addNodeAfterNode({
          sourceNodeId,
          nodeType,
          appType: appType as AppTaskType,
          position: newPosition,
          workflowId: workflow.data.workflow._id,
        });

        await invalidateWorkflow();
      } catch (error) {
        console.error("Error adding node:", error);
      }
    },
    [workflow, getPositionForNewNode, invalidateWorkflow]
  );

  const handleAddNodeForPath = useCallback(
    async (
      sourceNodeId: string,
      branchId: string,
      nodeType: TaskType,
      appType?: string
    ) => {
      if (!workflow?.data) return;

      try {
        // Find the path node to get its position
        const pathNode = nodes.find((n) => n.data.branchData?._id === branchId);
        const newPosition = pathNode
          ? getPositionForPathNode(pathNode.id)
          : getPositionForNewNode(sourceNodeId);

        await addNodeAfterPath({
          sourceNodeId,
          branchId,
          nodeType,
          appType: appType as AppTaskType,
          position: newPosition,
          workflowId: workflow.data.workflow._id,
        });

        await invalidateWorkflow();
      } catch (error) {
        console.error("Error adding node for path:", error);
      }
    },
    [
      workflow,
      nodes,
      getPositionForPathNode,
      getPositionForNewNode,
      invalidateWorkflow,
    ]
  );

  const handleAddSplitPath = useCallback(
    async (sourceNodeId: string) => {
      if (!workflow?.data) return;

      try {
        const { splitPosition, pathAPosition, pathBPosition } =
          getPositionForSplitPath(sourceNodeId);

        await createDoubleSplitPath({
          branchPositions: [pathAPosition, pathBPosition],
          connectorPosition: splitPosition,
          prevNodeId: sourceNodeId,
        });

        await invalidateWorkflow();
      } catch (error) {
        console.error("Error adding split path:", error);
      }
    },
    [workflow, getPositionForSplitPath, invalidateWorkflow]
  );

  const handleAddSplitPathForPath = useCallback(
    async (
      sourceNodeId: string,
      branchId: string,
      nodeType: TaskType,
      splitAppName: string
    ) => {
      if (!workflow?.data) return;

      try {
        // Find the path node to get its position
        const pathNode = nodes.find((n) => n.data.branchData?._id === branchId);
        const connectorPosition = pathNode
          ? getPositionForPathNode(pathNode.id, { x: 300, y: -10 })
          : getPositionForNewNode(sourceNodeId, { x: 300, y: -10 });

        await addSplitPathAfterPath({
          sourceNodeId,
          branchId,
          nodeType,
          appType: splitAppName as AppTaskType,
          position: connectorPosition,
          workflowId: workflow.data.workflow._id,
        });

        await invalidateWorkflow();
      } catch (error) {
        console.error("Error adding split path for path:", error);
      }
    },
    [
      workflow,
      nodes,
      getPositionForPathNode,
      getPositionForNewNode,
      invalidateWorkflow,
    ]
  );

  const handleAddNodeFromHandle = useCallback(
    async (
      sourceNodeId: string,
      handleId: string,
      nodeType: TaskType,
      appType?: string
    ) => {
      if (!workflow?.data) return;

      try {
        // Count existing connections for this handle
        const existingConnections = nodes.filter(
          (node) =>
            node.data.branchData?.parentNodeId === sourceNodeId.split("-")[0] &&
            node.data.branchData?.branchDirection ===
              (handleId === "branch-0"
                ? "Top"
                : handleId === "branch-2"
                ? "Bottom"
                : "Right")
        ).length;

        const newPosition = getPositionForHandleNode(
          sourceNodeId,
          handleId,
          existingConnections
        );

        let branchDirection: "Top" | "Bottom" | "Right";
        switch (handleId) {
          case "branch-0":
            branchDirection = "Top";
            break;
          case "branch-2":
            branchDirection = "Bottom";
            break;
          default:
            branchDirection = "Right";
        }

        await addNodeFromSplitPath({
          position: newPosition,
          sourceNodeId: sourceNodeId.split("-")[0], // Get the original node ID
          branchDirection,
        });

        await invalidateWorkflow();
      } catch (error) {
        console.error("Error adding node from handle:", error);
      }
    },
    [workflow, nodes, getPositionForHandleNode, invalidateWorkflow]
  );

  return {
    handleAddNode,
    handleAddNodeForPath,
    handleAddSplitPath,
    handleAddSplitPathForPath,
    handleAddNodeFromHandle,
  };
};
