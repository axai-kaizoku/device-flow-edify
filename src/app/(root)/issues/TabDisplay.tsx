"use client";

import { IssueResponse, Issues } from "@/server/issueActions";
import { useQueryState } from "nuqs";
import { ArrowUpDown, Check, Download, Plus, Search } from "lucide-react";
import { Tab } from "../teams/_components/Tab";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import ClosedIssueTable from "./_components/ClosedIssues";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { closedIssues, filterIssues, openIssues } from "@/server/filterActions";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

function TabDisplay() {
  const [issues, setIssues] = useState<IssueResponse | null>(null);
  const [countIssues, setCountIssues] = useState<IssueResponse | null>(null);
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "open",
  });
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleSearchAndFilter = async () => {
    // Combine search term and filters
    const query = {
      searchQuery: searchTerm || "",
    };

    try {
      setLoading(true);
      let res: IssueResponse;
      if (activeTab === "open") {
        const count = await filterIssues(query);
        setCountIssues(count);

        res = await openIssues(query);
      } else {
        res = await closedIssues(query);
      }

      setIssues(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching issues:", error);
      showAlert({
        title: "Something went wrong",
        description: "Failed to fetch data",
        isFailure: true,
        key: "fetch-error-users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm]);

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        setLoading(true);
        let response;
        switch (activeTab) {
          case "open":
            const count = await filterIssues();
            setCountIssues(count);
            response = await openIssues();
            break;
          case "closed":
            response = await closedIssues();
            break;
        }
        setIssues(response); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tab data:", error);
        showAlert({
          title: "Something went wrong",
          description: "Failed to fetch data",
          isFailure: true,
          key: "fetch-error-users-2",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab]);

  const refreshData = async () => {
    try {
      setLoading(true);
  
      const query = {
        searchQuery: searchTerm || "",
      };
  
      let updatedIssues: IssueResponse;
      if (activeTab === "open") {
        const count = await filterIssues(query);
        setCountIssues(count);
        updatedIssues = await openIssues(query);
      } else {
        updatedIssues = await closedIssues(query);
      }
  
      setIssues(updatedIssues); // Update issues state with refreshed data
    } catch (error) {
      console.error("Error refreshing issues data:", error);
      showAlert({
        title: "Something went wrong",
        description: "Failed to refresh data",
        isFailure: true,
        key: "refresh-error-issues",
      });
    } finally {
      setLoading(false);
    }
  };
  

  const renderContent = () => {
    switch (activeTab) {
      case "open":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <IssueTableDisplay
                data={issues}
                onRefresh={refreshData}
                countIssues={countIssues}
                setIssues={setIssues}
              />
            )}
          </>
        );
      case "closed":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <ClosedIssueTable data={issues} setIssues={setIssues} onRefresh={refreshData}/>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex items-center -mb-7 -mt-1  w-full gap-12">
          <Tab
            active={activeTab === "open"}
            onClick={() => {
              setActiveTab("open");
            }}
            label="Open Issues"
            className="after:left-[-35%]  after:w-[170%]"
          />
          <Tab
            active={activeTab === "closed"}
            onClick={() => {
              setActiveTab("closed");
            }}
            label="Closed Issues"
            className="after:left-[-20%]  after:w-[140%]"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
            <Search className="text-[#7F7F7F] size-5" />
            {/* Lucide icon for search */}
            <input
              className="text-sm bg-transparent font-gilroyMedium whitespace-nowrap focus:outline-none"
              placeholder="Search Issues"
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* {activeTab !== "open" && (
            <div className="relative px-4 flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Check className="text-[#7F7F7F] size-5" />
              <div className="font-gilroyMedium text-sm text-[#7F7F7F]">
                Reopen
              </div>
            </div>
          )} */}

          {/* <div className="flex justify-between items-center gap-2 text-nowrap px-4 py-2.5 text-[#7F7F7F] border border-[#7F7F7F] rounded-full">
            <ArrowUpDown className="text-[#7F7F7F] size-6" />
            <div className="font-gilroyMedium text-base text-[#7F7F7F]">
              Sort By
            </div>
          </div> */}

          {/* <button className="flex items-center gap-2 px-4 py-2.5 text-[#7F7F7F] border border-[#7F7F7F] rounded-full hover:text-black hover:border-black transition-all duration-300">
            <Download className="size-6 text-[#7F7F7F]" />{" "}
            <span className="text-base font-gilroyMedium text-[#7F7F7F]">
              Download
            </span>
          </button> */}
        </div>
      </div>

      <div className="border mt-2"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
