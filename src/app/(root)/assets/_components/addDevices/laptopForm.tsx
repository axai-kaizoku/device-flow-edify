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
      // Map to just device names if the API response returns full device objects
      const deviceNames = devices.map((device) => device?.device_name);
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
      icon: (
        <svg
          width="20"
          height="25"
          viewBox="0 0 25 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Page-1">
            <g id="Dribbble-Light-Preview">
              <g id="icons">
                <path
                  id="apple-[#173]"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.009 5.12202C18.0264 3.94289 18.7122 2.3006 18.5245 0.666565C17.0584 0.722383 15.2847 1.60311 14.2335 2.78085C13.2895 3.82602 12.4654 5.49604 12.6869 7.09799C14.3224 7.21938 15.9916 6.30254 17.009 5.12202ZM20.6764 15.4931C20.7173 19.717 24.5427 21.1221 24.585 21.1403C24.554 21.2394 23.974 23.1424 22.57 25.1099C21.3551 26.8095 20.095 28.5023 18.1096 28.5386C16.1596 28.5734 15.5316 27.4307 13.3007 27.4307C11.0713 27.4307 10.3742 28.5021 8.52853 28.5733C6.61231 28.6417 5.15186 26.7345 3.92846 25.0404C1.42524 21.5756 -0.48675 15.249 2.08138 10.9791C3.35699 8.85941 5.63585 7.51509 8.11085 7.4816C9.9918 7.44671 11.7683 8.69443 12.9183 8.69443C14.0684 8.69443 16.2273 7.19434 18.4963 7.41482C19.4459 7.4525 22.1128 7.78171 23.8244 10.1832C23.6862 10.2655 20.6425 11.9627 20.6764 15.4931Z"
                  fill="#AAAAAA"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: "windows",
      name: "Windows",
      description: "Windows 8, Windows 10, Windows 11",
      icon: (
        <svg
          width="25"
          height="20"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group">
            <path
              id="Vector"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.06995 10.124C3.18314 9.72827 3.28174 9.38147 3.38166 9.03527C4.11711 6.49127 4.85314 3.94713 5.58785 1.40284C5.61645 1.30306 5.6471 1.22259 5.76103 1.17676C7.03325 0.666807 8.33303 0.264744 9.70222 0.11677C11.5433 -0.082493 13.2332 0.348016 14.794 1.32591C14.9973 1.4534 15.1939 1.59105 15.4017 1.7097C15.5342 1.78575 15.5529 1.86607 15.5103 2.01021C14.8996 4.10675 14.2947 6.20564 13.6884 8.3038C13.4769 9.03527 13.2595 9.76585 13.0548 10.4998C13.0092 10.6631 12.9715 10.6907 12.8207 10.5877C11.9214 9.97676 10.9727 9.4643 9.91077 9.19135C8.57091 8.84706 7.23281 8.91618 5.89589 9.20889C4.94334 9.41744 4.02529 9.73225 3.06995 10.124Z"
              fill="#F35325"
            />
            <path
              id="Vector_2"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.2793 13.3614C17.5891 13.3729 16.0983 12.7794 14.7098 11.8676C14.3173 11.6089 14.3178 11.6117 14.4467 11.1662C15.2329 8.4484 16.0173 5.7299 16.8058 3.01258C16.8827 2.74626 16.8258 2.69763 17.1249 2.89807C18.1153 3.56085 19.1583 4.10647 20.3397 4.34582C21.587 4.59829 22.8254 4.51207 24.0563 4.23661C24.8304 4.06328 25.5822 3.8201 26.3204 3.53491C26.4268 3.49409 26.5359 3.4257 26.6454 3.52695C26.7524 3.62585 26.7029 3.73712 26.6699 3.85046C25.8815 6.57544 25.0936 9.30043 24.3107 12.0269C24.2747 12.1542 24.2081 12.2164 24.0904 12.2636C22.8055 12.778 21.4908 13.1825 20.1054 13.3147C19.8313 13.341 19.5551 13.3464 19.2793 13.3614Z"
              fill="#81BC06"
            />
            <path
              id="Vector_3"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.8113 13.7224C23.6388 14.3192 23.4804 14.8682 23.3217 15.4174C22.6571 17.7173 21.9896 20.0175 21.3313 22.3199C21.2772 22.5077 21.1824 22.6042 21.0016 22.674C19.868 23.1111 18.7152 23.4704 17.5058 23.6404C15.6341 23.9027 13.8934 23.549 12.2772 22.5752C12.0098 22.4144 11.7517 22.237 11.4823 22.0793C11.3492 22.0011 11.3367 21.9189 11.3787 21.7776C11.9567 19.7922 12.5287 17.8044 13.1032 15.8177C13.3366 15.009 13.5708 14.2 13.8046 13.392C13.8792 13.1372 13.8801 13.1384 14.1136 13.2919C14.9537 13.8465 15.829 14.3269 16.8046 14.6037C18.2119 15.002 19.6201 14.9363 21.03 14.6237C21.9679 14.4163 22.8729 14.1023 23.8113 13.7224Z"
              fill="#FFBA08"
            />
            <path
              id="Vector_4"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5385 12.2798C12.3967 12.7683 12.2652 13.2212 12.1342 13.6743C11.445 16.0575 10.7536 18.4408 10.0711 20.8263C10.0118 21.0308 9.95732 21.0355 9.79195 20.9226C8.84457 20.2765 7.84147 19.7459 6.71148 19.4885C5.43189 19.1962 4.15909 19.275 2.88864 19.5534C2.09291 19.7277 1.32062 19.9785 0.560559 20.2708C0.460632 20.3091 0.358348 20.3645 0.254295 20.2793C0.137862 20.1844 0.188414 20.0686 0.220397 19.958C1.00669 17.2401 1.79357 14.5225 2.5781 11.8041C2.61155 11.6908 2.6683 11.6252 2.78237 11.5795C4.0876 11.0544 5.4229 10.6466 6.83116 10.5163C8.56808 10.3564 10.1766 10.7508 11.6645 11.6534C11.9186 11.8077 12.1695 11.9683 12.4207 12.1288C12.4847 12.1702 12.5732 12.2062 12.5385 12.2798Z"
              fill="#05A6F0"
            />
          </g>
        </svg>
      ),
    },
    {
      id: "others",
      name: "Others",
      description: "Linux, DOS, Chrome OS",
      icon: (
        <svg
          width="23"
          height="25"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.9572 13.048C24.9572 19.8047 19.4795 25.2825 12.7224 25.2825C5.96513 25.2825 0.487549 19.8047 0.487549 13.048C0.487549 6.29089 5.96521 0.813232 12.7224 0.813232C19.4796 0.813232 24.9572 6.29089 24.9572 13.048Z"
            fill="#DD4814"
          />
          <path
            d="M4.40335 11.4142C3.50076 11.4142 2.76953 12.1455 2.76953 13.048C2.76953 13.9501 3.50076 14.6814 4.40335 14.6814C5.30543 14.6814 6.03666 13.9501 6.03666 13.048C6.03666 12.1455 5.30543 11.4142 4.40335 11.4142ZM16.0662 18.8383C15.2849 19.2896 15.017 20.2881 15.4684 21.0689C15.9191 21.8502 16.9176 22.1181 17.6989 21.6668C18.4801 21.216 18.748 20.2176 18.2968 19.4362C17.846 18.6554 16.847 18.3876 16.0662 18.8383ZM7.95146 13.048C7.95146 11.4338 8.75326 10.0077 9.98013 9.14406L8.78592 7.14388C7.35676 8.09919 6.2934 9.55899 5.8515 11.2687C6.36714 11.6895 6.69718 12.33 6.69718 13.048C6.69718 13.7655 6.36714 14.4061 5.8515 14.8268C6.29282 16.537 7.35619 17.9969 8.78592 18.9522L9.98013 16.9515C8.75326 16.0884 7.95146 14.6624 7.95146 13.048ZM12.7226 8.27637C15.2152 8.27637 17.2602 10.1875 17.4749 12.6248L19.8025 12.5905C19.6879 10.7911 18.9019 9.17579 17.6941 7.98798C17.073 8.22263 16.3556 8.18674 15.7355 7.82928C15.1143 7.47083 14.7248 6.86613 14.6184 6.20971C14.0147 6.04311 13.3793 5.95189 12.7225 5.95189C11.5933 5.95189 10.5257 6.21712 9.57779 6.68629L10.7128 8.72021C11.3234 8.43607 12.0046 8.27637 12.7226 8.27637ZM12.7226 17.8192C12.0046 17.8192 11.3234 17.6594 10.7129 17.3754L9.57787 19.4092C10.5258 19.879 11.5934 20.1443 12.7226 20.1443C13.3795 20.1443 14.0148 20.053 14.6184 19.8859C14.7249 19.2295 15.1145 18.6253 15.7355 18.2662C16.3561 17.9082 17.073 17.873 17.6941 18.1076C18.902 16.9198 19.688 15.3045 19.8025 13.5051L17.4744 13.4708C17.2602 15.9087 15.2153 17.8192 12.7226 17.8192ZM16.0657 7.25674C16.847 7.70793 17.8455 7.44068 18.2963 6.65938C18.7475 5.87809 18.4803 4.87954 17.6989 4.42821C16.9176 3.97746 15.9191 4.24528 15.4677 5.02658C15.017 5.80744 15.2849 6.80599 16.0657 7.25674Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="2xl:text-2xl text-xl font-gilroySemiBold mb-5">
        Select OS
      </h1>

      <div
        className={`flex text-xs font-gilroyMedium justify-between items-center flex-wrap gap-4 w-full ${
          !errors?.os && "mb-8"
        }`}
      >
        {deviceType === "laptop" &&
          operatingSystems?.map((os, index) => (
            <div
              key={os?.id}
              className={`flex-grow-0 flex-shrink-0 ${
                index < 2 ? "w-[calc(50%-8px)]" : "w-[calc(50%-8px)]"
              } px-4 py-3 flex items-start border-[2px] rounded-xl cursor-pointer ${
                selectedOS === os?.id ? "border-black " : "border-[#D5D5D5]"
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
                <p className="flex items-center font-gilroyMedium gap-2 text-lg">
                  <span className="-mt-1">{os?.icon}</span>
                  {os?.name}
                </p>
                <span
                  className={`text-xs font-gilroyMedium ${
                    selectedOS === os?.id ? "text-black" : "text-gray-400"
                  }`}
                >
                  {os?.description}
                </span>
              </label>
            </div>
          ))}
      </div>

      {errors?.os && <p className="text-red-500 text-xs font-gilroyMedium mb-7">{errors?.os}</p>}

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
            value={`${formData?.brand ?? ""}`}
            placeholder="eg: Lenovo, etc"
            className=" rounded-xl   text-black border border-[#5F5F5F]"
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
            placeholder=" eg: X14D, etc"
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
              value={`${formData?.processor ?? ""}`}
              placeholder="eg: Intel Core i3, etc"
              className="rounded-xl  text-black border border-[#5F5F5F]"
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
              value={formData?.ram ?? ""}
              className="rounded-xl  text-black border border-[#5F5F5F]"
              placeholder="eg: 8GB, etc"
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
              value={`${formData?.storage ?? ""}`}
              placeholder="eg: 256GB, etc"
              className="rounded-xl  text-black border border-[#5F5F5F]"
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
              value={`${formData?.condition ?? ""}`}
              placeholder="eg: Best, etc"
              className="rounded-xl  text-black border border-[#5F5F5F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopForm;
