"use client";

import { useCallback } from "react";
import type { AppNode } from "../types/app-node";

export const useNodePositions = (nodes: AppNode[]) => {
  // Get position for adding node after another node
  const getPositionForNewNode = useCallback(
    (sourceNodeId: string, offset = { x: 300, y: 0 }) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) return { x: 0, y: 0 };

      // Use the actual visual position from the node
      return {
        x: sourceNode.position.x + offset.x,
        y: sourceNode.position.y + offset.y,
      };
    },
    [nodes]
  );

  // Get position for adding node after a path
  const getPositionForPathNode = useCallback(
    (pathNodeId: string, offset = { x: 300, y: 0 }) => {
      const pathNode = nodes.find((n) => n.id === pathNodeId);
      if (!pathNode) return { x: 0, y: 0 };

      // Use the path's actual position
      return {
        x: pathNode.position.x + offset.x,
        y: pathNode.position.y + offset.y,
      };
    },
    [nodes]
  );

  // Get position for split path creation
  const getPositionForSplitPath = useCallback(
    (sourceNodeId: string) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) {
        return {
          splitPosition: { x: 0, y: 0 },
          pathAPosition: { x: 0, y: 0 },
          pathBPosition: { x: 0, y: 0 },
        };
      }

      const splitPosition = {
        x: sourceNode.position.x + 350,
        y: sourceNode.position.y + 40,
      };

      return {
        splitPosition,
        pathAPosition: {
          x: splitPosition.x + 100,
          y: splitPosition.y - 150,
        },
        pathBPosition: {
          x: splitPosition.x + 100,
          y: splitPosition.y + 170,
        },
      };
    },
    [nodes]
  );

  // Get position for handle-based node creation
  const getPositionForHandleNode = useCallback(
    (sourceNodeId: string, handleId: string, existingConnections = 0) => {
      const sourceNode = nodes.find((n) => n.id === sourceNodeId);
      if (!sourceNode) return { x: 0, y: 0 };

      const basePosition = sourceNode.position;

      switch (handleId) {
        case "branch-0": // top
          return {
            x: basePosition.x + 340,
            y: basePosition.y - 140 - existingConnections * 100,
          };
        case "branch-1": // right
          return {
            x: basePosition.x + 400,
            y: basePosition.y - 100,
          };
        case "branch-2": // bottom
          return {
            x: basePosition.x + 340,
            y: basePosition.y + 90 + existingConnections * 100,
          };
        default:
          return {
            x: basePosition.x + 300,
            y: basePosition.y,
          };
      }
    },
    [nodes]
  );

  return {
    getPositionForNewNode,
    getPositionForPathNode,
    getPositionForSplitPath,
    getPositionForHandleNode,
  };
};
