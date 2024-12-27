import EmpIssueTable from "./empIssueTable";
import { getAllResponse } from "@/server/issueActions";

const Issue = ({ issues }: { issues: getAllResponse }) => {
  return (
    <div className="w-full overflow-y-auto">
      <EmpIssueTable data={issues} />
    </div>
  );
};

export default Issue;
