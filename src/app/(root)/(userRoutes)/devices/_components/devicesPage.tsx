import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import Form from "./Form";
import { useRouter } from "next/navigation";
import { Device, getAllDevicesProp } from "@/server/deviceActions";
import { Icons } from "@/components/icons";

type DevicesProps = {
  devices: getAllDevicesProp;
};

const Devices = ({ devices }: DevicesProps) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const router = useRouter();

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
    <div className="flex p-4 gap-5">
      {devices.length > 0 ? (
        devices.map((device: Device) => {
          const warrantyDays = calculateWarrantyDays(
            device?.warranty_expiary_date!
          );
          const inWarranty = warrantyDays > 0;

          return (
            <div
              key={device._id}
              className="flex  rounded-[25px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.8)] backdrop-blur-[22.8px]  p-5 w-1/3 "
            >
              {/* Device Information */}
              <div
                className="flex flex-col  w-full gap-4 cursor-pointer"
                onClick={() => handleDeviceClick(device?._id)}
              >
                <div className="flex gap-5">
                  <img
                    src={
                      device?.image ||
                      "https://th.bing.com/th/id/R.d589fbf35245e2db2929bb113c0b1547?rik=fhPXY3J%2ff4BmSw&riu=http%3a%2f%2fwww.tracyandmatt.co.uk%2fwp%2fwp-content%2fuploads%2f2013%2f11%2fcomputer-laptop.png&ehk=GBtBE3fo5fsbw6lTC9D4mX%2fXwJRRolFdXxhiHPufbSg%3d&risl=&pid=ImgRaw&r=0"
                    }
                    alt={device?.device_name}
                    className="object-cover rounded-md size-20"
                  />
                  <div>
                    <h1 className="text-2xl font-gilroySemiBold">
                      {device?.device_name}
                    </h1>
                    <h1 className="text-[#7C7C7C] font-gilroyMedium text-lg">
                      {device?.serial_no}
                    </h1>
                  </div>
                </div>
                <div>
                  <Icons.emp_assets_border />
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Brand
                  </h1>
                  <h1 className="text-xl font-gilroySemiBold">
                    {device?.brand}
                  </h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Model
                  </h1>
                  <h1 className="text-xl font-gilroySemiBold">
                    {device?.custom_model}
                  </h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    RAM
                  </h1>
                  <h1 className="text-xl font-gilroySemiBold">{device?.ram}</h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Storage
                  </h1>
                  <h1 className="text-xl font-gilroySemiBold">
                    {device?.storage}
                  </h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Assigned On
                  </h1>
                  <h1 className="text-xl font-gilroySemiBold">24th November</h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Condition
                  </h1>
                  <h1 className="text-xl text-[#008910] font-gilroySemiBold">
                    Excellent
                  </h1>
                </div>
                <div>
                  <h1 className="text-[#737373] text-base font-gilroySemiBold">
                    Warranty Status
                  </h1>
                  <h1
                    className={`text-xl font-gilroySemiBold ${
                      inWarranty ? "text-[#008910]" : "text-[#FF0000]"
                    }`}
                  >
                    {inWarranty
                      ? `In Warranty: ${warrantyDays} days`
                      : "Out of Warranty"}
                  </h1>
                </div>
                <div>
                  <button
                    className="bg-black py-2.5 w-full text-lg font-gilroySemiBold rounded-full text-white"
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
        <div className="flex w-full justify-center items-center p-5">
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
            <Form device={selectedDevice} closeBtn={closeSheet} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Devices;
