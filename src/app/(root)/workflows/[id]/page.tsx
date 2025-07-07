import { Metadata } from "next";
import { Suspense } from "react";

import { WorkflowByIdMain } from "./main";

export const metadata: Metadata = {
  title: "Workflows",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <WorkflowByIdMain workflowId={id} />
    </Suspense>
  );
}
