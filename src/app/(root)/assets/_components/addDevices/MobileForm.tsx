// basicDetailsDevice.tsx

import { Icon } from "@/components/wind/Icons";
import { getAllDevices } from "@/server/deviceActions";
import React, { useState } from "react";
import {
	DevicePage1 as DevicePage1,
  FormErrors,
} from "./_components/types";
import { FormField } from "@/app/(root)/settings/_components/form-field";

interface BasicDetailsProps {
  data: DevicePage1;
  setData: (data: Partial<DevicePage1>) => void;
  errors: FormErrors;
  deviceType: string;
}

const MobileForm: React.FC<BasicDetailsProps> = ({
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
      id: "android",
      name: "Android",
      description: "Android 13, Android 14, Android 15",
      icon: <Icon type={"OutlinedNote"} color="black" />,
    },
    {
      id: "apple",
      name: "Apple",
      description: "ios 10, ios 12, ios 13",
      icon: <Icon type={"OutlinedNote"} color="black" />,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-gilroyMedium py-5">Select OS</h1>

      <div className={`flex justify-between items-center flex-wrap gap-4 w-full ${!errors?.os && "mb-7" }`}>
        {deviceType === "mobile" &&
          operatingSystems?.map((os, index) => (
            <div
              key={os?.id}
              className={`flex-grow ${
                index < 2 ? "w-[calc(50%-8px)]" : "w-[calc(50%-8px)]"
              } px-4 py-3 flex items-start border-[2px] rounded-[14px] cursor-pointer ${
                selectedOS === os.id ? "border-black" : "border-[#D5D5D5]"
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


	  <div className="flex flex-col gap-6">
		<div>
			<FormField
				label="Brand Name"
				id="brand"
				name="brand"
				type="text"
				value={formData?.brand}
				onChange={handleChange}
				error={errors?.brand}
				placeholder="eg: Lenovo, etc"
				className="outline-[#5F5F5F] border"
			/>
		</div>

        <div>
			<FormField
				label="Device Name"
				id="device_name"
				name="device_name"
				type="text"
				value={formData?.device_name}
				onChange={handleChange}
				error={errors?.device_name}
				placeholder="eg: Lenovo, etc"
				className="outline-[#5F5F5F] border"
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
			<div className="flex-1">
				<FormField
				label="Processor"
				id="processor"
				name="processor"
				type="text"
				value={formData?.processor}
				onChange={handleChange}
				error={errors?.processor}
				placeholder="eg: X14D, etc"
				/>
			</div>
			<div className="flex-1">
				<FormField
				label="RAM"
				id="ram"
				name="ram"
				type="text"
				value={formData?.ram}
				onChange={handleChange}
				error={errors?.ram}
				placeholder="eg: X14D, etc"
				/>
			</div>
		</div>

		<div className="flex gap-4">
			<div className="flex-1">
				<FormField
				label="Storage"
				id="storage"
				name="storage"
				type="text"
				value={formData?.storage}
				onChange={handleChange}
				error={errors?.storage}
				placeholder="eg: X14D, etc"
				/>
			</div>
			<div className="flex-1">
				<FormField
				label="Condition"
				id="condition"
				name="condition"
				type="text"
				value={formData?.condition}
				onChange={handleChange}
				error={errors?.condition}
				placeholder="eg: X14D, etc"
				/>
			</div>
		</div>
	  </div>
    </div>
  );
};

export default MobileForm;
