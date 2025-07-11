"use client";

import { BaseEdge, type EdgeProps, getSmoothStepPath } from "@xyflow/react";

export const NormalEdge = (props: EdgeProps) => {
  const [edgePath] = getSmoothStepPath(props);
  console.log(props, "@EDGE");
  return (
    <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
  );
};
