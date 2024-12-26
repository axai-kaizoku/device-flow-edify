"use client";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { SoftDeleteAsset } from "./soft-delete-asset";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Pagination from "../../teams/_components/pagination";
import { Table } from "@/components/wind/Table";

const AssignedTable = ({
  assignedDevices,
  ITEMS_PER_PAGE,
  devices
}: any) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDevice = assignedDevices?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col gap-2">
          <Table
            data={currentDevice}
            checkboxSelection={{
              uniqueField: "_id",
              onSelectionChange: (e) => console.log(e),
            }}
            columns={[
              {
                title: "Device",
                render: (data) => (
                  <div
                    className="w-28 justify-start flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push(`/assets/${data?._id}`)}
                  >
                    <img
                      src={
                        data?.image ||
                        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      }
                      alt="Device Logo"
                      className="size-10 object-cover rounded-full"
                    />
                    <div className="relative group">
                      <div className="font-gilroySemiBold text-sm text-black truncate max-w-[150px]">
                        {data?.device_name.length > 6
                          ? `${data?.device_name.slice(0, 6)}...`
                          : data?.device_name}
                      </div>
                      <div className="absolute left-0 mt-1 hidden w-max max-w-xs p-2 bg-white text-black text-xs rounded shadow-lg border group-hover:block">
                        {data?.device_name}
                      </div>
                    </div>
                  </div>
                ),
              },
              { title: "Assigned to", dataIndex: "userName" },
              { title: "Assigned On", dataIndex: "assigned_at" },
              { title: "Team", dataIndex: "team" },
              { title: "Serial Number", dataIndex: "serial_no" },
              {
                title: "Asset health",
                render: (record) => {
                  let color = "";
                  switch (record.brand) {
                    case "Good":
                    case "Best":
                    case "New":
                      color = "text-[#027A48] bg-[#ECFDF3]";
                      break;
                    case "Old":
                      color = "text-[#F00] bg-[#FFE0E0]";
                      break;
                    default:
                      color = "text-[#FF8000] bg-[#FFFACB]";
                  }
                  return (
                    <span
                      className={`${color} px-2 py-0.5-1 w-fit flex justify-center items-center rounded-full`}
                    >
                      {record.brand}
                    </span>
                  );
                },
              },
              {
                title: "Warranty Status",
                render: (record) => (
                  <span
                    className={`${
                      record.warranty_status
                        ? "text-[#027A48] px-2 py-0.5-1 w-fit flex justify-center items-center rounded-full bg-[#ECFDF3]"
                        : "text-[#F00] px-2 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#FFE0E0]"
                    }`}
                  >
                    {record.warranty_status ? "Active" : "Inactive"}
                  </span>
                ),
              },
              {
                title: "",
                render: (record) => (
                  <div className="flex gap-8 justify-center items-center">
                    <SoftDeleteAsset id={record._id}>
                      <Icons.table_delete className="size-6" />
                    </SoftDeleteAsset>
                    <Link href={`/assets/${record?._id}`}>
                      <div className="rounded-full text-white bg-black font-gilroySemiBold text-lg py-0.5 px-6">
                        Manage
                      </div>
                    </Link>
                  </div>
                ),
              },
            ]}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={assignedDevices.length}
            onPageChange={handlePageChange}
          />
        </div>
      </Suspense>
    </>
  );
};

export default AssignedTable;
