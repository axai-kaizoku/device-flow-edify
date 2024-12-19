import { Issues } from "@/server/issueActions";
import IssueTable from "./IssueTable";
import OpenHeader from "./issue-open-header";

interface IssueTableDisplayProps {
  data: Issues[];
}

function IssueTableDisplay({ data }: IssueTableDisplayProps) {
  return (
    <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col">
      <OpenHeader data={data} />

      <IssueTable data={data} />
    </div>
  );
}

export default IssueTableDisplay;
