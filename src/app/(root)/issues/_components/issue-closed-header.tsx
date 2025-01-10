import { IssueResponse, Issues } from "@/server/issueActions";
import React from "react";

function IssueClosedHeader({ data }: { data: IssueResponse | null }) {
  return (
    <div className="flex gap-3 pb-5">
      <h1 className="text-xl pl-6 font-gilroySemiBold">Closed Issues</h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-[#F9F5FF] text-[#6941C6]">
        {data?.total} Issues
      </h1>
    </div>
  );
}

export default IssueClosedHeader;
