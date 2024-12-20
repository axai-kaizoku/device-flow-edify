import React from "react";
import { convertToCSV, downloadCSV } from "./util";
import { deletedUsers } from "@/server/filterActions";
import { UserResponse } from "@/server/userActions";

const DeletedUserReports = () => {
  const handleDownloadDeletedAssetsReport = async () => {
    try {
      const deletedUserResponse: UserResponse = await deletedUsers();
      if (
        deletedUserResponse &&
        deletedUserResponse?.users &&
        deletedUserResponse?.users?.length > 0
      ) {
        const csv = convertToCSV(deletedUserResponse?.users);

        downloadCSV(csv, `deleted_users_report.csv`);
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
      <div>Get All the Deleted Members</div>
      <div className="flex gap-2">
        <button className="flex-1 font-gilroySemiBold text-lg py-2.5 border-[2px] border-black rounded-[49px]">
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

export default DeletedUserReports;
