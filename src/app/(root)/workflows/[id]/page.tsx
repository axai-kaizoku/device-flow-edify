import { CombinedContainer } from "@/components/container/container";
import { ReactFlowProvider } from "@xyflow/react";
import { Metadata } from "next";
import { Suspense } from "react";
import { fetchWorkflowById } from "./_components/api";
import { Editor } from "./_components/editor";
import { Workflow } from "./_components/types/types";

import WorkflowHeader from "./_components/workflow-header";

export const metadata: Metadata = {
  title: "Workflows",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const workflow: Workflow = await fetchWorkflowById(id);

  if (!workflow) return <p>Workflow not found :(</p>;

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <ReactFlowProvider>
        <CombinedContainer>
          <section className="w-full h-full  ">
            <WorkflowHeader workflow={workflow} />
            <div className="border-b border-l border-r rounded-[10px] rounded-t-none h-[75vh]">
              <Editor workflow={workflow} />
            </div>
          </section>
        </CombinedContainer>
      </ReactFlowProvider>
    </Suspense>
  );
}
