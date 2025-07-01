import { FlowEditor } from "./flow-editor";
import { Workflow } from "./types/types";

export const Editor = ({ workflow }: { workflow: Workflow }) => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <section className="flex h-full overflow-auto">
        <FlowEditor workflow={workflow} />
      </section>
    </div>
  );
};
