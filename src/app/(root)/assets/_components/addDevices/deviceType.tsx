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
      {!isEditForm ? (
        <>
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
        </>
      ) : null}

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
                <span className="text-black font-gilroyMedium text-lg">
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

      <div className="flex flex-col gap-2 mt-2 mb-19">
        <div className="font-gilroySemiBold 2xl:text-2xl text-xl">
          Device Assign to
        </div>

        <div className="pt-3 w-full">
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
