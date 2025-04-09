import Pagination from "@/app/(root)/teams/_components/pagination";
import { Table } from "@/components/wind/Table";
import {
  downloadReport,
  QcReportResponse,
  ReportData,
} from "@/server/checkMateActions";
import React, { Suspense, useRef, useState } from "react";
import ReportPreview from "./report-preview";
import AISummaryModal from "./AiSummaryModal";
import axios from "axios";

function QcTable({
  data,
  setPagination,
  sessionRole,
}: {
  data: QcReportResponse;
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
    }>
  >;
  sessionRole?: number;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [qcData, setQcData] = useState<ReportData>();
  const printRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSummaryData, setAiSummaryData] = useState<ReportData>(null);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    try {
      setPagination((prev) => ({ ...prev, page }));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = async (recordData: any) => {
    const res = await downloadReport({ userId: recordData._id });
    setQcData(res);
  };

  const handleAISummaryReport = async (recordData) => {
    const res = await downloadReport({ userId: recordData._id });
    const resData = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        Authorization:
          "Bearer mOgvFKFWg9LLGIHqvqRe6HVgIkHUYUjGidJhAdRdMP9WCAzZoo1YSdIBk5QsZX66",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...res.data }),
    });
    const data = await resData.json();
    setAiSummaryData(data)
  };

  return (
    <div className="overflow-y-auto">
      <div className="rounded-lg border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 w-fit">
            <h1 className="text-xl pl-6 font-gilroySemiBold">Total Reports</h1>
            <h1 className="text-xs font-gilroyMedium flex justify-center items-center rounded-full px-2.5 bg-[#F9F5FF] text-[#6941C6]">
              {data?.totalRecords} Reports
            </h1>
          </div>
        </div>

        {/* Hidden container to render the report for PDF generation */}
        {/* <div
          ref={printRef}
          id="invoice"
        
        >
          {qcData && <ReportFormat data={qcData} />}
        </div> */}

        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-2">
            <div>
              {data?.totalRecords === 0 ? (
                <div className="flex justify-center items-center h-[60vh]">
                  <img
                    src="/media/logo/no_reports_display.svg"
                    className=""
                    alt=""
                  />
                </div>
              ) : sessionRole === 2 ? (
                <Table
                  data={data?.data ?? []}
                  isLoading={isLoading}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  checkboxSelection={{
                    uniqueField: "_id",
                    onSelectionChange: setSelectedIds,
                  }}
                  columns={[
                    sessionRole === 2 && {
                      title: "User Name",
                      render: (record) => (
                        <div className="w-28 flex items-center gap-2">
                          <img
                            src={
                              record?.user_image ??
                              "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                            }
                            alt="Device"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div className="font-gilroySemiBold text-sm text-black truncate">
                            {record?.name}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: "Device Name",
                      render: (record) => (
                        <div className="w-28 flex items-center gap-2">
                          <img
                            src={
                              record?.device_image ??
                              "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                            }
                            alt="Device"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div className="font-gilroySemiBold text-sm text-black truncate">
                            {record?.device_name}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: "Asset Health",
                      render: (record) => {
                        let color =
                          record?.assets_health === "Good"
                            ? "text-[#027A48] bg-[#ECFDF3]"
                            : record.assets_health === "Old"
                            ? "text-[#F00] bg-[#FFE0E0]"
                            : "text-[#FF8000] bg-[#FFFACB]";
                        return record?.assets_health ? (
                          <span className={`${color} px-3 py-1.5 rounded-full`}>
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
                        const warrantyDate = record?.warranty_status
                          ? new Date(record?.warranty_status)
                          : null;
                        const isActive = warrantyDate
                          ? warrantyDate > new Date()
                          : false;
                        return (
                          <span
                            className={`px-3 py-1.5 rounded-full ${
                              isActive
                                ? "text-[#027A48] bg-[#ECFDF3]"
                                : "text-[#F00] bg-[#FFE0E0]"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        );
                      },
                    },
                    {
                      title: "Serial Number",
                      render: (record) => <div>{record?.serial_no}</div>,
                    },
                    {
                      title: "Device Score",
                      render: (record) => (
                        <div>{record?.device_score ?? "-"}</div>
                      ),
                    },
                    {
                      title: "Diagnosed On",
                      render: (record) => {
                        const diagDate = record?.diagnosed_on
                          ? new Date(record?.diagnosed_on)
                          : null;
                        const formattedDiag = diagDate
                          ? diagDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-";
                        return <div>{formattedDiag}</div>;
                      },
                    },
                    {
                      title: "",
                      render: (record) => (
                        <ReportPreview data={qcData}>
                          <div
                            className="bg-black text-white font-gilroySemiBold rounded-md px-4 py-2"
                            onClick={() => handleDownloadReport(record)}
                          >
                            View Report
                          </div>
                        </ReportPreview>
                      ),
                    },
                  ]}
                />
              ) : (
                <Table
                  data={data?.data ?? []}
                  isLoading={isLoading}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  checkboxSelection={{
                    uniqueField: "_id",
                    onSelectionChange: setSelectedIds,
                  }}
                  columns={[
                    {
                      title: "Device Name",
                      render: (record) => (
                        <div className="w-28 flex items-center gap-2">
                          <img
                            src={
                              record?.device_image ??
                              "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                            }
                            alt="Device"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div className="font-gilroySemiBold text-sm text-black truncate">
                            {record?.device_name}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: "Asset Health",
                      render: (record) => {
                        let color =
                          record?.assets_health === "Good"
                            ? "text-[#027A48] bg-[#ECFDF3]"
                            : record.assets_health === "Old"
                            ? "text-[#F00] bg-[#FFE0E0]"
                            : "text-[#FF8000] bg-[#FFFACB]";
                        return record?.assets_health ? (
                          <span className={`${color} px-3 py-1.5 rounded-full`}>
                            {record?.assets_health}
                          </span>
                        ) : (
                          "-"
                        );
                      },
                    },
                    {
                      title: "Serial Number",
                      render: (record) => <div>{record?.serial_no}</div>,
                    },
                    {
                      title: "Device Score",
                      render: (record) => (
                        <div>{record?.device_score ?? "-"}</div>
                      ),
                    },
                    {
                      title: "Diagnosed On",
                      render: (record) => {
                        const diagDate = record?.diagnosed_on
                          ? new Date(record?.diagnosed_on)
                          : null;
                        const formattedDiag = diagDate
                          ? diagDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-";
                        return <div>{formattedDiag}</div>;
                      },
                    },
                    {
                      title: "",
                      render: (record) => (
                        <ReportPreview data={qcData}>
                          <div
                            className="bg-black text-white font-gilroySemiBold rounded-full px-4 py-1"
                            onClick={() => handleDownloadReport(record)}
                          >
                            View Report
                          </div>
                        </ReportPreview>
                      ),
                    },
                    {
                      title: "",
                      render: (record) => (
                        <AISummaryModal data={aiSummaryData}>
                          <div
                            className="bg-black text-white font-gilroySemiBold rounded-full px-4 py-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleAISummaryReport(record);
                            }}
                          >
                            AI Summary
                          </div>
                        </AISummaryModal>
                      ),
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default QcTable;
