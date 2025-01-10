import React from "react";
import { report } from "../page";
import AllReports from "./allReports";
import { RenderIcon } from "./renderIcons";
import ReportCard from "./reportCard";

const ReportSection = ({ reportData }: { reportData: report[] }) => {
  const groupedReports = reportData?.reduce((acc, report) => {
    if (!acc[report?.tag]) acc[report?.tag] = [];
    acc[report?.tag].push(report);
    return acc;
  }, {} as Record<string, typeof reportData>);

  return (
    <div className="flex flex-col font-gilroyRegular gap-4">
      <h1 className="text-[#7F7F7F] font-gilroyMedium text-base">Reports</h1>
      <div>
        {Object.entries(groupedReports).map(([tag, reports]) => (
          <div key={tag} className="mb-4">
            {/* Section Header */}
            <h2 className="text-xl font-gilroySemiBold mb-4 text-black capitalize">
              {tag}
            </h2>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports?.map((report, index) => (
                <div key={index}>
                  {/* Card */}
                  <ReportCard report={report} index={index} />
                  {/* Sheet Content */}
                  {/* <SheetContent>
                    <div className="pt-12 px-4">
                      <AllReports report={report} index={index} />
                    </div>
                  </SheetContent> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSection;
