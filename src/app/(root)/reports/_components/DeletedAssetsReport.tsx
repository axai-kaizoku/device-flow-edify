import React from "react";
import { convertToCSV, downloadCSV } from "./util";
import { DeviceResponse } from "@/server/deviceActions";
import { deletedDevices } from "@/server/filterActions";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { GlobalAlert } from "@/components/global-alert";

const DeletedAssetsReport = ({
  closeBtn,
}: {
  closeBtn: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);
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
        // alert("No data available");
        dispatch(openAlert());
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      dispatch(openAlert());

      // alert("Failed to download the report. Please try again.");
    }
  };
  return (
    <>
      <GlobalAlert
        isOpen={isOpen}
        onClose={() => dispatch(closeAlert())}
        title="No data available"
        description="Something went wrong !!"
        isFailure={true}
      />
      <div>Get All the Deleted Assets</div>
      <div className="flex gap-2">
        <button
          onClick={() => closeBtn(false)}
          className="flex-1 font-gilroySemiBold text-lg py-2.5 border-[2px] border-black rounded-[49px]"
        >
          Cancel
        </button>
        <button
          className="flex-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg py-2.5"
          onClick={handleDownloadDeletedAssetsReport}
        >
          Download
        </button>
      </div>
    </>
  );
};

export default DeletedAssetsReport;
