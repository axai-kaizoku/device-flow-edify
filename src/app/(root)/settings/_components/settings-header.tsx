"use client";
import { Icons } from "@/components/icons";
import { Org } from "@/server/orgActions";
import React, { useState } from "react";
import { LogoCompanyModal } from "./logo-company";
import Link from "next/link";

function SettingsHeader({ data }: { data: Org }) {


  return (
    <>
      <div className="flex flex-col pt-[13px]">
        <h1 className="text-gray-400 font-gilroySemiBold 2xl:text-lg text-lg mb-3 ">
          Settings
        </h1>

        <div className="flex justify-start gap-6">
          {/* Company Information Card */}
          <div className="relative flex-1 flex rounded-[25px] pl-5 py-5 border border-gray-300 bg-white gap-2 h-[185px] w-full max-w-sm items-center">
            <div>
              {/* Display the logo */}
              {data.logo ? (
                <img
                  src={data.logo}
                  alt="Company Logo"
                  className="size-28 rounded-full border object-cover"
                />
              ) : (
                <Icons.company_logo className="w-28 h-28 text-gray-400" />
              )}
            </div>
            {/* Modal trigger for editing the logo */}
            <LogoCompanyModal id={data?._id!} logo={data?.logo}>
              <Icons.settings_edit className="absolute left-[4.7rem] bottom-8 cursor-pointer" />
            </LogoCompanyModal>

            <div className="flex flex-col gap-1">
              <h1 className="text-primary text-2xl font-gilroySemiBold">
                {data?.legal_entity_name ?? "N/A"}
              </h1>
              <h2 className="text-secondary text-lg font-gilroyMedium">
                {data?.email ?? "N/A"}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="text-[#027A48] bg-[#ECFDF3] rounded-full px-4 py-1 text-sm font-gilroyMedium">
                  Company
                </span>
                <span className="text-[#AF52DE] bg-[#F4E7FF] rounded-full px-4 py-1 text-sm font-gilroyMedium">
                  Admin
                </span>
              </div>
            </div>
          </div>

          {/* Employee Info Card */}
          <div className="rounded-[25px] flex-1 relative px-5 pb-5 pt-4 border border-gray-300 bg-white w-full max-w-sm h-[185px]">
            <div className="flex items-center ">
              <h1 className="text-[#9B9B9B] text-[1.10rem] font-gilroySemiBold mb-[5px]">
                Employee info.
              </h1>
              {/* <div className="absolute right-4 top-3 border p-2 border-gray-300 rounded-full mt-2 cursor-pointer">
                <Icons.settings_download />
              </div> */}
            </div>
            <div className="flex items-center gap-4">
              <Icons.settings_employee_info />
              <div className="flex flex-col ">
                <h2 className="text-[#737373] text-base font-gilroySemiBold">
                  Active Employees
                </h2>
                <h1 className="text-primary text-[1.35rem] font-gilroySemiBold">
                  {`${data?.total_users ?? "N/A"} Members`}
                </h1>
              </div>
            </div>
            <Link href={"/people"}>
              <button className="bg-primary mt-3 text-white py-2 px-6 rounded-full w-full font-gilroySemiBold text-lg">
                Manage Employees
              </button>
            </Link>
          </div>

          {/* Assets Info Card */}
          <div className="rounded-[25px] flex-1 relative px-5 pb-5 pt-4 border border-gray-300 bg-white w-full max-w-sm h-[185px]">
            <div className="flex items-center ">
              <h1 className="text-[#9B9B9B] text-[1.10rem] font-gilroySemiBold mb-[5px]">
                Assets
              </h1>
              {/* <div className="absolute right-4 top-3 border p-2 border-gray-300 rounded-full mt-2 cursor-pointer">
                <Icons.settings_download />
              </div> */}
            </div>
            <div className="flex items-center gap-4">
              <Icons.settings_assets />
              <div className="flex flex-col ">
                <h2 className="text-[#737373] text-base font-gilroySemiBold">
                  Active Assets
                </h2>
                <h1 className="text-primary text-[1.35rem] font-gilroySemiBold">
                  {`${data?.total_devices ?? "N/A"} Devices`}
                </h1>
              </div>
            </div>
            <Link href={"/assets"}>
              <button className="bg-primary mt-3 text-white py-2 px-6 text-lg  rounded-full w-full font-gilroySemiBold">
                Manage Assets
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsHeader;
