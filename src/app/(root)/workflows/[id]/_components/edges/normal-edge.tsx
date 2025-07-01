"use client";

import { BaseEdge, type EdgeProps, getSmoothStepPath } from "@xyflow/react";

export const NormalEdge = (props: EdgeProps) => {
  const [edgePath] = getSmoothStepPath(props);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
    </>
  );
};
