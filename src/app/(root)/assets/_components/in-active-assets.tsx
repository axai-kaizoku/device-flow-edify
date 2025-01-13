//inactive:-
import { Device, DeviceResponse } from "@/server/deviceActions";
import React, { Suspense, useState } from "react";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { Icons } from "@/components/icons";
import { PermanentAssetsDelete } from "./permanent-assets-delete";
import { RestoreDevice } from "./restore-assets";
import { inActiveAssets } from "@/server/filterActions";
import { assetsIcons } from "../icons";
import CreateDevice from "./addDevices/_components/create-device";
function InActiveAssets({
  data,
  setAssets,
}: {
  data: DeviceResponse | null;
  setAssets: React.Dispatch<React.SetStateAction<DeviceResponse | null>>;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    const res = await inActiveAssets({ page });
    setAssets(res);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {data?.devices.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center py-10">
            <assetsIcons.no_assets_display />
            <CreateDevice>
              <div className="py-1.5 px-8 text-sm rounded-full text-white font-gilroySemiBold bg-black">
                Add Device
              </div>
            </CreateDevice>
          </div>
        ) : (
          <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
            <div className=" flex gap-3 w-fit">
              <h1 className="text-xl font-gilroySemiBold pl-6">Total Assets</h1>
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
                          onMouseEnter={() =>
                            router.prefetch(`/assets/${data?._id}`)
                          }
                        >
                          <img
                            src={
                              data?.image![0]?.url ||
                              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                            }
                            alt="Device Logo"
                            className="size-10 object-cover rounded-full"
                          />

                          <div className="text-[#101828] font-gilroySemiBold text-sm">
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
                      title: "Prchased  On",
                      render: (record) => {
                        const date = new Date(record?.device_purchase_date);

                        const formattedDate = date.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return <div>{formattedDate}</div>;
                      },
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
                          <span className={`${color} px-3 py-1  rounded-full`}>
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
                            record?.warranty_status
                              ? "text-[#027A48] px-3 py-1 rounded-full bg-[#ECFDF3]"
                              : "text-[#F00] rounded-full px-3 py-1  bg-[#FFE0E0] "
                          }`}
                        >
                          {record?.warranty_status ? "Active" : "Inactive"}
                        </span>
                      ),
                    },
                    {
                      title: "",
                      render: (record: Device) => (
                        <div className="flex gap-5 -ml-2">
                          <PermanentAssetsDelete id={record?._id!}>
                            <Icons.table_delete className="size-6" />
                          </PermanentAssetsDelete>

                          <RestoreDevice id={record?._id!}>
                            <div className="rounded-full text-white bg-black font-gilroySemiBold text-sm py-1.5 px-5">
                              Restore
                            </div>
                          </RestoreDevice>
                        </div>
                      ),
                    },
                  ]}
                />
                {/* Pagination Control */}
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
        )}
      </div>
    </>
  );
}

export default InActiveAssets;
