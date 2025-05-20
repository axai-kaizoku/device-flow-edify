"use client";
import OpenHeader from "./issue-open-header";
import { useState } from "react";
import { Table } from "@/components/wind/Table";
import { IssueResponse, Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import { issueIcons } from "../icons";
// import Pagination from "../../teams/_components/pagination";
import { IssueStatusChange } from "./issue-status-change";
import { openIssues } from "@/server/filterActions";
import IssueClosedHeader from "./issue-closed-header";
import { buttonVariants } from "@/components/buttons/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { User03Icon, UserGroup03Icon } from "@hugeicons/core-free-icons";

interface IssueTableDisplayProps {
  data: any;
  countIssues?: IssueResponse | null;
  setIssues?: React.Dispatch<React.SetStateAction<IssueResponse | null>>;
  onRefresh?: () => Promise<void>;
  issuesText?: string;
  status?: string;
}

function IssueTableDisplay({
  data,
  countIssues,
  onRefresh,
  issuesText,
  status,
}: IssueTableDisplayProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const handlePageChange = async (page: number) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await openIssues({ page });
  //     setIssues(res);
  //     setCurrentPage(page);
  //   } catch (error) {
  //     console.error("Failed to Fetch Issues");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleSelectionChange = (selected: string[]) => {
  //   setSelectedIds(selected);
  // };

  return (
    <>
      {status !== "pending" && data?.length === 0 ? (
        <div className="flex  font-gilroySemiBold flex-col  gap-6 justify-center items-center py-10">
          <img src="/media/no_data/issue.svg" alt="No-Issue Logo" />
        </div>
      ) : (
        <div className="rounded-lg border  bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          {/* <div className="flex justify-center items-center">
            <h1 className="text-base pl-6 font-gilroyMedium">Issues</h1>
          </div> */}
          {status === "pending" ? (
            <div className="flex gap-3 ml-4">
              <Skeleton className="text-base pl-6 h-6 w-32" />
              <Skeleton className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full   h-6 w-16" />
              <Skeleton className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full  h-6 w-20" />
              <Skeleton className="px-2 justify-center items-center font-gilroyMedium flex text-xs rounded-full   h-6 w-24" />
            </div>
          ) : (
            <>
              {issuesText?.toLowerCase().includes("open") ? (
                <OpenHeader countIssues={data} />
              ) : (
                <IssueClosedHeader data={data} />
              )}
            </>
          )}

          <div className="flex flex-col">
            {/* {JSON.stringify(data)} */}
            <Table
              data={data?.map((d, i) => ({ ...d, serialNo: i + 1 })) ?? []}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              isLoading={status === "pending"}
              // checkboxSelection={{
              //   uniqueField: "_id",

              //   onSelectionChange: handleSelectionChange,
              // }}
              columns={[
                {
                  title: "Serial No",
                  render: (record: Issues) => (
                    <div className="pl-5">{record?.serialNo ?? "-"}</div>
                  ),
                },
                {
                  title: "Ticket Id",
                  render: (record: Issues) => (
                    <div className="text-black">{record?.code ?? "-"}</div>
                  ),
                },
                {
                  title: "Ticket Severity",
                  render: (data: Issues) => (
                    <div className="w-full flex justify-start">
                      <div>
                        {data?.severity === "Critical" ? (
                          <h1 className="px-2 py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-alert-foreground text-failure">
                            Critical
                          </h1>
                        ) : data?.severity === "Medium" ? (
                          <h1 className="px-2 py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-[#FFFACB] text-[#FF8000]">
                            Medium
                          </h1>
                        ) : data?.severity === "Low" ? (
                          <h1 className="px-2 py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full bg-success-foreground text-success-second">
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
                  title: "Assigned To",
                  render: (record) => {
                    const opts = record?.assignedTo || []; // Assuming `opts` comes from `record`
                    const first = opts.slice(0, 1);
                    const remaining = opts.length > 1 ? opts.length - 1 : 0;

                    return (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {opts?.length === 0 && <span className="text-center">-</span>}
                        {first.map((o) => (
                          <span
                            key={o?.userId || o?.teamId}
                            className="inline-flex items-center px-2 py-1 gap-1 text-[13px] bg-[#EEF7FF] text-[#025CE5] font-gilroyMedium rounded-md"
                          >
                            {o?.teamId ? <HugeiconsIcon icon={UserGroup03Icon} className="text-[#025CE5] size-4" /> : (<HugeiconsIcon icon={User03Icon} className="text-[#025CE5] size-4" />)}{o?.first_name || o?.title}
                          </span>
                        ))}
                        {remaining > 0 && (
                          <span className="font-gilroyMedium text-xs">
                            +{remaining} More
                          </span>
                        )}
                      </div>
                    );
                  },
                },

                {
                  title: issuesText?.toLowerCase().includes("open")
                    ? "Raised on"
                    : "Closed on",
                  render: (record) => {
                    if (issuesText?.toLowerCase().includes("open")) {
                      const onboardingDate = record?.openedOn;

                      // Check if onboardingDate is null, undefined, or empty
                      if (!onboardingDate) {
                        return <div>-</div>;
                      }

                      const date = new Date(onboardingDate);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return <div>-</div>;
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return <div>{formattedDate}</div>;
                    } else {
                      const updateIssue = record?.closedAt;

                      // Check if updateIssue is null, undefined, or empty
                      if (!updateIssue) {
                        return <div>-</div>;
                      }

                      const date = new Date(updateIssue);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return <div>-</div>;
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return <div>{formattedDate}</div>;
                    }
                  },
                },
                {
                  title: "Ticket type",
                  render: (record) => <div>{record?.category ?? "-"}</div>,
                },
                {
                  title: "",
                  render: (record) => <div
                    className={`${buttonVariants({
                      variant: "outlineTwo",
                      className: "w-full",
                    })} text-[13px]`}
                    onClick={() => {
                      router.push(`/tickets/${record?._id}`);
                    }}
                  >
                    View
                  </div>,
                },


              ]}
            />
          </div >
        </div >
      )
      }
    </>
  );
}

export default IssueTableDisplay;
