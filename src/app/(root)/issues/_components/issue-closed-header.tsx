import { Issues } from "@/server/issueActions";
import React from "react";

function IssueClosedHeader({ data }: { data: Issues[] }) {
  const closedCount = data?.filter((item) => item.status === "Closed").length;

  return (
    <div className="flex gap-3 px-6 py-5">
      <h1 className="text-xl font-medium">Closed Issues</h1>
      <h1 className="px-2 justify-center items-center font-medium flex text-sm rounded-full bg-info-foreground text-info">
        {closedCount} Issues
      </h1>
    </div>
  );
}

export default IssueClosedHeader;
