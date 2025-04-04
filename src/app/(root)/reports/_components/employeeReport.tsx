"use client";
import React, { useState } from "react";
import { convertToCSV, downloadCSV } from "./util";
import { getUserReports } from "@/server/reportsAction";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { GlobalAlert } from "@/components/global-alert";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { FormField } from "../../settings/_components/form-field";
import Spinner from "@/components/Spinner";

const EmployeeReport = ({
  closeBtn,
}: {
  closeBtn: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);
  const [operator, setOperator] = useState("Select an Operator");
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownloadClick = async () => {
    setLoading(true);
    try {
      const filters = [];
      if (operator === "between" && fromDate && toDate) {
        filters.push(["onboarding_date", "Between", [fromDate, toDate]]);
      } else if (operator && date) {
        filters.push(["onboarding_date", operator, date]);
      }

      const data = await getUserReports({ filters });
      if (data && data?.users && data?.users?.length > 0) {
        const csv = convertToCSV(data?.users);

        downloadCSV(csv, `user_report.csv`);
        closeBtn(false);
        setLoading(false);
      } else {
        dispatch(openAlert());
        setLoading(false);
        // alert("No data available");
      }
    } catch (error) {
      dispatch(openAlert());
      setLoading(false);
      // alert("Failed to download the report. Please try again.");
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
            { label: "After", value: ">" },
            { label: "Before", value: "<" },
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

        <div className="flex gap-2">
          <button
            onClick={() => closeBtn(false)}
            className="flex-1 font-gilroySemiBold text-lg px-1 py-1.5 border-[2px] border-black rounded-[49px]"
          >
            Cancel
          </button>
          <button
            className="flex-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg px-1 py-1.5"
            onClick={handleDownloadClick}
          >
            {loading ? <Spinner/> : "Download"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeReport;
