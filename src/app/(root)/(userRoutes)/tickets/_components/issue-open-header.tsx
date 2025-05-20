import { IssueResponse } from "@/server/issueActions";

function OpenHeader({
  countIssues: data,
}: {
  countIssues: any;
}) {
  const criticalCount =
    data?.filter(
      (item) => item.severity === "Critical" && !item?.closedAt 
    ).length || 0;

  const mediumCount =
    data?.filter(
      (item) => item.severity === "Medium" && !item?.closedAt 
    ).length || 0;

  const lowCount =
    data?.filter(
      (item) => item.severity === "Low" && !item?.closedAt 
    ).length || 0;

  return (
    <div className="flex gap-3">
      <h1 className="text-base pl-6 font-gilroyMedium">Open Tickets</h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-alert-foreground text-failure">
        {criticalCount} Critical
      </h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-[#FFFACB] text-[#FF8000]">
        {mediumCount} Medium
      </h1>
      <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-success-foreground text-success-second">
        {lowCount} Low
      </h1>
    </div>
  );
}

export default OpenHeader;
