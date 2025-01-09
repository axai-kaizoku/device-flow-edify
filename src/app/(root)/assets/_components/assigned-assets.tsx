import { Device, DeviceResponse } from "@/server/deviceActions";

import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { SoftDeleteAsset } from "./soft-delete-asset";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Pagination from "../../teams/_components/pagination";
import { Table } from "@/components/wind/Table";
import { assignedAssets } from "@/server/filterActions";

function AssignedAssets({
  data,
  setAssets,
}: {
  data: DeviceResponse;
  setAssets: any;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    const res = await assignedAssets({ page });
    setAssets(res);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          {" "}
          <div className=" flex gap-3 w-fit">
            <h1 className="text-xl pl-6 font-gilroySemiBold">Total Assets</h1>
            <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
              {data?.total} Assets
            </h1>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col gap-2">
              <Table
                data={data?.devices ?? []}
                checkboxSelection={{
                  uniqueField: "_id",
                  onSelectionChange: (e) => console.log(e),
                }}
                columns={[
                  {
                    title: "Device",
                    render: (data: Device) => (
                      <div
                        className=" justify-start flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push(`/assets/${data?._id}`)}
                        onMouseEnter={() =>
                          router.prefetch(`/assets/${data?._id}`)
                        }
                      >
                        <img
                          src={
                            data?.image ??
                            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                          }
                          alt="Device Logo"
                          className="size-10 object-cover rounded-full"
                        />
                        <div className="relative group">
                          <div className="font-gilroySemiBold text-sm text-black truncate max-w-[150px]">
                            {data?.device_name!.length > 12
                              ? `${data?.device_name!.slice(0, 12)}...`
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
                  {
                    title: "Assigned On",
                    render: (record) => {
                      const date = new Date(record?.assigned_at);

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return <div>{formattedDate}</div>;
                    },
                  },
                  { title: "Team", dataIndex: "userName" },
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
                          className={`${color} px-3 py-0.5 w-fit flex justify-center items-center rounded-full`}
                        >
                          {record?.brand}
                        </span>
                      );
                    },
                  },
                  {
                    title: "Warranty Status",
                    render: (record) => (
                      <span
                        className={`${
                          record?.warranty_status
                            ? "text-[#027A48] px-3 py-0.5-1 w-fit flex justify-center items-center rounded-full bg-[#ECFDF3]"
                            : "text-[#F00] px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#FFE0E0]"
                        }`}
                      >
                        {record?.warranty_status ? "Active" : "Inactive"}
                      </span>
                    ),
                  },
                  {
                    title: "",
                    render: (record) => (
                      <div className="flex gap-5 -ml-2 items-center">
                        <SoftDeleteAsset id={record?._id}>
                          <Icons.table_delete className="size-6" />
                        </SoftDeleteAsset>
                        <Link
                          href={`/assets/${record?._id}`}
                          onMouseEnter={() =>
                            router.prefetch(`/assets/${record?._id}`)
                          }
                        >
                          <div className="rounded-full text-white bg-black font-gilroySemiBold text-sm py-1.5 px-5">
                            Manage
                          </div>
                        </Link>
                      </div>
                    ),
                  },
                ]}
              />
              <div className="mt-1">
                <Pagination
                  current_page={currentPage}
                  total_pages={data?.total_pages!}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default AssignedAssets;
