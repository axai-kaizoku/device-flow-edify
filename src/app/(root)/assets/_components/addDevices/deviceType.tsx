"use client";

import { Keyboard, Laptop2, Monitor, Mouse, Smartphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { bulkUploadDevices } from "@/server/deviceActions";
import BulkUpload from "@/components/bulk-upload";
import { SelectInput } from "@/components/dropdown/select-input";
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import { FormData } from "./_components/types";

type DeviceTypeProps = {
  data: string;
  setData: (newData: string) => void;
  error?: string;
  closeBtn: () => void;
  isEditForm?: boolean;
  setTotalSteps: (steps: number) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  userName?: string;
};

const DeviceType = ({
  data,
  setData,
  error,
  closeBtn,
  setTotalSteps,
  isEditForm,
  formData: { userId },
  setFormData,
  userName,
}: DeviceTypeProps) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    data ?? ""
  );
  const [user, setUser] = useState<User>({ _id: userId });

  useEffect(() => {
    setSelectedDevice(data ?? "");
    const count = deviceList.filter((val) => val.id === data);
    setTotalSteps(count?.[0]?.steps);
    setData(data);
    if (user._id) {
      setFormData((prev) => ({ ...prev, userId: user._id }));
    }
  }, [data, user._id]);

  const handleSelect = (device: string) => {
    setSelectedDevice(device);
    setData(device);
  };

  const deviceList = [
    {
      id: "laptop",
      label: "Laptop",
      logo: <Laptop2 className="size-5 " />,
      steps: 2,
    },
    {
      id: "keyboard",
      label: "Keyboard",
      logo: <Keyboard className="size-5 " />,
      steps: 1,
    },
    {
      id: "mobile",
      label: "Mobile",
      logo: <Smartphone className="size-5 " />,
      steps: 2,
    },
    {
      id: "mouse",
      label: "Mouse",
      logo: <Mouse className="size-5 " />,
      steps: 1,
    },
    {
      id: "monitor",
      label: "Monitor",
      logo: <Monitor className="size-5 " />,
      steps: 1,
    },
  ];

  return (
    <div className="w-full">
      {!isEditForm ? (
        <>
          <div className="flex">
            <BulkUpload
              sampleData={{
                model: "XXXX",
                device_name: "YYYYY",
                serial_no: "XXXX1234",
                device_purchase_date: "09/12/2023",
                ram: "16GB",
                processor: "Intel Core i5",
                storage: "256GB",
                warranty_expiary_date: "21/11/2024",
                os: "Windows",
                price: 12000,
                device_type: "Laptop",
                brand: "HP",
                device_condition: "Fair",
              }}
              closeBtn={closeBtn}
              requiredKeys={[
                "model",
                "device_name",
                "serial_no",
                "device_purchase_date",
                "ram",
                "processor",
                "storage",
                "warranty_expiary_date",
                "os",
                "price",
                "device_type",
                "brand",
                "device_condition",
              ]}
              bulkApi={bulkUploadDevices}
            />
          </div>
          <div className="flex items-center justify-center mt-3">
            <div className="border-t border-gray-400 w-7"></div>
            <span className="mx-2 font-gilroySemiBold  text-sm text-gray-400">
              OR
            </span>
            <div className="border-t border-[#B1B1B1] w-7"></div>
          </div>
        </>
      ) : null}

      <div className="flex flex-col gap-4 ">
        <div className="font-gilroyMedium  text-base">Device Type</div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          {deviceList?.map((device, index) => (
            <div
              key={device?.id}
              className={`${
                index === deviceList?.length - 1 && deviceList?.length % 2 !== 0
                  ? "col-span-2"
                  : ""
              } flex items-center border rounded-md p-2 text-lg cursor-pointer ${
                selectedDevice === device.id
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
                checked={selectedDevice === device.id}
                onChange={() => {
                  setTotalSteps(device?.steps);
                  handleSelect(device?.id);
                }}
                className="sr-only"
              />
              <label
                htmlFor={device?.id}
                className={`cursor-pointer ${
                  selectedDevice === device.id ? "text-black" : "text-gray-600"
                } flex justify-center items-center gap-3 py-1.5 px-2`}
              >
                <span className="text-black">{device?.logo}</span>
                <span className="text-black font-gilroyMedium text-sm">
                  {device?.label}
                </span>
              </label>
            </div>
          ))}
          {error && (
            <p className="text-red-500 text-xs font-gilroyMedium transition-all duration-300">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="font-gilroyMedium  text-base">Device Assign to</div>

        <div className="pt-2 w-full">
          <SelectInput
            fetchOptions={searchUsers}
            initialOptions={fetchUsers}
            optionValue={{ firstV: "first_name", secondV: "email" }}
            key={"assign-assets-form"}
            placeholder="Search by name, email, etc."
            onSelect={(data: User) => {
              setUser({
                email: data.email!,
                _id: data._id!,
                first_name: data.first_name!,
              });
            }}
            label="Assigning To"
            value={userName ? userName : user?.first_name!}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceType;
