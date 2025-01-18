import { CombinedContainer } from "@/components/container/container";
import React from "react";
import AllReports from "./_components/allReports";
import { Icon } from "@/components/wind/Icons";
import ReportSection from "./_components/reportSection";
import NotFound from "@/app/not-found";

export interface report {
  title: string;
  description: string;
  tag: string;
}

const Reports = () => {
  try {
    const reportData = [
      {
        title: "Total Members",
        description:
          "Download the full report with up-to-date details on all the members in your organisation.",
        tag: "people",
      },
      {
        title: "Assigned Members",
        description:
          "Download the full report of all the members based on Onboarding Date.",
        tag: "people",
      },
      {
        title: "Inactive Members",
        description:
          "Download the detailed report containing information on all the deleted members.",
        tag: "people",
      },
      {
        title: "Total Assets",
        description:
          "Download the complete report showcasing the total assets under management.",
        tag: "assets",
      },
      {
        title: "Assigned Assets",
        description:
          "Download the report highlighting all the assets assigned to an Employee in the organisation.",
        tag: "assets",
      },
      {
        title: "Inactive Assets",
        description:
          "Download the full report providing insights into assets that have been decommissioned.",
        tag: "assets",
      },
      // {
      //   title: "Unassigned Assets",
      //   description:
      //     "Download the latest report highlighting all the assets not assigned to any Employee in the organisation.",
      //   tag: "assets",
      // },
    ];

    return (
      <CombinedContainer title="Reports">
        <div className="w-full h-[80vh] pt-[15px] font-gilroyRegular">
          <ReportSection reportData={reportData} />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Reports">
        <NotFound />
      </CombinedContainer>
    );
  }
};

export default Reports;
