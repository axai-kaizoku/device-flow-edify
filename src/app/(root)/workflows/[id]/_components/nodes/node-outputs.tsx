import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { TaskParam, TaskParamType } from "../types/task";
import { NodeParamField } from "./node-param-field";

export const NodeOutputs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export const NodeOutput = ({
  output,
  nodeId,
}: {
  output: TaskParam;
  nodeId: string;
}) => {
  switch (output.type) {
    case TaskParamType.START:
      return <div className="flex justify-end relative p-3 w-full">null</div>;
    case TaskParamType.INTEGRATION_APPS:
      return (
        <div className="flex justify-end relative p-3 w-full">
          <NodeParamField param={output} nodeId={nodeId} />
          <Handle
            id={output.name}
            type="target"
            position={Position.Right}
            className={cn(
              "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4"
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
    <div className="flex justify-end relative p-3 w-full">
      {/* <pre>{JSON.stringify(output, null, 4)}</pre> */}
      <NodeParamField param={output} nodeId={nodeId} />
      <Handle
        id={output.name}
        type="target"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4"
        )}
      />
    </div>
  );
};
