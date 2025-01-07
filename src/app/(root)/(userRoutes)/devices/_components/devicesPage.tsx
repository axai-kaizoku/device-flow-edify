"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useRouter } from "next/navigation";
import { Device, getAllDevicesProp } from "@/server/deviceActions";
import { Icons } from "@/components/icons";
import { IssueForm } from "./issue-form";
import { UserData } from "@/app/store/authSlice";
import { useSelector } from "react-redux";

export type LoggedInUser = UserData;

type DevicesProps = {
  devices: getAllDevicesProp;
};

const Devices = ({ devices }: DevicesProps) => {
  const router = useRouter();
  const user: UserData = useSelector((state: any) => state.auth.userData);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleDeviceClick = (id: string | undefined) => {
    router.push(`devices/${id}`);
  };

  const handleReportClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const closeSheet = () => {
    setSelectedDevice(null);
  };

  // Helper function to calculate warranty days
  const calculateWarrantyDays = (expiryDate: string): number => {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  };

  return (
    <div className="flex py-2 gap-5">
      {devices.length > 0 ? (
        devices.map((device: Device) => {
          const warrantyDays = calculateWarrantyDays(
            device?.warranty_expiary_date!
          );
          const inWarranty = warrantyDays > 0;

          return (
            <div
              key={device._id}
              className="flex rounded-[25px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.8)] backdrop-blur-[22.8px]  px-6 py-4 w-1/3"
            >
              {/* Device Information */}
              <div
                className="flex flex-col  w-full gap-4 cursor-pointer"
                onClick={() => handleDeviceClick(device?._id)}
              >
                <div className="flex justify-start items-center  gap-4">
                  <img
                    src={
                      "data:image/jpeg;base64,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"
                    }
                    alt="Asset Image"
                    className="   object-cover size-20 border  flex justify-center items-center rounded-full"
                  />

                  <div>
                    <div className="2xl:text-2xl text-xl font-gilroySemiBold text-black">
                      {device?.device_name ?? "Issue Name"}
                    </div>
                    <div className="font-gilroyMedium 2xl:text-lg text-base text-[#7C7C7C]">
                      {device?.serial_no ?? "Serial"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="h-[1px] bg-[#D6D6D6]"></div>
                </div>

                <div className="flex flex-col gap-2 ">
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Brand
                    </h1>
                    <h1 className="2xl:text-lg text-base font-gilroySemiBold">
                      {device?.brand}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Model
                    </h1>
                    <h1 className="2xl:text-lg text-base font-gilroySemiBold">
                      {device?.custom_model}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      RAM
                    </h1>
                    <h1 className="2xl:text-lg text-base font-gilroySemiBold">
                      {device?.ram}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Storage
                    </h1>
                    <h1 className="2xl:text-lg text-base font-gilroySemiBold">
                      {device?.storage}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Assigned On
                    </h1>
                    <h1 className="2xl:text-lg text-base font-gilroySemiBold">
                      24th November
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Condition
                    </h1>
                    <h1 className="2xl:text-lg tex-base text-[#008910] font-gilroySemiBold">
                      Excellent
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[#737373] text-[14px] font-gilroyMedium">
                      Warranty Status
                    </h1>
                    <h1
                      className={`2xl:text-lg text-base font-gilroySemiBold ${
                        inWarranty ? "text-[#008910]" : "text-[#FF0000]"
                      }`}
                    >
                      {inWarranty
                        ? `In Warranty: ${warrantyDays} days`
                        : "Out of Warranty"}
                    </h1>
                  </div>
                </div>

                <div>
                  <button
                    className="bg-black py-2 w-full text-lg font-gilroySemiBold rounded-full text-white"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event propagation
                      handleReportClick(device);
                    }}
                  >
                    Report an Issue
                  </button>
                </div>
              </div>

              {/* Report Issue Button */}
            </div>
          );
        })
      ) : (
        <div className="flex w-full justify-center items-center">
          {" "}
          <Icons.no_asset_assigned />
        </div>
      )}

      {/* Single Sheet for the Selected Device */}
      <Sheet
        open={selectedDevice !== null}
        onOpenChange={(open) => !open && closeSheet()}
      >
        <SheetContent>
          {selectedDevice && (
            <IssueForm
              user={user}
              device={selectedDevice}
              closeBtn={closeSheet}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Devices;
