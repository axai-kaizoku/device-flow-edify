import { Device } from "@/server/deviceActions";
import React, { useState } from "react";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { Icons } from "@/components/icons";
import { PermanentAssetsDelete } from "./permanent-assets-delete";
import { RestoreDevice } from "./restore-assets";

const ITEMS_PER_PAGE = 5;
function InActiveAssets({ devices }: { devices: Device[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filter issues to show only "Closed" issues
  const inactiveDevices = devices?.filter((device) => !device?.userId);

  const currentDevice = inactiveDevices?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  return (
    <>
      <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col gap-5">
        <div className=" flex gap-2 w-fit">
          <h1 className="text-xl font-semibold">Total Assets</h1>
          <h1 className="text-xs font-medium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
            {inactiveDevices?.length} Assets
          </h1>
        </div>
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
                    className=" justify-start flex items-center gap-2 cursor-pointer"
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

                    <div className="text-[#101828] font-gilroyMedium text-sm">
                      {data?.device_name}
                    </div>
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
                  <span className="">{record?.device_purchase_date}</span>
                ),
              },
              {
                title: "Asset Condition",
                render: (record: Device) => {
                  let color = "";
                  switch (record?.brand) {
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
                    <PermanentAssetsDelete id={record?._id!}>
                      <Icons.table_delete className="size-6" />
                    </PermanentAssetsDelete>

                    <RestoreDevice id={record?._id!}>
                      <div className="rounded-full text-white bg-black font-gilroySemiBold text-lg py-0.5 px-6">
                        Restore
                      </div>
                    </RestoreDevice>
                  </div>
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={inactiveDevices?.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default InActiveAssets;