"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/wind/Icons";
import { Table } from "@/components/wind/Table";
import { Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import { issueFields, filterIssues } from "@/server/filterActions";
import { useQueryState } from "nuqs";
import Pagination from "../../teams/_components/pagination";
import { IssueConfirmation } from "./issue-closed";

const numericFields = ["updatedAt", "createdAt"];

const ITEMS_PER_PAGE = 5;

export default function IssueTable({ data }: { data: Issues[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filter issues to show only "Closed" issues
  const OpenIssues = data.filter((item) => item.status === "Open");
  const currentIssues = OpenIssues.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col">
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
                  src=""
                  alt="Device Logo"
                  className="border size-10 rounded-full"
                />
                <div>Device Name</div>
              </div>
            ),
          },
          {
            title: "Issue Severity",
            render: (data: Issues) => (
              <div className="w-full flex justify-center">
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
                    <h1 className="px-2 justify-center items-center font-gilroyMedium flex text-sm rounded-full bg-gray-300 text-gray-700">
                      Unknown
                    </h1>
                  )}
                </div>
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
            title: "Raised on",
            render: (data: Issues) => (
              <div className="w-full flex justify-center">
                <div>
                  {data.createdAt
                    ? new Date(data?.createdAt).toLocaleDateString()
                    : "NULL"}
                </div>
              </div>
            ),
          },
          {
            title: "Issue type",
            dataIndex: "description",
          },
          {
            title: "Status",
            dataIndex: "status",
          },

          {
            title: "Actions",
            render: (record: Issues) => (
              <IssueConfirmation id={record?._id!} issueData={data}>
                <div className="rounded-full bg-[#027A14] text-base whitespace-nowrap px-2 text-white font-gilroyMedium">
                  Mark as resolved
                </div>
              </IssueConfirmation>
            ),
          },
        ]}
      />
      {/* Pagination Control */}
      <div className="py-2">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={OpenIssues.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
