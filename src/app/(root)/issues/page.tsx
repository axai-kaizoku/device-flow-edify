import { IssueResponse, paginatedIssue } from "@/server/issueActions";
import { CombinedContainer } from "@/components/container/container";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import { notFound } from "next/navigation";
import { filterIssues } from "@/server/filterActions";
import TabDisplay from "./TabDisplay";
interface IssueProps {
  searchParams: {
    page?: string;
  };
}

async function Issues({ searchParams }: IssueProps) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  try {
    const issueResponse: IssueResponse = await filterIssues();

    if (!issueResponse?.issues) {
      notFound();
    }
    return (
      <CombinedContainer title="Issues">
        <div className="flex flex-col pt-[14px]">
          <h1 className="text-gray-400 font-gilroySemiBold text-lg">Issues</h1>
          <h1 className="text-3xl font-gilroySemiBold pt-[10px]">
            Manage Issues
          </h1>
          <TabDisplay
            issues={issueResponse?.issues} // Pass the documents array directly
            totalDocuments={issueResponse?.total_count}
            pageSize={issueResponse?.page_size}
          />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Issues">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}

export default Issues;
