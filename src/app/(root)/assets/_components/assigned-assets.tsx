import { DeviceResponse } from "@/server/deviceActions";
import React from "react";
import { filterDevice } from "@/server/filterActions";
import AssignedTable from "./assigned-table";

const ITEMS_PER_PAGE = 5;
async function AssignedAssets() {
  const devicesResponse: DeviceResponse = await filterDevice();
  const devices = devicesResponse.devices
  // const router = useRouter();

  // Filter issues to show only "Closed" issues
  const assignedDevices = devices?.filter(
    (device) => device?.userId && device?.userName?.trim() !== ""
  );

  return (
    <>
      <div className="rounded-[33px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-4 flex flex-col gap-5">
        <div className=" flex gap-2 w-fit">
          <h1 className="text-xl font-semibold">Total Assets</h1>
          <h1 className="text-xs font-medium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
            {assignedDevices?.length} Assets
          </h1>
        </div>
        <AssignedTable
         devices={devices} ITEMS_PER_PAGE={ITEMS_PER_PAGE} assignedDevices={assignedDevices} />
      </div>
    </>
  );
}

export default AssignedAssets;