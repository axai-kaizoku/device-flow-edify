import { IssueResponse, Issues } from "@/server/issueActions";
import React from "react";

function IssueClosedHeader({ data }: { data: any }) {
  return (
    <div className="flex gap-3 p">
      <h1 className="text-base pl-6 font-gilroyMedium">Closed Tickets</h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-[#F9F5FF] text-[#6941C6]">
        {data?.length} Ticket
      </h1>
    </div>
  );
}

export default IssueClosedHeader;
