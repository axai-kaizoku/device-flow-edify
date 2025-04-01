import React from "react";

const QcReportTemplate = ({ qcData }: { qcData: Record<string, any> }) => {
  if (!qcData) return null;

  return (
    <div
      id="qc-report-content"
      className="w-[800px] p-6 bg-white shadow-lg border border-gray-200 rounded-lg"
    >
      <h1 className="text-xl font-bold text-center mb-4">
        Quality Check Report
      </h1>
      <div className="border border-gray-300 p-4 rounded-md">
        {Object.entries(qcData).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b">
            <span className="font-semibold text-gray-700">{key}:</span>
            <span className="text-gray-900">{value?.toString() || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QcReportTemplate;
