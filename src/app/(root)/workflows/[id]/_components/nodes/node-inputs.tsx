import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { TaskParam, TaskParamType } from "../types/task";
import { NodeParamField } from "./node-param-field";

export const NodeInputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  switch (input.type) {
    case TaskParamType.START:
      return (
        <div className="flex justify-start relative p-3 w-full">
          <NodeParamField param={input} nodeId={nodeId} />
          <Handle
            id={input.name}
            type="source"
            position={Position.Right}
            className={cn(
              "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4"
            )}
          />
        </div>
      );
    case TaskParamType.INTEGRATION_APPS:
      return (
        <div className="flex justify-start relative p-3 w-full">
          <NodeParamField param={input} nodeId={nodeId} />
          <Handle
            id={input.name}
            type="source"
            position={Position.Left}
            className={cn(
              "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
            )}
          />
        </div>
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }

  return (
    <div className="flex justify-start relative p-3 w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      <Handle
        id={input.name}
        type="source"
        position={Position.Left}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
        )}
      />
    </div>
  );
};
