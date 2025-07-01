"use client";

import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getSmoothStepPath, useReactFlow } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { useFlowContext } from "../flow-editor";
import { TaskType } from "../types/task";
import { cn } from "@/lib/utils";
import React from "react";
import { EdgeType } from "@/app/(root)/workflows/[id]/_components/types/edge";

export const SplitEdge = (props: EdgeProps & {

  data: {
    type: EdgeType,
    sourceHandle: string,
    canAddPath: boolean,
    isTopOrBottom: boolean
  }
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { handleAddNodeFromHandle } = useFlowContext();
  const { getEdges } = useReactFlow();

  const handleAddPathNode = () => {
    if (!props.source || !props.data?.sourceHandle) return;

    // Use the sourceHandle from the edge data to create the PATH node
    handleAddNodeFromHandle(props.source, props.data.sourceHandle, TaskType.PATH);
  };


  // Check if this is the first edge from this specific handle
  const isFirstEdgeFromHandle = () => {
    if (!props.source || !props.data?.sourceHandle) return false;

    const allEdges = getEdges();
    const edgesFromSameHandle = allEdges
      .filter((edge) => edge.source === props.source && edge.sourceHandle === props.data?.sourceHandle)
      .sort((a, b) => a.id.localeCompare(b.id)); // Sort by ID to ensure consistent ordering

    // Return true if this is the first edge from this handle
    return edgesFromSameHandle[0]?.id === props.id;
  };

  const showPlusButton = isFirstEdgeFromHandle();

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
      {showPlusButton && (<EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all"
          }}
          className="flex gap-1"
        >
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "w-6 h-6 p-0 border-none hover:text-[#0062FF] text-[#0062FF] bg-[#EDF4FF] rounded-full hover:bg-blue-50"
            )}
            onClick={handleAddPathNode}
            type={"button"}
          >
            <PlusIcon size={12} />
          </Button>
        </div>
      </EdgeLabelRenderer>)}
    </>
  );
};
