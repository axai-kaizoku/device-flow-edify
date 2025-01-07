"use client";
import { useEffect, useState } from "react";
import { Table } from "@/components/wind/Table";
import { Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import { issueFields, filterIssues } from "@/server/filterActions";
import { useQueryState } from "nuqs";
import Pagination from "../../teams/_components/pagination";
import { IssueStatusChange } from "./issue-status-change";

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
                className="w-full flex justify-start items-center gap-2 cursor-pointer"
                onClick={() => router.push(`/issues/${data?._id}`)}
              >
                <img
                  src={
                    data?.deviceDetails?.image ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnpCabWZCg86pyyyD71E0s6JrIDZs4CSnqQ&s"
                  }
                  alt="Device Logo"
                  className=" size-10 rounded-full"
                />
                <div>{data?.deviceDetails?.device_name ?? "-"}</div>
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
            render: (data: Issues) => {
              const date = new Date(data?.createdAt!);
              const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              return (
                <div className="justify-start flex items-center">
                  {formattedDate}
                </div>
              );
            },
          },
          {
            title: "Issue type",
            dataIndex: "title",
          },
          {
            title: "Status",
            dataIndex: "status",
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
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={OpenIssues?.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
