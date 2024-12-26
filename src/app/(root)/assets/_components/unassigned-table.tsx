"use client";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { SoftDeleteAsset } from "./soft-delete-asset";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Pagination from "../../teams/_components/pagination";
import { Table } from "@/components/wind/Table";
import { AssignAsset } from "./assign-asset";
import { Device } from "@/server/deviceActions";

const UnassignedTable = ({
  unassignedDevices,
  ITEMS_PER_PAGE,
  devices,
}: any) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDevice = unassignedDevices?.slice(
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
              //logic yet to be done
              onSelectionChange: (e) => console.log(e),
            }}
            columns={[
              {
                title: "Device",
                render: (data: Device) => (
                  <div
                    className="w-fit justify-center flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push(`/assets/${data?._id}`)}
                  >
                    <img
                      src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      alt="Device Logo"
                      className="border size-10 rounded-full"
                    />
                    <div>{data?.device_name ? data?.device_name : <>-</>}</div>
                  </div>
                ),
              },
              {
                title: "Serial Number",
                dataIndex: "serial_no",
              },
              {
                title: "Purchased On",
                render: (record: Device) => (
                  <span className="">
                    {record?.device_purchase_date ? (
                      record?.device_purchase_date
                    ) : (
                      <>-</>
                    )}
                  </span>
                ),
              },
              {
                title: "Asset Condition",
                render: (record: Device) => {
                  let color = "";
                  switch (record.brand) {
                    case "Good":
                      color = "text-[#FF8000] bg-[#FFFACB] ";
                      break;
                    case "Best":
                      color = "text-[#027A48] bg-[#ECFDF3] ";
                      break;
                    case "New":
                      color = "text-[#027A48] bg-[#ECFDF3] ";
                      break;
                    case "Old":
                      color = "text-[#F00] bg-[#FFE0E0] ";
                      break;
                    default:
                      color = "text-[#FF8000] bg-[#FFFACB]";
                  }
                  return (
                    <span className={`${color} px-2 py-1  rounded-full`}>
                      {record?.brand ? record?.brand : <>-</>}
                    </span>
                  );
                },
              },
              {
                title: "Warranty Status",
                render: (record: Device) => (
                  <span
                    className={`${
                      record.warranty_status
                        ? "text-[#027A48] px-2 py-1 rounded-full bg-[#ECFDF3]"
                        : "text-[#F00] rounded-full px-2 py-1  bg-[#FFE0E0] "
                    }`}
                  >
                    {record?.warranty_status ? "Active" : "Inactive"}
                  </span>
                ),
              },
              {
                title: "",
                render: (record: Device) => (
                  <div className="flex gap-8 justify-center items-center">
                    <SoftDeleteAsset id={record?._id ?? "error"}>
                      <Icons.table_delete className="size-6" />
                    </SoftDeleteAsset>
                    <AssignAsset device={record}>
                      <div className="rounded-full text-white bg-black font-gilroySemiBold text-lg py-0.5 px-6">
                        Assign
                      </div>
                    </AssignAsset>
                  </div>
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={unassignedDevices?.length}
            onPageChange={handlePageChange}
          />
        </div>
      </Suspense>
    </>
  );
};

export default UnassignedTable;
