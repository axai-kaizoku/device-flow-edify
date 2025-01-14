"use client";
import { getAssignedDevicesReport } from "@/server/reportsAction";
import React, { useState } from "react";
import { convertToCSV, downloadCSV } from "./util";
import { GlobalAlert } from "@/components/global-alert";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { FormField } from "../../settings/_components/form-field";
import Spinner from "@/components/Spinner";

const AssignedDevicesReport = ({
  closeBtn,
}: {
  closeBtn: (value: boolean) => void;
}) => {
  const [operator, setOperator] = useState("Select an Operator");
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);

  const handleDeviceDownloadClick = async () => {
    setLoading(true);
    try {
      const filters = [];
      if (operator === "between" && fromDate && toDate) {
        filters.push(["assigned_at", "Between", [fromDate, toDate]]);
      } else if (operator && date) {
        filters.push(["assigned_at", operator, date]);
      }

      const data = await getAssignedDevicesReport({ filters });
      if (data && data?.devices && data?.devices?.length > 0) {
        const csv = convertToCSV(data?.devices);

        downloadCSV(csv, `assigned_devices_report.csv`);
        setLoading(false);
      } else {
        // alert("No data available");
        dispatch(openAlert());
        setLoading(false);
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      // alert("Failed to download the report. Please try again.");
      dispatch(openAlert());
      setLoading(false);
    }
    // onDownload(filters);
    setFromDate("");
    setToDate("");
    setDate("");
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

      <div className="mt-5">
        <SelectDropdown
          options={[
            { label: "Greater Than", value: ">" },
            { label: "Less Than", value: "<" },
            { label: "Between", value: "between" },
          ]}
          onSelect={(data) => setOperator(data.value)}
          label="Action"
          value={operator}
          className="rounded-xl border border-[#5F5F5F]"
        />

        {operator === "between" ? (
          <div className="grid grid-cols-2 gap-4 my-6">
            <div>
              <FormField
                label="From"
                id="fromDate"
                name="fromDate"
                value={fromDate}
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div>
              <FormField
                label="To"
                id="ToDate"
                name="toDate"
                value={toDate}
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        ) : (
          <div className="my-6">
            <FormField
              label="Date"
              id="date"
              name="date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        )}

        {/* <div className="mb-8">
            <label className="text-gray-700 font-gilroyMedium text-lg">File Format :</label>  
            <input type='text'
             className='w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition duration-200'
             value="CSV"
             readOnly
            />  
        </div> */}

        <div className="flex gap-2">
          <button
            onClick={() => closeBtn(false)}
            className="flex-1 px-1 font-gilroySemiBold text-lg py-1.5 border-[2px] border-black rounded-[49px]"
          >
            Cancel
          </button>
          <button
            className="flex-1 px-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg py-1.5"
            onClick={handleDeviceDownloadClick}
          >
           {loading ? <Spinner/> : "Download"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignedDevicesReport;
