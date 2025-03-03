"use client";
import React, { useState } from "react";
import { Table } from "@/components/wind/Table";
import { getAllResponse, Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import Pagination from "@/app/(root)/teams/_components/pagination";
import { issueIcons } from "@/app/(root)/issues/icons";
import { ChevronRight } from "lucide-react";
const ITEMS_PER_PAGE = 5;

function EmpIssueTable({ data }: { data: getAllResponse }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIssues = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
      {data?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-4">
          <issueIcons.no_issues_icon />
        </div>
      ) : (
        <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          {" "}
          <div className=" flex gap-3 w-fit">
            <h1 className="2xl:text-xl text-lg pl-6 font-gilroySemiBold">
              Issue Reported
            </h1>
            <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
              {data?.length} Issues
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <Table
              data={currentIssues}
              selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              checkboxSelection={{
                uniqueField: "_id",
                // logic yet to be done
                onSelectionChange: (e) => console.log(e),
              }}
              columns={[
                {
                  title: "Issue ID",
                  render: (data: Issues) => (
                    <div
                      className="cursor-pointer w-fit h-fit"
                      onClick={() =>
                        router.push(`/devices/issues/${data?._id}`)
                      }
                    >
                      {data._id}
                    </div>
                  ),
                  // dataIndex: "_id",
                },
                {
                  title: "Device",
                  render: (data: Issues) => (
                    <div
                      className="w-full flex justify-start items-center gap-1 cursor-pointer"
                      onClick={() => router.push(`/devices/${data?._id}`)}
                    >
                      <img
                        src={data.deviceDetails?.image ?? "/media/mac.jpeg"}
                        alt="Device Logo"
                        className="border size-10 rounded-full"
                      />
                      <div>
                        {data.deviceDetails?.device_name ?? "Device Name"}
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Serial number",
                  render: (data: Issues) => (
                    <div className="w-full flex justify-start items-center gap-1">
                      <div>
                        {data?.deviceDetails?.serial_no ?? "Serial Number"}
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Raised by",
                  dataIndex: "userName",
                },
                {
                  title: "Issue Type",
                  dataIndex: "title",
                },
                {
                  title: "Issue Status",
                  render: (data: Issues) =>
                    data?.status === "Closed" ? (
                      <div className="font-gilroySemiBold flex items-center justify-center py-0.5 px-3 w-fit  text-xs text-[#FF0000] bg-[#FED9D9] rounded-full">
                        {data?.status}
                      </div>
                    ) : (
                      <div className="font-gilroySemiBold flex items-center justify-center py-0.5 px-3 w-fit  text-xs text-[#027A48] bg-[#ECFDF3] rounded-full">
                        {data?.status}
                      </div>
                    ),
                },
                {
                  title: "",
                  render: (data: Issues) => (
                    <div
                      className="cursor-pointer mx-6"
                      onClick={() =>
                        router.push(`/devices/issues/${data?._id}`)
                      }
                    >
                      <ChevronRight className="text-[#82898e]"/>
                    </div>
                  ),
                },
              ]}
            />

            {/* Pagination Control */}
            <div className="mt-1">
              <Pagination
                current_page={currentPage}
                per_page={ITEMS_PER_PAGE}
                total_pages={5}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpIssueTable;
