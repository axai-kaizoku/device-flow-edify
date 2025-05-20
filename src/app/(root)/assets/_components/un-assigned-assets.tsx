"use client";
import {
  bulkDeleteAssets,
  Device,
  DeviceResponse,
} from "@/server/deviceActions";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { SoftDeleteAsset } from "./soft-delete-asset";
import { AssignAsset } from "./assign-asset";
import React, { Suspense, useState } from "react";
import { unAssignedAssets } from "@/server/filterActions";
import { assetsIcons } from "../icons";
import CreateDevice from "./addDevices/_components/create-device";
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import { toast } from "sonner";
import { DeleteModal } from "../../people/_components/deleteUserModal";

function UnAssignedAssets({
  data,
  setAssets,
  onRefresh,
}: {
  data: DeviceResponse | null;
  setAssets: any;
  onRefresh: () => Promise<void>;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true); // Set loading to true when changing pages
    try {
      const res = await unAssignedAssets({ page });
      setAssets(res);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching Members:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error(`No Asset selected for deletion`);
      return;
    }

    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete ${selectedIds.length} users?`
    // );
    // if (!confirmDelete) return;

    try {
      const res = await bulkDeleteAssets(selectedIds, "soft");

      if (res.status !== 200) throw new Error("Failed to delete Assets");

      toast.success("Assets deleted successfully!");
      setSelectedIds([]); // Clear selection after deletion
      await onRefresh(); // Refresh data after deletion
    } catch (error) {
      toast.error(`Failed to delete Assets : ${error}`);
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {!isLoading && data?.devices?.length === 0 ? (
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
            <div className="flex justify-between items-center">
              <div className=" flex gap-3 w-fit">
                <h1 className="text-xl pl-6 font-gilroySemiBold">
                  Total Assets
                </h1>
                <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                  {data?.total} Assets
                </h1>
              </div>

              {selectedIds.length > 0 && (
                <DeleteModal
                  handleBulkAction={handleBulkDelete}
                  open={open}
                  setOpen={setOpen}
                  type="Delete"
                >
                  <button
                    // onClick={handleBulkDelete}
                    className="bg-black flex items-center gap-2 text-white px-3 py-1 font-gilroySemiBold w-fit mr-8 rounded-full"
                  >
                    Delete
                  </button>
                </DeleteModal>
                // {selectedIds.length} Users
              )}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex flex-col gap-2">
                <Table
                  data={data!?.devices ?? []}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  checkboxSelection={{
                    uniqueField: "_id",
                    //logic yet to be done
                    onSelectionChange: handleSelectionChange,
                  }}
                  columns={[
                    {
                      title: "Device",
                      render: (data: Device) => (
                        <div
                          className="w-fit justify-center flex items-center gap-2 cursor-pointer"
                          onClick={() => router.push(`/assets/${data?._id}`)}
                          onMouseEnter={() =>
                            router.prefetch(`/assets/${data?._id}`)
                          }
                        >
                          <img
                            src={
                              data?.image?.[0]?.url ??
                              "https://static.vecteezy.com/system/resources/thumbnails/012/807/215/small/silhouette-of-the-laptop-for-sign-icon-symbol-apps-website-pictogram-logo-art-illustration-or-graphic-design-element-format-png.png"
                            }
                            alt="Device Logo"
                            className="border size-10 rounded-full"
                          />
                          <div className="relative group">
                            <div className="font-gilroySemiBold text-sm text-black truncate max-w-[150px]">
                              {data?.custom_model?.length! > 12
                                ? `${data?.custom_model!.slice(0, 12)}...`
                                : data?.custom_model}
                            </div>
                            <div className="absolute left-0 mt-1 hidden w-max max-w-xs p-2 bg-white text-black text-xs rounded shadow-lg border group-hover:block">
                              {data?.custom_model ?? "-"}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: "Serial Number",
                      dataIndex: "serial_no",
                    },

                    {
                      title: "Purchased  On",
                      render: (record) => {
                        const onboardingDate = record?.device_purchase_date;

                        // Check if onboardingDate is null, undefined, or empty
                        if (!onboardingDate) {
                          return <div>-</div>; // Return "-" for null, undefined, or empty value
                        }

                        const date = new Date(onboardingDate);

                        // Check if the date is valid
                        if (isNaN(date.getTime())) {
                          return <div>-</div>; // Return "-" for invalid date
                        }

                        const formattedDate = date.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return <div>{formattedDate}</div>;
                      },
                    },
                    {
                      title: "Asset Health",
                      render: (record: Device) => {
                        let color = "";
                        switch (record?.device_condition) {
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
                        return record?.device_condition ? (
                          <span
                            className={`${color} px-3 py-0.5 w-fit flex justify-center items-center rounded-full`}
                          >
                            {record?.device_condition}
                          </span>
                        ) : (
                          "-"
                        );
                      },
                    },
                    {
                      title: "Warranty Status",
                      render: (record) => {
                        // Check if the warranty is active based on expiry date
                        const isWarrantyActive = record?.warranty_expiary_date
                          ? new Date(record?.warranty_expiary_date) > new Date()
                          : false;

                        return (
                          <span
                            className={`${
                              isWarrantyActive
                                ? "text-[#027A48] px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#ECFDF3]"
                                : "text-[#F00] px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#FFE0E0]"
                            }`}
                          >
                            {isWarrantyActive ? "Active" : "Inactive"}
                          </span>
                        );
                      },
                    },
                    {
                      title: "",
                      render: (record: Device) => (
                        <div className="flex gap-5 -ml-2 ">
                          <SoftDeleteAsset
                            id={record?._id ?? "error"}
                            onRefresh={onRefresh}
                          >
                            <DeleteTableIcon className="size-6" />
                          </SoftDeleteAsset>
                          <AssignAsset device={record} onRefresh={onRefresh}>
                            <div className="rounded-full text-white bg-black font-gilroySemiBold text-sm py-1.5 px-5">
                              Assign
                            </div>
                          </AssignAsset>
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

export default UnAssignedAssets;
