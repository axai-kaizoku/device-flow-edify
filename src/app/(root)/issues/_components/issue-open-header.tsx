import { Issues } from "@/server/issueActions";
import React from "react";

function OpenHeader({ data }: { data: Issues[] }) {
  const criticalCount = data?.filter(
    (item) => item.priority === "Critical" && item.status === "Open"
  ).length;
  const mediumCount = data?.filter(
    (item) => item.priority === "Medium" && item.status === "Open"
  ).length;
  const lowCount = data?.filter(
    (item) => item.priority === "Low" && item.status === "Open"
  ).length;
  return (
    <div className="flex gap-3 px-6 py-5">
      <h1 className="text-xl font-gilroyMedium">Open Issues</h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-alert-foreground text-failure">
        {criticalCount} Critical
      </h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-[#FFFACB] text-[#FF8000]">
        {mediumCount} Medium
      </h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-success-foreground text-success-second">
        {lowCount} Low
      </h1>
    </div>
  );
}

export default OpenHeader;
