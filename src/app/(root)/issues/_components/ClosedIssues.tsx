"use client";
import { useEffect, useState } from "react";
import { Table } from "@/components/wind/Table";
import { Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";

import Pagination from "../../teams/_components/pagination";
import { IssueReOpen } from "./issue-reopen";
import IssueClosedHeader from "./issue-closed-header";

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
      <div className="rounded-[33px] border border-[#C3C3C34F] px-7 py-5 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px]  flex flex-col ">
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
                    className="w-full flex justify-center items-center gap-1 cursor-pointer"
                    onClick={() => router.push(`/issues/${data?._id}`)}
                  >
                    <img
                      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      alt="Device Logo"
                      className="border size-10 rounded-full"
                    />
                    <div>Device Name</div>
                  </div>
                ),
              },

              {
                title: "Serial number",
                dataIndex: "serial_no",
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
                render: (record: Issues) => (
                  <div>{new Date(record?.updatedAt!).toLocaleDateString()}</div>
                ),
              },
              {
                title: "Issue Type",
                dataIndex: "description",
              },

              {
                title: "Closed by",
                dataIndex: "status",
              },

              {
                title: "Actions",
                render: (record: Issues) => (
                  <IssueReOpen id={record?._id!} issueData={data}>
                    <div className="rounded-full bg-primary text-base whitespace-nowrap px-2 text-white font-gilroyMedium">
                      Reopen
                    </div>
                  </IssueReOpen>
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <div className="py-2">
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
