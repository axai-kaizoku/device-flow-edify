"use client";

import { Issues } from "@/server/issueActions";
import { useQueryState } from "nuqs";
import { ArrowUpDown, Check, Download, Plus, Search } from "lucide-react";
import { Tab } from "../teams/_components/Tab";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import ClosedIssueTable from "./_components/ClosedIssues";

interface TabDisplayProps {
  issues: Issues[];
  totalDocuments: number;
  pageSize: number;
}

function TabDisplay({ issues, pageSize, totalDocuments }: TabDisplayProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "open",
  });

  const renderContent = () => {
    switch (activeTab) {
      case "open":
        return <IssueTableDisplay data={issues} />;
      case "closed":
        return <ClosedIssueTable data={issues} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex items-center -mb-9  w-full gap-12">
          <Tab
            active={activeTab === "open"}
            onClick={() => {
              setActiveTab("open");
            }}
            label="Open Issues"
          />
          <Tab
            active={activeTab === "closed"}
            onClick={() => {
              setActiveTab("closed");
            }}
            label="Closed Issues"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2.5 pl-2 pr-20 py-2.5 text-[#7F7F7F] text-xl border border-[#7F7F7F] rounded-full">
            <Search size={"20px"} color="#7F7F7F" />{" "}
            {/* Lucide icon for search */}
            <input
              className="text-sm bg-transparent font-medium whitespace-nowrap focus:outline-none"
              placeholder="Search Issues"
              style={{ color: "#7F7F7F" }}
            />
          </div>

          {activeTab !== "open" && (
            <div className="flex items-center relative gap-2 px-4 py-2.5 text-[#7F7F7F] border border-[#7F7F7F] rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Check className="text-[#7F7F7F]" />
              <div className="font-medium text-base text-[#7F7F7F]">Reopen</div>
            </div>
          )}

          <div className="flex justify-between items-center gap-2 text-nowrap px-4 py-2.5 text-[#7F7F7F] border border-[#7F7F7F] rounded-full">
            <ArrowUpDown className="text-[#7F7F7F] size-6" />
            <div className="font-medium text-base text-[#7F7F7F]">Sort By</div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 text-[#7F7F7F] border border-[#7F7F7F] rounded-full hover:text-black hover:border-black transition-all duration-300">
            <Download className="size-6 text-[#7F7F7F]" />{" "}
            {/* Lucide icon for download */}
            <span className="text-base font-medium text-[#7F7F7F]">
              Download
            </span>
          </button>
        </div>
      </div>

      <div className="border mt-2"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
