"use client";
import { Table } from "@/components/wind/Table";
import React, { Suspense, useState } from "react";

function QcTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };
  const data = [
    {
      _id: "1",
      device_name: "Device 1",
      device_image: "https://example.com/images/device1.jpg",
      diagonised_on: "2025-03-25T10:30:00Z",
      serial_no: "SN1234567891",
      assets_health: "Good",
      warranty_status: "Valid",
      device_score: 92,
    },
    {
      _id: "2",
      device_name: "Device 2",
      device_image: "https://example.com/images/device2.jpg",
      diagonised_on: "2025-03-24T14:15:00Z",
      serial_no: "SN1234567892",
      assets_health: "Average",
      warranty_status: "Expired",
      device_score: 75,
    },
    {
      _id: "3",
      device_name: "Device 3",
      device_image: "https://example.com/images/device3.jpg",
      diagonised_on: "2025-03-23T09:00:00Z",
      serial_no: "SN1234567893",
      assets_health: "Good",
      warranty_status: "Valid",
      device_score: 88,
    },
    {
      _id: "4",
      device_name: "Device 4",
      device_image: "https://example.com/images/device4.jpg",
      diagonised_on: "2025-03-22T12:45:00Z",
      serial_no: "SN1234567894",
      assets_health: "Poor",
      warranty_status: "Expired",
      device_score: 60,
    },
    {
      _id: "5",
      device_name: "Device 5",
      device_image: "https://example.com/images/device5.jpg",
      diagonised_on: "2025-03-21T16:30:00Z",
      serial_no: "SN1234567895",
      assets_health: "Average",
      warranty_status: "Valid",
      device_score: 80,
    },
    {
      _id: "6",
      device_name: "Device 6",
      device_image: "https://example.com/images/device6.jpg",
      diagonised_on: "2025-03-20T11:20:00Z",
      serial_no: "SN1234567896",
      assets_health: "Good",
      warranty_status: "Valid",
      device_score: 95,
    },
  ];

  return (
    <div className="rounded-[33px] mt-10 border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
      <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className=" flex gap-3 w-fit">
            <h1 className="text-xl pl-6 font-gilroySemiBold">Total Reports</h1>
            <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
              {data?.length} Reports
            </h1>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-2">
            <Table
              data={data}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              checkboxSelection={{
                uniqueField: "_id",
                onSelectionChange: handleSelectionChange,
              }}
              columns={[
                {
                  title: "Device Name",
                  render: (data) => (
                    <div className="w-28 justify-start flex items-center gap-2 ">
                      <img
                        src={
                          data.device_image ??
                          "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                        }
                        alt="Device Image"
                        className="size-10 object-cover rounded-full"
                      />

                      {/* Truncated Text */}
                      <div className="font-gilroySemiBold text-sm gap-1 flex whitespace-nowrap  text-black ">
                        {data.device_name}
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Asset Health",
                  render: (record) => {
                    let color = "";
                    switch (record?.assets_health) {
                      case "Good":
                      case "Best":
                      case "New":
                        color = "text-[#027A48] bg-[#ECFDF3]";
                        break;
                      case "Old":
                        color = "text-[#F00] bg-[#FFE0E0]";
                        break;
                      default:
                        color = "text-[#FF8000] bg-[#FFFACB]";
                    }
                    return record?.assets_health ? (
                      <span
                        className={`${color} px-3 py-0.5 w-fit flex justify-center items-center rounded-full`}
                      >
                        {record?.assets_health}
                      </span>
                    ) : (
                      "-"
                    );
                  },
                },

                {
                  title: "Warranty Status",
                  render: (record) => {
                    // Check if the warranty is active based on expiry date
                    const isWarrantyActive = record?.warranty_expiary_date
                      ? new Date(record.warranty_expiary_date) > new Date()
                      : false;

                    return (
                      <span
                        className={`${
                          isWarrantyActive
                            ? "text-[#027A48] px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#ECFDF3]"
                            : "text-[#F00] px-3 py-0.5 w-fit flex justify-center items-center rounded-full bg-[#FFE0E0]"
                        }`}
                      >
                        {isWarrantyActive ? "Active" : "Inactive"}
                      </span>
                    );
                  },
                },
                {
                  title: "Serial Number",
                  render: (data) => <div className="">{data?.serial_no}</div>,
                },
                {
                  title: "Device Score",
                  render: (data) => (
                    <div className="">{data?.device_score}</div>
                  ),
                },
                {
                  title: "Diagonising Date",
                  render: (record) => {
                    const onboardingDate = record?.diagonised_on;

                    // Check if onboardingDate is null, undefined, or empty
                    if (!onboardingDate) {
                      return <div>-</div>; // Return "-" for null, undefined, or empty value
                    }

                    const date = new Date(onboardingDate);

                    // Check if the date is valid
                    if (isNaN(date.getTime())) {
                      return <div>-</div>; // Return "-" for invalid date
                    }

                    const formattedDate = date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return <div>{formattedDate}</div>;
                  },
                },
                {
                  title: "",
                  render: (record) => (
                    <button className="text-nowrap bg-black text-white font-gilroySemiBold rounded-full px-4 py-1 text-center">
                      Download Report{" "}
                    </button>
                  ),
                },
              ]}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default QcTable;
