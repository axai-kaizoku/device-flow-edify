import { WorkflowTreeResponse } from "@/server/workflowActions/workflow";
import { FlowEditor } from "./flow-editor";

export const Editor = ({ workflow }: { workflow: WorkflowTreeResponse }) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <section className="flex h-full overflow-auto">
        <FlowEditor workflow={workflow} />
      </section>
    </div>
  );
};
