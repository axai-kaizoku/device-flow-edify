import { IssueResponse } from "@/server/issueActions";

function OpenHeader({
  countIssues: data,
}: {
  countIssues: IssueResponse | null;
}) {
  const criticalCount =
    data?.issues.filter(
      (item) => item.priority === "Critical" && item.status === "Open"
    ).length || 0;

  const mediumCount =
    data?.issues.filter(
      (item) => item.priority === "Medium" && item.status === "Open"
    ).length || 0;

  const lowCount =
    data?.issues.filter(
      (item) => item.priority === "Low" && item.status === "Open"
    ).length || 0;

  return (
    <div className="flex gap-3">
      <h1 className="text-xl pl-6 font-gilroySemiBold">Open Issues</h1>
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
