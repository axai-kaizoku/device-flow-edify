import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { AppNode } from "../types/app-node";
import { TaskParam, TaskParamType } from "../types/task";
import { StringParam } from "./params/string-param";
import { IntegrationAppParam } from "./params/integration-app-param";

export const NodeParamField = ({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data?.inputs?.[param.name];

  console.log("@value", value);

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data?.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, node?.data?.inputs, nodeId]
  );

  switch (param.type) {
    case TaskParamType.START:
      return <div>Start</div>;
    case TaskParamType.INTEGRATION_APPS:
      return (
        <IntegrationAppParam
          param={param}
          updateNodeParamValue={updateNodeParamValue}
          value={""}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
  // return <div>{param.type}</div>;
};
