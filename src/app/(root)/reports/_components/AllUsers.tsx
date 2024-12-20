"use client";
import React from "react";
import { convertToCSV, downloadCSV } from "./util";
import { filterUsers } from "@/server/filterActions";

const AllUsers = () => {
  const handleDownloadReport = async () => {
    try {
      const data = await filterUsers({ pageLength: 1000 });

      if (data?.users && data?.users?.length > 0) {
        const csv = convertToCSV(data.users);

        downloadCSV(csv, `People_Report.csv`);
      } else {
        alert("No data available for the selected status.");
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      alert("Failed to download the report. Please try again.");
    }
  };
  return (
    <div className="w-full">
      <div className="mb-8">
        <div>Get All the Employees</div>
      </div>

      {/* <div className="mb-8">
        <label className="text-gray-700 font-gilroyMedium text-lg">
          File Format :
        </label>
        <input
          type="text"
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
          value="CSV"
          readOnly
        />
      </div> */}

      <div className="flex gap-2">
        <button className="flex-1 font-gilroySemiBold text-lg py-2.5 border-[2px] border-black rounded-[49px]">
          Cancel
        </button>
        <button
          className="flex-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg py-2.5"
          onClick={handleDownloadReport}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
