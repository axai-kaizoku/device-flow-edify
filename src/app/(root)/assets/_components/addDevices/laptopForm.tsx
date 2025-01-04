// basicDetailsDevice.tsx

import { Icon } from "@/components/wind/Icons";
import { getAllDevices } from "@/server/deviceActions";
import React, { useState } from "react";
import { DevicePage1 as DevicePage1, FormErrors } from "./_components/types";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";

interface BasicDetailsProps {
  data: DevicePage1;
  setData: (data: Partial<DevicePage1>) => void;
  errors: FormErrors;
  deviceType: string;
}

const LaptopForm: React.FC<BasicDetailsProps> = ({
  data,
  setData,
  errors,
  deviceType,
}) => {
  const [selectedOS, setSelectedOS] = useState<string | null>(data?.os || "");
  const [formData, setFormData] = useState<DevicePage1>(data);
  const [deviceOptions, setDeviceOptions] = useState<string[]>([]); // Store device options
  const [isDeviceDropdownActive, setDeviceDropdownActive] =
    useState<boolean>(false); // Trigger fetch on focus

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e?.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    setData(updatedFormData); // Set the data after updating formData to avoid outdated values
  };

  // console.log(data);

  // Handle OS selection
  const handleSelectOS = (os: string) => {
    const updatedFormData = {
      ...formData,
      os: os,
    };
    setSelectedOS(os);
    setFormData(updatedFormData);
    setData(updatedFormData); // Ensure you setData after updating formData
  };

  const fetchDevices = async () => {
    try {
      const devices = await getAllDevices(); // API call
      console.log("Devices:", devices);
      // Map to just device names if the API response returns full device objects
      const deviceNames = devices.map((device) => device?.device_name);
      console.log("Device Names:", deviceNames);
      setDeviceOptions(deviceNames);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
    }
  };

  // Trigger fetch when device_name is focused
  const handleDeviceNameFocus = () => {
    if (!isDeviceDropdownActive) {
      setDeviceDropdownActive(true); // Prevent multiple calls
      fetchDevices();
    }
  };

  const operatingSystems = [
    {
      id: "macos",
      name: "MacOS",
      description: "High Sierra, Monterey, Ventura",
      icon: <Icon type={"OutlinedNote"} color="black" />,
    },
    {
      id: "windows",
      name: "Windows",
      description: "Windows 8, Windows 10, Windows 11",
      icon: <Icon type={"OutlinedNote"} color="black" />,
    },
    {
      id: "others",
      name: "Others",
      description: "Linux, DOS, Chrome OS",
      icon: <Icon type={"OutlinedNote"} color="black" />,
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="2xl:text-2xl text-[22px] font-gilroySemiBold mb-5">Select OS</h1>

      <div
        className={`flex justify-between items-center flex-wrap gap-4 w-full ${
          !errors?.os && "mb-8"
        }`}
      >
        {deviceType === "laptop" &&
          operatingSystems?.map((os, index) => (
            <div
              key={os?.id}
              className={`flex-grow-0 flex-shrink-0 ${
                index < 2 ? "w-[calc(50%-8px)]" : "w-[calc(50%-8px)]"
              } px-4 py-3 flex items-start border-[2px] rounded-[14px] cursor-pointer ${
                selectedOS === os?.id ? "border-black" : "border-[#D5D5D5]"
              }`}
              onClick={() => handleSelectOS(os?.id)}
            >
              <input
                type="radio"
                id={os?.id}
                checked={selectedOS === os?.id}
                onChange={() => handleSelectOS(os?.id)}
                className="mr-3 h-4 w-4 mt-1 accent-black sr-only"
              />
              <label htmlFor={os?.id} className="flex flex-col">
                <p className="flex items-center font-gilroyMedium gap-2 text-xl">
                  {os?.icon}
                  {os?.name}
                </p>
                <span className="text-xs text-[#C8C8C8] font-gilroyMedium">
                  {os?.description}
                </span>
              </label>
            </div>
          ))}
      </div>

      {errors?.os && <p className="text-red-500 text-sm mb-7">{errors?.os}</p>}

      <div className="flex flex-col gap-8">
        <div className="">
          <SelectDropdown
            options={[
              { label: "Lenovo", value: "Lenovo" },
              { label: "Apple", value: "Apple" },
              { label: "Dell", value: "Dell" },
              { label: "HP", value: "HP" },
              { label: "ASUS", value: "ASUS" },
            ]}
            onSelect={(data) => {
              const updatedFormData = {
                ...formData,
                brand: data?.value,
              };
              setFormData(updatedFormData);
              setData(updatedFormData);
            }}
            label="Brand"
            error={errors?.brand}
            value={`${formData?.brand ? formData?.brand : "eg: Lenovo, etc"}`}
            className=" rounded-xl border border-[#5F5F5F]"
          />
        </div>

        <div>
          <FormField
            label="Model Name"
            id="model"
            name="model"
            type="text"
            value={formData?.model}
            onChange={handleChange}
            error={errors?.model}
            placeholder="eg: X14D, etc"
          />
        </div>

        <div className="flex gap-4">
          <div className="z-20 flex-1">
            <SelectDropdown
              options={[
                { label: "Intel Core i3", value: "Intel Core i3" },
                { label: "Intel Core i5", value: "Intel Core i5" },
                { label: "Intel Core i7", value: "Intel Core i7" },
                { label: "AMD Ryzen 5", value: "AMD Ryzen 5" },
                { label: "Apple M1", value: "Apple M1" },
              ]}
              onSelect={(data) => {
                const updatedFormData = {
                  ...formData,
                  processor: data?.value,
                };
                setFormData(updatedFormData);
                setData(updatedFormData);
              }}
              label="Processor"
              error={errors?.processor}
              value={`${
                formData?.processor
                  ? formData?.processor
                  : "eg: Intel Core i3, etc"
              }`}
              className="rounded-xl border border-[#5F5F5F]"
            />
          </div>

          <div className="flex-1">
            <SelectDropdown
              options={[
                { label: "4GB", value: "4GB" },
                { label: "8GB", value: "8GB" },
                { label: "16GB", value: "16GB" },
                { label: "32GB", value: "32GB" },
                { label: "64GB", value: "64GB" },
              ]}
              onSelect={(data) => {
                const updatedFormData = {
                  ...formData,
                  ram: data?.value,
                };
                setFormData(updatedFormData);
                setData(updatedFormData);
              }}
              label="RAM"
              error={errors?.ram}
              value={`${formData?.ram ? formData?.ram : "eg: 8GB, etc"}`}
              className=" rounded-xl border border-[#5F5F5F]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <SelectDropdown
              options={[
                { label: "128GB", value: "128GB" },
                { label: "256GB", value: "256GB" },
                { label: "512GB", value: "512GB" },
                { label: "1TB", value: "1TB" },
                { label: "2TB", value: "2TB" },
              ]}
              onSelect={(data) => {
                const updatedFormData = {
                  ...formData,
                  storage: data?.value,
                };
                setFormData(updatedFormData);
                setData(updatedFormData);
              }}
              label="Storage"
              error={errors?.storage}
              value={`${
                formData?.storage ? formData?.storage : "eg: 256GB, etc"
              }`}
              className="rounded-xl border border-[#5F5F5F]"
            />
          </div>

          <div className="flex-1">
            <SelectDropdown
              options={[
                { label: "Good", value: "Good" },
                { label: "Best", value: "Best" },
                { label: "Old", value: "Old" },
                { label: "New", value: "New" },
              ]}
              onSelect={(data) => {
                const updatedFormData = {
                  ...formData,
                  condition: data?.value,
                };
                setFormData(updatedFormData);
                setData(updatedFormData);
              }}
              label="Condition"
              error={errors?.condition}
              value={`${
                formData?.condition ? formData?.condition : "eg: Best, etc"
              }`}
              className="rounded-xl border border-[#5F5F5F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopForm;
