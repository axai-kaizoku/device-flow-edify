import { Issues } from "@/server/issueActions";
import IssueTable from "./IssueTable";
import OpenHeader from "./issue-open-header";

interface IssueTableDisplayProps {
  data: Issues[];
}

function IssueTableDisplay({ data }: IssueTableDisplayProps) {
  return (
    <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
      <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
        <OpenHeader data={data} />

        <IssueTable data={data} />
      </div>
    </div>
  );
}

export default IssueTableDisplay;
