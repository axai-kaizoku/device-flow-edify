"use client";
import OpenHeader from "./issue-open-header";
import { useState } from "react";
import { Table } from "@/components/wind/Table";
import { IssueResponse, Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import { issueIcons } from "../icons";
import Pagination from "../../teams/_components/pagination";
import { IssueStatusChange } from "./issue-status-change";
import { openIssues } from "@/server/filterActions";

interface IssueTableDisplayProps {
  data: IssueResponse | null;
  countIssues: IssueResponse | null;
  setIssues: React.Dispatch<React.SetStateAction<IssueResponse | null>>;
}

function IssueTableDisplay({
  data,
  setIssues,
  countIssues,
}: IssueTableDisplayProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    const res = await openIssues({ page });
    setIssues(res);
    setCurrentPage(page);
  };

  return (
    <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
      {data?.issues.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <issueIcons.no_issues_icon />
        </div>
      ) : (
        <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          <OpenHeader countIssues={countIssues} />

          <div className="flex flex-col">
            <Table
              data={data?.issues!}
              checkboxSelection={{
                uniqueField: "_id",
                //logic yet to be done
                onSelectionChange: (e) => console.log(e),
              }}
              columns={[
                {
                  title: "Device",
                  render: (data: Issues) => (
                    <div
                      className="w-full flex justify-start items-center gap-2 cursor-pointer"
                      onClick={() => router.push(`/issues/${data?._id}`)}
                    >
                      <img
                        src={
                          data?.deviceDetails?.image?.[0]?.url ??
                          "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                        }
                        alt="Device Logo"
                        className=" size-10 rounded-full"
                      />
                      <div>{data?.deviceDetails?.custom_model ?? "-"}</div>
                    </div>
                  ),
                },
                {
                  title: "Issue Severity",
                  render: (data: Issues) => (
                    <div className="w-full flex justify-start">
                      <div>
                        {data?.priority === "Critical" ? (
                          <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-alert-foreground text-failure">
                            Critical
                          </h1>
                        ) : data?.priority === "Medium" ? (
                          <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-[#FFFACB] text-[#FF8000]">
                            Medium
                          </h1>
                        ) : data?.priority === "Low" ? (
                          <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-success-foreground text-success-second">
                            Low
                          </h1>
                        ) : (
                          <h1>-</h1>
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Issued Id",
                  render: (record: Issues) => (
                    <div>{record?.issueId ?? "-"}</div>
                  ),
                },

                {
                  title: "Raised by",
                  render: (record) => <div>{record?.userName ?? "-"}</div>,
                },

                {
                  title: "Raised on",
                  render: (record) => {
                    const onboardingDate = record?.createdAt!;

                    // Check if onboardingDate is null, undefined, or empty
                    if (!onboardingDate) {
                      return <div>-</div>; // Return "-" for null, undefined, or empty value
                    }

                    const date = new Date(onboardingDate);

                    // Check if the date is valid
                    if (isNaN(date.getTime())) {
                      return <div>-</div>; // Return "-" for invalid date
                    }

                    const formattedDate = date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return <div>{formattedDate}</div>;
                  },
                },
                {
                  title: "Issue type",
                  render: (record) => <div>{record?.title ?? "-"}</div>,
                },
                {
                  title: "Status",
                  render: (record) => <div>{record?.status ?? "-"}</div>,
                },

                {
                  title: "Actions",
                  render: (record: Issues) => (
                    <IssueStatusChange
                      reOpen={false}
                      id={record?._id!}
                      issueData={record}
                    >
                      <div className="rounded-full bg-[#027A14] text-sm 2xl:text-base whitespace-nowrap px-5 py-1.5 text-white font-gilroyMedium">
                        Mark as resolved
                      </div>
                    </IssueStatusChange>
                  ),
                },
              ]}
            />
            {/* Pagination Control */}
            <div className="mt-2">
              <Pagination
                current_page={currentPage}
                total_pages={data?.total_pages!}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueTableDisplay;
