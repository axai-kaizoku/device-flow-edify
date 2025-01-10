"use client";

import { bulkUploadDevices } from "@/server/deviceActions";
import { Keyboard, Laptop2, Monitor, Mouse, Smartphone } from "lucide-react";
import React, { useState } from "react";
import BulkUpload from "./BulkUpload";

type DeviceTypeProps = {
  data: string;
  setData: (newData: string) => void;
  error?: string;
  closeBtn: () => void;
  setTotalSteps: (steps: number) => void;
};

const DeviceTypeOnboarding: React.FC<DeviceTypeProps> = ({
  data,
  setData,
  error,
  closeBtn,
  setTotalSteps,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    data || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelect = (device: string) => {
    setSelectedDevice(device);
    setData(device);
  };

  const deviceList = [
    {
      id: "laptop",
      label: "Laptop",
      logo: <Laptop2 className="size-6 " />,
      steps: 2,
    },
    {
      id: "keyboard",
      label: "Keyboard",
      logo: <Keyboard className="size-6 " />,
      steps: 1,
    },
    {
      id: "mobile",
      label: "Mobile",
      logo: <Smartphone className="size-6 " />,
      steps: 2,
    },
    {
      id: "mouse",
      label: "Mouse",
      logo: <Mouse className="size-6 " />,
      steps: 1,
    },
    {
      id: "monitor",
      label: "Monitor",
      logo: <Monitor className="size-6 " />,
      steps: 1,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex">
        <BulkUpload
          closeBtn={closeBtn}
          requiredKeys={[
            "device_name",
            "asset_serial_no",
            "serial_no",
            "device_purchase_date",
            "ram",
            "processor",
            "storage",
            "warranty_expiary_date",
            "os",
            "price",
            "ownership",
            "purchase_order",
            "device_type",
            "brand",
            "model",
            "condition",
            "serial_no",
          ]}
          bulkApi={bulkUploadDevices}
        />
      </div>

      <div className="flex items-center justify-center mt-8 mb-4">
        <div className="border-t border-gray-400 w-7"></div>
        <span className="mx-4 font-gilroySemiBold 2xl:text-lg text-base text-gray-400">
          OR
        </span>
        <div className="border-t border-[#B1B1B1] w-7"></div>
      </div>

      <div className="flex flex-col gap-6 mb-19">
        <div className="font-gilroySemiBold 2xl:text-2xl text-xl">
          Device Type
        </div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          {deviceList?.map((device, index) => (
            <div
              key={device?.id}
              className={`${
                index === deviceList?.length - 1 && deviceList?.length % 2 !== 0
                  ? "col-span-2"
                  : ""
              } flex items-center border-[2px] rounded-xl p-2 text-lg cursor-pointer ${
                selectedDevice === device?.id
                  ? "border-black"
                  : "border-[#D5D5D5]"
              }`}
              onClick={() => {
                setTotalSteps(device?.steps);
                handleSelect(device?.id);
              }}
            >
              <input
                type="radio"
                id={device?.id}
                name="device"
                checked={selectedDevice === device?.id}
                onChange={() => {
                  setTotalSteps(device?.steps);
                  handleSelect(device?.id);
                }}
                className="sr-only"
              />
              <label
                htmlFor={device?.id}
                className={`cursor-pointer ${
                  selectedDevice === device?.id ? "text-black" : "text-gray-600"
                } flex justify-center items-center gap-3 py-1.5 px-2`}
              >
                <span className="text-black">{device?.logo}</span>
                <span className="text-black font-gilroyMedium text-lg">
                  {device?.label}
                </span>
              </label>
            </div>
          ))}
          {error && (
            <p className="text-red-500 text-sm font-normal transition-all duration-300">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceTypeOnboarding;
