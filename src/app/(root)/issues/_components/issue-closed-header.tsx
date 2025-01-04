import { Issues } from "@/server/issueActions";
import React from "react";

function IssueClosedHeader({ data }: { data: Issues[] }) {
  const closedCount = data?.filter((item) => item.status === "Closed").length;

  return (
    <div className="flex gap-3 pb-5">
      <h1 className="text-xl pl-6 font-gilroySemiBold">Closed Issues</h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-[#F9F5FF] text-[#6941C6]">
        {closedCount} Issues
      </h1>
    </div>
  );
}

export default IssueClosedHeader;
