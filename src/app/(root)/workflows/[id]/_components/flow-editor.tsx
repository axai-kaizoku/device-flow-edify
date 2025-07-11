"use client";

import type React from "react";

import { SplitEdge } from "@/app/(root)/workflows/[id]/_components/edges/split-edge";
import { EdgeType } from "@/app/(root)/workflows/[id]/_components/types/edge";
import { type WorkflowTreeResponse } from "@/server/workflowActions/workflow";
import {
  updateConnectorPosition,
  updateNodePosition,
  updatePathPosition,
} from "@/server/workflowActions/workflowById/workflowPositions";
import {
  Background,
  BackgroundVariant,
  type Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo } from "react";
import { NormalEdge } from "./edges/normal-edge";
import { useFlowActions } from "./hooks/use-flow-actions";
import { FlowContext } from "./hooks/use-flow-context";
import { NodeComponent } from "./nodes/node-component";
import type { AppNode } from "./types/app-node";
import { TaskType } from "./types/task";
import { transformBackendToReactFlow } from "./utils/data-transformer";
import type { BackendWorkflowResponse } from "./utils/types";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  [EdgeType.NORMAL]: NormalEdge,
  [EdgeType.SPLIT]: SplitEdge,
};

const snapGrid: [number, number] = [30, 30];
const proOptions = { hideAttribution: true };
const fitViewOptions = { padding: 1 };
const defaultEdgeOptions = { animated: false, deletable: false };

interface FlowEditorProps {
  workflow: WorkflowTreeResponse;
  searchResults: string[];
}

export const FlowEditor = ({ workflow, searchResults }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Function to change status to draft if currently published

  const {
    handleAddNode,
    handleAddNodeForPath,
    handleAddSplitPath,
    handleAddSplitPathForPath,
    handleAddNodeFromHandle,
  } = useFlowActions(workflow, nodes);

  const { fitView } = useReactFlow();

  const { transformedNodes, transformedEdges } = useMemo(() => {
    if (!workflow?.data) return { transformedNodes: [], transformedEdges: [] };
    try {
      const backendData = workflow.data;
      const { nodes: transformedNodes, edges: transformedEdges } =
        transformBackendToReactFlow(
          backendData as unknown as BackendWorkflowResponse
        );
      return { transformedNodes, transformedEdges };
    } catch (error) {
      console.error("Error transforming workflow data:", error);
      return { transformedNodes: [], transformedEdges: [] };
    }
  }, [workflow?.data]);

  const highlightedNodes = useMemo(() => {
    return transformedNodes.map((node) => {
      const isHighlighted = searchResults.includes(node.id);
      return {
        ...node,
        data: {
          ...node.data,
          isHighlighted,
        },
        style: {
          ...node.style,
          ...(isHighlighted && {
            border: "2px solid #22C55E", // green-500
            background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
            borderRadius: "12px",
          }),
        },
      };
    });
  }, [transformedNodes, searchResults]);

  // Update the useEffect to use highlightedNodes
  useEffect(() => {
    if (!transformedNodes?.length) return;
    // If there's an active search, zoom to matched nodes
    if (searchResults?.length > 0) {
      const matchedNodes = transformedNodes.filter((node) =>
        searchResults.includes(node.id)
      );
      if (matchedNodes.length > 0) {
        fitView({ nodes: matchedNodes, padding: 0.7, duration: 500 });
      }
    } else {
      fitView({ nodes: transformedNodes, padding: 0.7, duration: 500 });
    }
    setNodes(highlightedNodes);
    setEdges(transformedEdges as unknown as Edge[]);
  }, [highlightedNodes, transformedEdges, setNodes, setEdges, fitView]);

  // Handle node drag end - update positions via API and change status to draft
  const onNodeDragStop = useCallback(
    async (event: React.MouseEvent, node: AppNode): Promise<void> => {
      // Change status to draft when node is moved

      const nodeData = node.data;
      try {
        switch (nodeData.type) {
          case TaskType.APP:
          case TaskType.START:
          case TaskType.INSTRUCTION:
            // Regular node position update
            await updateNodePosition({
              nodeId: node.id,
              position: node.position,
            });
            break;
          case TaskType.SPLIT:
            // Split node - update connector position
            // Get the parent node ID from splitData
            const parentNodeId =
              nodeData.splitData?._id || nodeData.backendData?.parentNodeId;
            if (parentNodeId) {
              await updateConnectorPosition({
                nodeId: parentNodeId,
                connectorPosition: node.position,
              });
            }
            break;
          case TaskType.PATH:
            // Path node - update branch position
            const branchData = nodeData.branchData;
            const pathParentNodeId =
              branchData?.parentNodeId || nodeData.backendData?.parentNodeId;
            const branchId = branchData?._id;
            if (pathParentNodeId && branchId) {
              await updatePathPosition({
                nodeId: pathParentNodeId,
                branchId: branchId,
                branchPosition: node?.position,
              });
            }
            break;
          default:
            console.warn(
              "Unknown node type for position update:",
              nodeData.type
            );
        }
      } catch (error) {
        console.error("Error updating node position:", error);
        // Optionally show a toast notification here
      }
    },
    []
  );

  const hasOutgoingConnection = useCallback(
    (nodeId: string, nodeType: TaskType) => {
      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
      if (nodeType === TaskType.SPLIT) {
        return false; // Always show add button for split nodes
      }
      return outgoingEdges.length > 0;
    },
    [edges]
  );

  // Check if specific handle has connection
  const hasConnectionFromHandle = useCallback(
    (nodeId: string, handleId: string) => {
      return edges.some(
        (edge) => edge.source === nodeId && edge.sourceHandle === handleId
      );
    },
    [edges]
  );

  // Get connection count for a node
  const getConnectionCount = useCallback(
    (nodeId: string) => {
      return edges.filter((edge) => edge.source === nodeId).length;
    },
    [edges]
  );

  const workflowData = useMemo(() => {
    return {
      workflowId: workflow?.data?.workflow?._id,
      status: workflow?.data?.workflow?.status,
    };
  }, [workflow]);

  useEffect(() => {
    setNodes(transformedNodes);
    setEdges(transformedEdges as unknown as Edge[]);
  }, [transformedNodes, transformedEdges, setNodes, setEdges]);

  return (
    <main className="h-full w-full">
      <FlowContext.Provider
        value={{
          handleAddNode,
          handleAddNodeForPath,
          handleAddSplitPath,
          handleAddSplitPathForPath,
          getConnectionCount,
          hasOutgoingConnection,
          handleAddNodeFromHandle,
          hasConnectionFromHandle,
          searchResults,
          workflowData,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          proOptions={proOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid
          snapGrid={snapGrid}
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          selectNodesOnDrag={false}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </FlowContext.Provider>
    </main>
  );
};
