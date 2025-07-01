"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { Workflow } from "./types/types";

import "@xyflow/react/dist/style.css";

import { CreateFlowNode } from "./workflow/create-node";
import { AppTaskType, TaskType } from "./types/task";
import { NodeComponent } from "./nodes/node-component";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { AppNode } from "./types/app-node";
import { TaskRegistry } from "./workflow/task/registry";
import { EdgeType } from "@/app/(root)/workflows/[id]/_components/types/edge";
import { NormalEdge } from "./edges/normal-edge";
import { SplitEdge } from "@/app/(root)/workflows/[id]/_components/edges/split-edge";
import { CreateFlowEdge } from "@/app/(root)/workflows/[id]/_components/workflow/create-edge";
import { useSaveWorkflowMutation } from "@/app/(root)/workflows/_components/test-run";

interface FlowContextType {
  handleAddNode: (
    sourceNodeId: string,
    nodeType: TaskType,
    appType?: string
  ) => void;
  handleAddSplitPath: (sourceNodeId: string) => void;
  handleDeleteNode: (nodeId: string) => void;
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
  // default: PrimaryEdge
  [EdgeType.NORMAL]: NormalEdge,
  [EdgeType.SPLIT]: SplitEdge,
};

const snapGrid: [number, number] = [30, 30];
const fitViewOptions = { padding: 1 };

export const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, toObject, screenToFlowPosition } = useReactFlow();
  const saveMutation = useSaveWorkflowMutation();

  const getHandleIds = (nodeType: TaskType) => {
    const task = TaskRegistry[nodeType];
    return {
      input: task?.inputs?.[0]?.name || "input",
      output: task?.outputs?.[0]?.name || "output",
    };
  };

  const hasOutgoingConnection = useCallback(
    (nodeId: string, nodeType: TaskType) => {
      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

      // Split nodes can have multiple connections, so we don't hide the button
      if (nodeType === TaskType.SPLIT) {
        return false; // Always show add button for split nodes
      }

      // For other nodes, hide button if there's any outgoing connection
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

  // Get all downstream nodes and edges from a given node
  const getDownstreamNodesAndEdges = useCallback(
    (nodeId: string): { nodeIds: string[]; edgeIds: string[] } => {
      const visitedNodes = new Set<string>();
      const nodeIds: string[] = [];
      const edgeIds: string[] = [];

      const traverse = (currentNodeId: string) => {
        if (visitedNodes.has(currentNodeId)) return;
        visitedNodes.add(currentNodeId);

        // Find all outgoing edges from current node
        const outgoingEdges = edges.filter(
          (edge) => edge.source === currentNodeId
        );

        outgoingEdges.forEach((edge) => {
          edgeIds.push(edge.id);
          nodeIds.push(edge.target);
          traverse(edge.target); // Recursively traverse downstream
        });
      };

      traverse(nodeId);
      return { nodeIds, edgeIds };
    },
    [edges]
  );

  // Handle cascading delete
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      console.log("Deleting node:", nodeId);

      // Get all downstream nodes and edges
      const { nodeIds: downstreamNodeIds, edgeIds: downstreamEdgeIds } =
        getDownstreamNodesAndEdges(nodeId);

      // Get all edges connected to the node being deleted (incoming and outgoing)
      const connectedEdges = edges.filter(
        (edge) => edge.source === nodeId || edge.target === nodeId
      );
      const connectedEdgeIds = connectedEdges.map((edge) => edge.id);

      // Combine all edge IDs to delete
      const allEdgeIdsToDelete = [
        ...new Set([...downstreamEdgeIds, ...connectedEdgeIds]),
      ];

      // Combine all node IDs to delete (including the original node)
      const allNodeIdsToDelete = [...new Set([nodeId, ...downstreamNodeIds])];

      console.log("Deleting nodes:", allNodeIdsToDelete);
      console.log("Deleting edges:", allEdgeIdsToDelete);

      // Remove nodes
      setNodes((nds) =>
        nds.filter((node) => !allNodeIdsToDelete.includes(node.id))
      );

      // Remove edges
      setEdges((eds) =>
        eds.filter((edge) => !allEdgeIdsToDelete.includes(edge.id))
      );
    },
    [edges, setNodes, setEdges, getDownstreamNodesAndEdges]
  );

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes ?? []);
      setEdges(flow.edges ?? []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (error) {}
  }, [workflow.definition]);

  // Handle adding new node from specific handle
  const handleAddNodeFromHandle = useCallback(
    (
      sourceNodeId: string,
      handleId: string,
      nodeType: TaskType,
      appType?: string
    ) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) return;

      // Check if this specific handle already has a connection
      // if (hasConnectionFromHandle(sourceNodeId, handleId)) {
      //   console.log("Handle already has a connection");
      //   return;
      // }

      // Calculate position based on handle position
      let newPosition = {
        x: sourceNode.position.x + 300,
        y: sourceNode.position.y,
      };

      // Adjust position based on handle for split nodes
      if (sourceNode.data.type === TaskType.SPLIT) {
        switch (handleId) {
          case "branch-0": // top
            const existingTopConnections = edges.filter(
              (edge) =>
                edge.source === sourceNodeId && edge.sourceHandle === "branch-0"
            ).length;
            newPosition = {
              x: sourceNode.position.x + 200,
              y: sourceNode.position.y - 150 - existingTopConnections * 100,
            };
            break;
          case "branch-1": // right
            newPosition = {
              x: sourceNode.position.x + 300,
              y: sourceNode.position.y,
            };
            break;
          case "branch-2": // bottom
            const existingBottomConnections = edges.filter(
              (edge) =>
                edge.source === sourceNodeId && edge.sourceHandle === "branch-2"
            ).length;
            newPosition = {
              x: sourceNode.position.x + 200,
              y: sourceNode.position.y + 150 + existingBottomConnections * 100,
            };
            break;
        }
      }

      const newNode = CreateFlowNode({
        nodeType,
        position: newPosition,
        pathName: "path absc",
      });

      // Add the new node
      setNodes((nds) => [...nds, newNode]);

      // Get proper handle IDs
      const targetHandleIds = getHandleIds(nodeType);

      // Automatically create edge with correct handle IDs
      const newEdge = CreateFlowEdge({
        source: sourceNodeId,
        target: newNode.id,
        sourceHandle: handleId,
        targetHandle: targetHandleIds.input,
        edgeType: EdgeType.NORMAL,
      });

      setEdges((eds) => [...eds, newEdge]);
    },
    [nodes, setNodes, setEdges, edges]
  );

  // Handle adding new node with automatic edge creation
  const handleAddNode = useCallback(
    (sourceNodeId: string, nodeType: TaskType, appType?: string) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) return;

      const sourceNodeType = sourceNode.data.type;
      if (
        sourceNodeType !== TaskType.SPLIT &&
        hasOutgoingConnection(sourceNodeId, sourceNodeType)
      ) {
        console.log("Node already has a connection and cannot have more");
        return;
      }

      // Calculate position for new node
      const newPosition = {
        x: sourceNode.position.x + 300,
        y: sourceNode.position.y,
      };

      const newNode = CreateFlowNode({
        nodeType,
        position: newPosition,
        appType: appType as AppTaskType,
      });

      // Add the new node
      setNodes((nds) => [...nds, newNode]);

      const sourceHandleIds = getHandleIds(sourceNode.data.type);
      const targetHandleIds = getHandleIds(nodeType);

      // For split nodes, use branch handles
      let sourceHandle = sourceHandleIds.output;
      if (sourceNodeType === TaskType.SPLIT) {
        const connectionCount = getConnectionCount(sourceNodeId);
        sourceHandle = `branch-${connectionCount}`;
      }

      // Automatically create edge
      const newEdge = CreateFlowEdge({
        source: sourceNodeId,
        target: newNode.id,
        sourceHandle: sourceHandle,
        targetHandle: targetHandleIds.input,
        edgeType: EdgeType.NORMAL,
      });

      setEdges((eds) => [...eds, newEdge]);
    },
    [nodes, setNodes, setEdges, hasOutgoingConnection, getConnectionCount]
  );

  // Handle split path creation
  const handleAddSplitPath = useCallback(
    (sourceNodeId: string) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) return;

      const sourceNodeType = sourceNode.data.type;
      if (
        sourceNodeType !== TaskType.SPLIT &&
        hasOutgoingConnection(sourceNodeId, sourceNodeType)
      ) {
        console.log("Node already has a connection and cannot have more");
        return;
      }

      // Create split node
      // main split box
      const splitPosition = {
        x: sourceNode.position.x + 300,
        y: sourceNode.position.y - 10,
      };

      const splitNode = CreateFlowNode({
        nodeType: TaskType.SPLIT,
        position: splitPosition,
      });

      // Create two path nodes
      const pathANode = CreateFlowNode({
        nodeType: TaskType.PATH,
        position: {
          x: splitPosition.x + 100,
          y: splitPosition.y - 150,
        },
        pathName: "path a",
      });

      const pathBNode = CreateFlowNode({
        nodeType: TaskType.PATH,
        position: {
          x: splitPosition.x + 100,
          y: splitPosition.y + 170,
        },
        pathName: "path b",
      });

      // Add all nodes
      setNodes((nds) => [...nds, splitNode, pathANode, pathBNode]);

      const sourceHandleIds = getHandleIds(sourceNode.data.type);
      const splitHandleIds = getHandleIds(TaskType.SPLIT);
      const pathHandleIds = getHandleIds(TaskType.PATH);

      // Create edges
      const edges = [
        CreateFlowEdge({
          source: sourceNodeId,
          target: splitNode.id,
          sourceHandle: sourceHandleIds.output,
          targetHandle: splitHandleIds.input,
          edgeType: EdgeType.NORMAL,
        }),
        CreateFlowEdge({
          source: splitNode.id,
          target: pathANode.id,
          sourceHandle: "branch-0",
          targetHandle: pathHandleIds.input,
          edgeType: EdgeType.SPLIT,
        }),
        CreateFlowEdge({
          source: splitNode.id,
          target: pathBNode.id,
          sourceHandle: "branch-2",
          targetHandle: pathHandleIds.input,
          edgeType: EdgeType.SPLIT,
        }),
      ];

      setEdges((eds) => [...eds, ...edges]);
    },
    [nodes, setNodes, setEdges, hasOutgoingConnection]
  );

  return (
    <main className="h-full w-full">
      <FlowContext.Provider
        value={{
          handleAddNode,
          handleAddSplitPath,
          getConnectionCount,
          hasOutgoingConnection,
          handleAddNodeFromHandle,
          hasConnectionFromHandle,
          handleDeleteNode,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            onNodesChange(changes);
            saveMutation.mutate({
              id: workflow._id,
              definition: JSON.stringify(toObject()),
            });
          }}
          onEdgesChange={(changes) => {
            onEdgesChange(changes);
            saveMutation.mutate({
              id: workflow._id,
              definition: JSON.stringify(toObject()),
            });
          }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid
          snapGrid={snapGrid}
          // fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={{ animated: false, deletable: false }}
        >
          <Controls position="top-left" fitViewOptions={fitViewOptions} />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </FlowContext.Provider>
    </main>
  );
};
