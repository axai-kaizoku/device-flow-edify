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
import IssueClosedHeader from "./issue-closed-header";

interface IssueTableDisplayProps {
  data: IssueResponse | null;
  countIssues?: IssueResponse | null;
  setIssues?: React.Dispatch<React.SetStateAction<IssueResponse | null>>;
  onRefresh?: () => Promise<void>;
  issuesText?: string;
}

function IssueTableDisplay({
  data,
  setIssues,
  countIssues,
  onRefresh,
  issuesText,
}: IssueTableDisplayProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await openIssues({ page });
      setIssues(res);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to Fetch Issues");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <>
      {!isLoading && data?.issues.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <issueIcons.no_issues_icon />
        </div>
      ) : (
        <div className="rounded-lg border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          {issuesText?.toLowerCase().includes("open") ? (
            <OpenHeader countIssues={countIssues} />
          ) : (
            <IssueClosedHeader data={data} />
          )}

          <div className="flex flex-col">
            <Table
              data={data?.issues!}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              isLoading={isLoading}
              checkboxSelection={{
                uniqueField: "_id",
                //logic yet to be done
                onSelectionChange: handleSelectionChange,
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
                  title:
                    issuesText?.toLowerCase().includes("open") && "Actions",
                  render: (record: Issues) =>
                    issuesText?.toLowerCase().includes("open") && (
                      <IssueStatusChange
                        reOpen={false}
                        id={record?._id!}
                        issueData={record}
                        onRefresh={onRefresh}
                      >
                        <div className="rounded-md bg-[#027A14] text-[13px]  whitespace-nowrap px-4 py-2 text-white font-gilroyMedium">
                          Mark as resolved
                        </div>
                      </IssueStatusChange>
                    ),
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default IssueTableDisplay;
