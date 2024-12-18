import React from "react";
import { convertToCSV, downloadCSV } from "./util";
import { DeviceResponse } from "@/server/deviceActions";
import { deletedDevices } from "@/server/filterActions";

const DeletedAssetsReport = () => {
  const handleDownloadDeletedAssetsReport = async () => {
    try {
      const deletedDeviceResponse: DeviceResponse = await deletedDevices();
      if (
        deletedDeviceResponse &&
        deletedDeviceResponse?.devices &&
        deletedDeviceResponse?.devices?.length > 0
      ) {
        const csv = convertToCSV(deletedDeviceResponse?.devices);

        downloadCSV(csv, `deleted_assets_report.csv`);
      } else {
        alert("No data available");
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      alert("Failed to download the report. Please try again.");
    }
  };
  return (
    <>

      <div>Get All the Deleted Assets</div>
      <div className="flex gap-2">
        <button className="flex-1 font-semibold text-lg py-2.5 border-[2px] border-black rounded-[49px]">
          Cancel
        </button>
        <button
          className="flex-1 text-white bg-black rounded-[49px] font-semibold text-lg py-2.5"
          onClick={handleDownloadDeletedAssetsReport}
        >
          Download
        </button>
      </div>
    </>
  );
};

export default DeletedAssetsReport;
