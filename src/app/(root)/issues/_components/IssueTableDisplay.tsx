import { Issues } from "@/server/issueActions";
import IssueTable from "./IssueTable";
import OpenHeader from "./issue-open-header";
import { useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";
import IssueClosedHeader from "./issue-closed-header";
import ClosedIssueTable from "./ClosedIssues";

interface IssueTableDisplayProps {
  data: Issues[];
}

function IssueTableDisplay({ data }: IssueTableDisplayProps) {
  const searchParams = useSearchParams();
  const tabDisplay = searchParams.get("tab");
  return (
    <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col">
      {tabDisplay === "open" ? (
        <>
          <OpenHeader data={data} />

          <IssueTable data={data} />
        </>
      ) : (
        <>
          <IssueClosedHeader data={data} />
          <ClosedIssueTable data={data} />
        </>
      )}
    </div>
  );
}

export default IssueTableDisplay;
