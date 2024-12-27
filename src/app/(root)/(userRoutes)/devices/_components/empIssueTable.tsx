"use client";
import React, { useState } from "react";
import { Icon } from "@/components/wind/Icons";
import { Table } from "@/components/wind/Table";
import { getAllResponse, Issues } from "@/server/issueActions";
import { useRouter } from "next/navigation";
import Pagination from "@/app/(root)/teams/_components/pagination";

const ITEMS_PER_PAGE = 5;

function EmpIssueTable({ data }: { data: getAllResponse }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIssues = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col">
      <div className="font-gilroySemiBold text-lg text-[#101828] flex gap-2 px-6 py-4 items-center">
        Issue Reported{" "}
        <span className="text-[#6941C6] text-xs font-gilroySemiBold rounded-full bg-[#F9F5FF] px-2 py-1">
          {data?.length} Issues
        </span>
      </div>

      <Table
        data={currentIssues}
        checkboxSelection={{
          uniqueField: "_id",
          onSelectionChange: (e) => console.log(e),
        }}
        columns={[
          {
            title: "Issue ID",
            dataIndex: "_id",
          },
          {
            title: "Device",
            render: (data: Issues) => (
              <div className="w-full flex justify-center items-center gap-2 cursor-pointer">
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                  alt="Device Logo"
                  className="border size-10 rounded-full"
                />
                <div className="whitespace-nowrap">Device Name</div>
              </div>
            ),
          },
          {
            title: "Serial number",
            dataIndex: "serial_no",
          },
          {
            title: "Raised by",
            dataIndex: "userName",
          },
          {
            title: "Issue Type",
            dataIndex: "description",
          },
          {
            title: "Issue Status",
            render: (data: Issues) => (
              <div className="font-gilroySemiBold flex items-center justify-center p-1 text-xs text-[#027A48] bg-[#ECFDF3] rounded-full">
                {data?.status}
              </div>
            ),
          },
          {
            title: "",
            render: (data: Issues) => (
              <div
                className="cursor-pointer"
                onClick={() => router.push(`devices/issues/${data?._id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                >
                  <path
                    d="M1.54514 1.16309L6.19092 5.91949L1.54514 10.5652"
                    stroke="#AAAAAA"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            ),
          },
        ]}
      />

      {/* Pagination Control */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={data?.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EmpIssueTable;
