import {
  bulkDeleteAssets,
  Device,
  DeviceResponse,
  StoreDevice,
} from "@/server/deviceActions";

import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import { SoftDeleteAsset } from "./soft-delete-asset";
import Link from "next/link";
import Pagination from "../../teams/_components/pagination";
import { Table } from "@/components/wind/Table";
import { assignedAssets } from "@/server/filterActions";
import { assetsIcons } from "../icons";
import CreateDevice from "./addDevices/_components/create-device";
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import { useToast } from "@/hooks/useToast";
import { DeleteModal } from "../../people/_components/deleteUserModal";
import { AssignAsset } from "./assign-asset";
import { RestoreDevice } from "./restore-assets";
import { PermanentAssetsDelete } from "./permanent-assets-delete";
import { buttonVariants } from "@/components/buttons/Button";

function AssignedAssets({
  data,
  setAssets,
  onRefresh,
  assetsText = "All Assets",
  status,
}: {
  data: DeviceResponse | null;
  setAssets?: any;
  status?: string;
  onRefresh?: () => Promise<void>;
  assetsText?: string;
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { openToast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true); // Set loading to true when changing pages
    try {
      const res = await assignedAssets({ page });
      setAssets(res);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      openToast("error", `No Asset selected for deletion`);
      return;
    }

    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete ${selectedIds.length} users?`
    // );
    // if (!confirmDelete) return;

    try {
      const res = await bulkDeleteAssets(selectedIds, "soft");

      if (res.status !== 200) throw new Error("Failed to delete Assets");

      openToast("success", "Assets deleted successfully!");
      setSelectedIds([]); // Clear selection after deletion
      await onRefresh(); // Refresh data after deletion
    } catch (error) {
      openToast("error", `Failed to delete Assets : ${error}`);
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <>
      <>
        {!isLoading && data?.devices?.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center py-10">
            <assetsIcons.no_assets_display />
            <CreateDevice>
              <div className="flex items-center relative py-2 border-2 border-black gap-1  pl-3 pr-3  text-white  rounded-lg bg-black transition-all duration-300">
                {/* <AssetsTabIcon className=" size-5" color="#fff" /> */}
                <span className="text-sm whitespace-nowrap  font-gilroyMedium rounded-lg ">
                  Add Device
                </span>
              </div>
            </CreateDevice>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200  bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
            {" "}
            <div className="flex justify-between items-center">
              <div className=" flex gap-3 w-fit">
                <h1 className="text-base pl-6 font-gilroyMedium">
                  {assetsText}
                </h1>
                <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                  {data?.total} Assets
                </h1>
              </div>

              {selectedIds.length > 0 && (
                <DeleteModal
                  handleBulkDelete={handleBulkDelete}
                  open={open}
                  setOpen={setOpen}
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
                  data={data?.devices}
                  selectedIds={selectedIds}
                  isLoading={status === "pending"}
                  setSelectedIds={setSelectedIds}
                  // checkboxSelection={{
                  //   uniqueField: "_id",
                  //   onSelectionChange: handleSelectionChange,
                  // }}
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
                              data?.image?.[0]?.url ??
                              "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                            }
                            alt="Device Logo"
                            className="size-10 object-cover rounded-full"
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
                      title:
                        assetsText === "Assigned Assets" ? "Assigned to" : "",
                      render: (record) => {
                        if (assetsText === "Assigned Assets") {
                          return <span>{record?.userName ?? "-"}</span>;
                        }
                      },
                    },

                    {
                      title:
                        assetsText === "Assigned Assets" ? "Assigned On" : "",
                      render: (record: StoreDevice) => {
                        if (assetsText === "Assigned Assets") {
                          const onboardingDate = record?.assigned_at!;

                          // Check if onboardingDate is null, undefined, or empty
                          if (!onboardingDate) {
                            return <div>-</div>; // Return "-" for null, undefined, or empty value
                          }

                          const date = new Date(onboardingDate);

                          // Check if the date is valid
                          if (isNaN(date.getTime())) {
                            return <div>-</div>; // Return "-" for invalid date
                          }

                          const formattedDate = date.toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          );

                          return <div>{formattedDate}</div>;
                        }
                      },
                    },
                    {
                      title: assetsText === "Assigned Assets" ? "Team" : "",
                      render: (record: StoreDevice) => {
                        if (assetsText === "Assigned Assets") {
                          return <span>{record?.teams ?? "-"}</span>;
                        }
                      },
                    },

                    {
                      title: "Serial Number",
                      render: (record) => {
                        return <span>{record?.serial_no ?? "-"}</span>;
                      },
                    },
                    {
                      title:
                        assetsText !== "Assigned Assets" ? "Purchased on" : "",
                      render: (record) => {
                        if (assetsText !== "Assigned Assets") {
                          const onboardingDate = record?.device_purchase_date;

                          // Check if onboardingDate is null, undefined, or empty
                          if (!onboardingDate) {
                            return <div>-</div>;
                          }

                          const date = new Date(onboardingDate);

                          // Check if the date is valid
                          if (isNaN(date.getTime())) {
                            return <div>-</div>;
                          }

                          const formattedDate = date.toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          );

                          return <div>{formattedDate}</div>;
                        }

                        return null;
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
                            color = "text-[#027A48] text-xs  bg-[#ECFDF3]";
                            break;
                          case "Old":
                            color = "text-[#F00] text-xs  bg-[#FFE0E0]";
                            break;
                          default:
                            color = "text-[#FF8000] text-xs  bg-[#FFFACB]";
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
                          ? new Date(record.warranty_expiary_date) > new Date()
                          : false;

                        return (
                          <span
                            className={`${
                              isWarrantyActive
                                ? "text-[#027A48] text-xs  px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#ECFDF3]"
                                : "text-[#F00] text-xs px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#FFE0E0]"
                            }`}
                          >
                            {isWarrantyActive ? "Active" : "Inactive"}
                          </span>
                        );
                      },
                    },

                    {
                      title: "",
                      render: (record: Device) =>
                        assetsText === "Unassigned Assets" ? (
                          <div className="flex gap-5 -ml-2 ">
                            <SoftDeleteAsset
                              id={record?._id ?? "error"}
                              onRefresh={onRefresh}
                            >
                              <DeleteTableIcon className="size-6" />
                            </SoftDeleteAsset>
                            <AssignAsset device={record} onRefresh={onRefresh}>
                              <div
                                className={buttonVariants({
                                  variant: "primary",
                                  className: "w-full",
                                })}
                              >
                                Assign
                              </div>
                            </AssignAsset>
                          </div>
                        ) : assetsText === "Assigned Assets" ? (
                          <div className="flex gap-5 -ml-2 items-center">
                            {/* <SoftDeleteAsset
                              id={record?._id}
                              onRefresh={onRefresh}
                            >
                              <DeleteTableIcon className="size-6" />
                            </SoftDeleteAsset> */}
                            <Link
                              href={`/assets/${record?._id}`}
                              onMouseEnter={() =>
                                router.prefetch(`/assets/${record?._id}`)
                              }
                            >
                              <div
                                className={buttonVariants({
                                  variant: "primary",
                                  className: "w-full",
                                })}
                              >
                                Manage
                              </div>
                            </Link>
                          </div>
                        ) : assetsText === "Inactive Assets" ? (
                          <div className="flex gap-5 -ml-2">
                            <PermanentAssetsDelete
                              id={record?._id!}
                              onRefresh={onRefresh}
                            >
                              <DeleteTableIcon className="size-6" />
                            </PermanentAssetsDelete>

                            <RestoreDevice
                              id={record?._id!}
                              onRefresh={onRefresh}
                            >
                              <div
                                className={buttonVariants({
                                  variant: "primary",
                                  className: "w-full",
                                })}
                              >
                                Restore
                              </div>
                            </RestoreDevice>
                          </div>
                        ) : (
                          ""
                        ),
                    },
                  ]}
                />
              </div>
            </Suspense>
          </div>
        )}
      </>
    </>
  );
}

export default AssignedAssets;
