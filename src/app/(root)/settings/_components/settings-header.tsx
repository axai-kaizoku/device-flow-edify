"use client";
import { Icons } from "@/components/icons";
import { Org } from "@/server/orgActions";
import React, { useState } from "react";
import { LogoCompanyModal } from "./logo-company";

function SettingsHeader({ data }: { data: Org }) {
  const [logo, setLogo] = useState<string | null>(data?.logo || null);

  // Handle logo update from LogoCompanyModal
  const handleLogoUpdate = (newLogo: string | null) => {
    setLogo(newLogo); // Update the logo when the user uploads or removes it
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl text-secondary mb-8">Settings</h1>
        <div className="flex gap-7">
          {/* Company Information Card */}
          <div className="relative flex rounded-[55px] border border-gray-300 bg-white backdrop-blur-md shadow-md gap-3 h-fit p-6 w-full max-w-sm items-center">
            <div>
              {/* Display the logo */}
              {logo ? (
                <img
                  src={logo}
                  alt="Company Logo"
                  className="size-24 rounded-full border object-cover"
                />
              ) : (
                <Icons.company_logo className="w-24 h-24 text-gray-400" />
              )}
            </div>
            {/* Modal trigger for editing the logo */}
            <LogoCompanyModal id={data?._id!} onLogoUpdate={handleLogoUpdate}>
              <Icons.settings_edit className="absolute left-[4.6rem] bottom-6 cursor-pointer" />
            </LogoCompanyModal>

            <div className="flex flex-col gap-2 mt-4 sm:mt-0">
              <h1 className="text-primary text-2xl font-semibold">
                {data?.legal_entity_name ?? "N/A"}
              </h1>
              <h2 className="text-secondary text-lg font-semibold">
                {data?.email ?? "N/A"}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="text-success bg-success-foreground rounded-full px-3 py-1 text-sm font-medium">
                  Company
                </span>
                <span className="text-info bg-info-foreground rounded-full px-3 py-1 text-sm font-medium">
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Employee Info Card */}
          <div className="rounded-[55px] border border-gray-300 bg-white backdrop-blur-md shadow-md w-full max-w-sm p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-secondary text-xl font-semibold">
                Employee Info
              </h1>
              <div className="border p-3 border-gray-300 rounded-full">
                <Icons.settings_download />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <Icons.settings_employee_info />
              <div className="flex flex-col">
                <h2 className="text-secondary text-base font-semibold">
                  Active Employees
                </h2>
                <h1 className="text-primary text-2xl font-semibold">
                  {`${data?.total_users ?? "N/A"} Members`}
                </h1>
              </div>
            </div>
            <button className="bg-primary text-white py-3 px-6 rounded-full w-full font-medium">
              Manage Employees
            </button>
          </div>

          {/* Assets Info Card */}
          <div className="rounded-[55px] border border-gray-300 bg-white backdrop-blur-md shadow-md w-full max-w-sm p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-secondary text-xl font-semibold">
                Assets Info
              </h1>
              <div className="border p-3 border-gray-300 rounded-full">
                <Icons.settings_download />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <Icons.settings_assets />
              <div className="flex flex-col">
                <h2 className="text-secondary text-sm font-medium">
                  Active Assets
                </h2>
                <h1 className="text-primary text-2xl font-semibold">
                  {`${data?.total_devices ?? "N/A"} Devices`}
                </h1>
              </div>
            </div>
            <button className="bg-primary text-white py-3 px-6 rounded-full w-full font-medium">
              Manage Assets
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsHeader;
