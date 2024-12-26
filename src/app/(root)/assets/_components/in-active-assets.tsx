import { Device, DeviceResponse } from "@/server/deviceActions";
import React, { useState } from "react";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { Icons } from "@/components/icons";
import { PermanentAssetsDelete } from "./permanent-assets-delete";
import { RestoreDevice } from "./restore-assets";
import { deletedDevices } from "@/server/filterActions";
import InactiveAssetsTable from "./inactive-table";

const ITEMS_PER_PAGE = 5;
async function InActiveAssets() {
  const deletedDeviceResponse: DeviceResponse = await deletedDevices();
  const devices = deletedDeviceResponse.devices;
  
  // const router = useRouter();

  // Filter issues to show only "Closed" issues
  const inactiveDevices = devices?.filter((device) => !device?.userId);

  return (
    <>
      <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col gap-5">
        <div className=" flex gap-2 w-fit">
          <h1 className="text-xl font-semibold">Total Assets</h1>
          <h1 className="text-xs font-medium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
            {inactiveDevices?.length} Assets
          </h1>
        </div>
        <InactiveAssetsTable inactiveDevices={inactiveDevices} ITEMS_PER_PAGE={ITEMS_PER_PAGE}/>
      </div>
    </>
  );
}

export default InActiveAssets;