"use client";

import {
  Background,
  BackgroundVariant,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { SplitEdge } from "@/app/(root)/workflows/[id]/_components/edges/split-edge";
import { EdgeType } from "@/app/(root)/workflows/[id]/_components/types/edge";
import { WorkflowTreeResponse } from "@/server/workflowActions/workflow";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { NormalEdge } from "./edges/normal-edge";
import { NodeComponent } from "./nodes/node-component";
import { AppNode } from "./types/app-node";
import { TaskType } from "./types/task";
import { transformBackendToReactFlow } from "./utils/data-transformer";
import { type BackendWorkflowResponse } from "./utils/types";

import {
  updateConnectorPosition,
  updateNodePosition,
  updatePathPosition,
} from "@/server/workflowActions/workflowById/workflowPositions";
import { useFlowActions } from "./hooks/use-flow-actions";

interface FlowContextType {
  handleAddNode: (
    sourceNodeId: string,
    nodeType: TaskType,
    appType?: string
  ) => void;
  handleAddNodeForPath: (
    sourceNodeId: string,
    branchId: string,
    nodeType: TaskType,
    appType?: string
  ) => void;
  handleAddSplitPath: (sourceNodeId: string) => void;
  handleAddSplitPathForPath: (
    sourceNodeId: string,
    branchId: string,
    nodeType: TaskType,
    splitAppName: string
  ) => void;
  handleAddNodeFromHandle: (
    sourceNodeId: string,
    handleId: string,
    nodeType: TaskType,
    appType?: string
  ) => void;
  hasOutgoingConnection: (nodeId: string, nodeType: TaskType) => boolean;
  getConnectionCount: (nodeId: string) => number;
  hasConnectionFromHandle: (nodeId: string, handleId: string) => boolean;
}

const FlowContext = createContext<FlowContextType | null>(null);

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlowContext must be used within FlowContext.Provider");
  }
  return context;
};

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  [EdgeType.NORMAL]: NormalEdge,
  [EdgeType.SPLIT]: SplitEdge,
};

const snapGrid: [number, number] = [30, 30];
const fitViewOptions = { padding: 1 };

export const FlowEditor = ({
  workflow,
}: {
  workflow: WorkflowTreeResponse;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  // const queryClient = useQueryClient();
  const { setViewport } = useReactFlow();

  const {
    handleAddNode,
    handleAddNodeForPath,
    handleAddSplitPath,
    handleAddSplitPathForPath,
    handleAddNodeFromHandle,
  } = useFlowActions(workflow, nodes);

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

  // Handle node drag end - update positions via API
  const onNodeDragStop = useCallback(
    async (event: React.MouseEvent, node: AppNode): Promise<void> => {
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
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid
          snapGrid={snapGrid}
          // fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={{ animated: false, deletable: false }}
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
