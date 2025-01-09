import { IssueResponse, paginatedIssue } from "@/server/issueActions";
import { CombinedContainer } from "@/components/container/container";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import { notFound } from "next/navigation";
import { filterIssues } from "@/server/filterActions";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";
interface IssueProps {
  searchParams: {
    page?: string;
  };
}

function Issues({ searchParams }: IssueProps) {
  // const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  try {
    return (
      // <CombinedContainer title="Issues">
      //   <div className="flex flex-col pt-[14px]">
      //     <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
      //       Issues
      //     </h1>
      //     <h1 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
      //       Manage Issues
      //     </h1>
      //     <TabDisplay />
      //   </div>
      // </CombinedContainer>
      <CombinedContainer title="Issues">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Issues">
        <NotFound/>
      </CombinedContainer>
    );
  }
}

export default Issues;
