"use client";
import React, { useState } from "react";
import { report } from "../page";
import { RenderIcon } from "./renderIcons";
import AllReports from "./allReports";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { convertToCSV, downloadCSV } from "./util";
import { getDeviceReport } from "@/server/reportsAction";
import {
  deletedDevices,
  deletedUsers,
  filterDevice,
  filterUsers,
  inActiveAssets,
  inActiveUsers,
} from "@/server/filterActions";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { GlobalAlert } from "@/components/global-alert";
import { DeviceResponse } from "@/server/deviceActions";
import { UserResponse } from "@/server/userActions";
import { useToast } from "@/hooks/useToast";

const ReportCard = ({ report, index }: { report: report; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openToast } = useToast();
  const dispatch = useDispatch();

  // () => setIsOpen(true)
  const handleDownloadTotalDeviceReport = async () => {
    try {
      const data = await filterDevice({ pageLength: 1000 });

      if (data?.devices && data?.devices?.length > 0) {
        const csv = convertToCSV(data?.devices);

        downloadCSV(csv, `Device_Report_${status}.csv`);
      } else {
        // alert("No data available for the selected status.");
        dispatch(openAlert());
      }
    } catch (error) {
      // console.error("Error downloading the report:", error);
      // alert("Failed to download the report. Please try again.");
      dispatch(openAlert());
    }
  };

  const handleDownloadTotalUsersReport = async () => {
    try {
      const data = await filterUsers({ pageLength: 1000 });

      if (data?.users && data?.users?.length > 0) {
        const csv = convertToCSV(data.users);

        downloadCSV(csv, `People_Report.csv`);
      } else {
        // alert("No data available for the selected status.");
        openToast("error", "No data Available");
      }
    } catch (error) {
      openToast("error", "Error downloading the report");

      // alert("Failed to download the report. Please try again.");
    }
  };

  const handleDownloadDeletedUserReport = async () => {
    try {
      const deletedUserResponse: UserResponse = await inActiveUsers();
      if (
        deletedUserResponse &&
        deletedUserResponse?.users &&
        deletedUserResponse?.users?.length > 0
      ) {
        const csv = convertToCSV(deletedUserResponse?.users);

        downloadCSV(csv, `deleted_users_report.csv`);
      } else {
        openToast("error", "No data Available");
      }
    } catch (error) {
      openToast("error", "Error downloading the report");
      // alert("Failed to download the report. Please try again.");
    }
  };

  const handleDownloadDeletedAssetsReport = async () => {
    try {
      const deletedDeviceResponse: DeviceResponse = await inActiveAssets();
      if (
        deletedDeviceResponse &&
        deletedDeviceResponse?.devices &&
        deletedDeviceResponse?.devices?.length > 0
      ) {
        const csv = convertToCSV(deletedDeviceResponse?.devices);

        downloadCSV(csv, `deleted_assets_report.csv`);
      } else {
        // alert("No data available");
        openToast("error", "No data Available");
      }
    } catch (error) {
      openToast("error", "Error downloading the report");

      // alert("Failed to download the report. Please try again.");
    }
  };

  const handleDownloadUnassignedReport = async () => {
    try {
      const data = await getDeviceReport("unassigned");

      if (data && data?.devices && data?.devices?.length > 0) {
        const csv = convertToCSV(data?.devices);

        downloadCSV(csv, `Device_Report_unassigned.csv`);
      } else {
        // alert("No data available for the selected status.");
        openToast("error", "No data Available");
      }
    } catch (error) {
      openToast("error", "Error downloading the report");

      // alert("Failed to download the report. Please try again.");
    }
  };

  const handleDownloadAction = () => {
    if (report?.title === "Total Assets") {
      handleDownloadTotalDeviceReport();
    } else if (report?.title === "Total Members") {
      handleDownloadTotalUsersReport();
    } else if (report?.title === "Inactive Members") {
      handleDownloadDeletedUserReport();
    } else if (report?.title === "Inactive Assets") {
      handleDownloadDeletedAssetsReport();
    } else if (report?.title === "Unassigned Assets") {
      handleDownloadUnassignedReport();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white border border-[rgba(195, 195, 195, 0.31)] rounded-lg p-5 flex flex-col justify-between gap-4">
        {/* Title with Icon */}
        <div className="flex justify-start items-center gap-3.5">
          <RenderIcon report={report} />

          <h3 className="text-xl font-gilroySemiBold text-black">
            {report?.title}
          </h3>
        </div>

        <div className="text-[#737373] font-gilroyMedium text-[15px]">
          {report?.description}
        </div>

        {/* Button as Sheet Trigger */}
        <button
          className="bg-black text-white rounded-md py-2  font-gilroySemiBold text-sm"
          onClick={handleDownloadAction}
        >
          Download
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-2xl bg-white p-5 shadow-lg text-center">
          <AllReports closeBtn={setIsOpen} report={report} index={index} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportCard;
