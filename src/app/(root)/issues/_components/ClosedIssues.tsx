"use client";
import { useState } from "react";
import { Table } from "@/components/wind/Table";
import { Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";

import Pagination from "../../teams/_components/pagination";
import IssueClosedHeader from "./issue-closed-header";
import { IssueStatusChange } from "./issue-status-change";

const ITEMS_PER_PAGE = 5;

export default function ClosedIssueTable({ data }: { data: Issues[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filter issues to show only "Closed" issues
  const ClosedIssues = Array.isArray(data)
    ? data.filter(
        (item) =>
          item && typeof item.status === "string" && item.status === "Closed"
      )
    : [];

  const currentIssues = ClosedIssues.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col ">
          <IssueClosedHeader data={data} />
          <Table
            data={currentIssues}
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
                    className="w-full flex justify-start items-center gap-1 cursor-pointer"
                    onClick={() => router.push(`/issues/${data?._id}`)}
                  >
                    <img
                      src={data.deviceDetails?.image ?? "/media/mac.jpeg"}
                      alt="Device Logo"
                      className="border size-10 rounded-full"
                    />
                    <div>{data.deviceDetails?.device_name ?? "-"}</div>
                  </div>
                ),
              },

              {
                title: "Serial number",
                render: (data: Issues) => (
                  <div className="w-full flex justify-start items-center gap-1">
                    <div>{data?.deviceDetails?.serial_no ?? "-"}</div>
                  </div>
                ),
              },
              {
                title: "Issued Id",
                dataIndex: "_id",
              },
              {
                title: "Raised by",
                dataIndex: "userName",
              },
              {
                title: "Closed on",
                render: (data: Issues) => {
                  const date = new Date(data?.updatedAt!);
                  const formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  return <div>{formattedDate}</div>;
                },
              },
              {
                title: "Issue Type",
                dataIndex: "title",
              },
              {
                title: "Closed by",
                dataIndex: "status",
              },
              {
                title: "Actions",
                render: (record: Issues) => (
                  <IssueStatusChange
                    id={record?._id!}
                    issueData={record}
                    reOpen={true}
                  >
                    <div className="rounded-full text-white bg-black font-gilroySemiBold text-sm py-1.5 px-5">
                      Reopen
                    </div>
                  </IssueStatusChange>
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <div className="mt-2">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={ClosedIssues?.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
