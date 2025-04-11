"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IssueResponse, Issues } from "@/server/issueActions";
import { useQueryState } from "nuqs";
import { ArrowUpDown, Check, Download, Plus, Search } from "lucide-react";
import { Tab } from "../teams/_components/Tab";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import ClosedIssueTable from "./_components/ClosedIssues";
import { useDeferredValue, useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { closedIssues, filterIssues, openIssues } from "@/server/filterActions";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

function NewPage() {
  // const [issues, setIssues] = useState<IssueResponse | null>(null);
  // const [countIssues, setCountIssues] = useState<IssueResponse | null>(null);
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "open",
  });
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const actualSearchTerm = useDeferredValue(searchTerm);

  const { data, status } = useQuery({
    queryKey: ["fetch-issues", activeTab, actualSearchTerm],
    queryFn: async () => {
      const query = {
        searchQuery: actualSearchTerm ?? "",
        filters: [],
        isDeleted: activeTab === "active-users" ? false : true,
      };

      if (activeTab === "open") {
        query["filters"][0] = ["status", "Equals", "Open"];
      } else {
        query["filters"][0] = ["status", "Equals", "Closed"];
      }

      return openIssues(query);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  // const [loading, setLoading] = useState(false);
  // const { showAlert } = useAlert();

  // const handleSearchAndFilter = async () => {
  //   // Combine search term and filters
  //   const query = {
  //     searchQuery: searchTerm || "",
  //   };

  //   try {
  //     setLoading(true);
  //     let res: IssueResponse;
  //     if (activeTab === "open") {
  //       const count = await filterIssues(query);
  //       setCountIssues(count);

  //       res = await openIssues(query);
  //     } else {
  //       res = await closedIssues(query);
  //     }

  //     setIssues(res);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching issues:", error);
  //     showAlert({
  //       title: "Something went wrong",
  //       description: "Failed to fetch data",
  //       isFailure: true,
  //       key: "fetch-error-users",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleSearchAndFilter();
  // }, [searchTerm]);

  // useEffect(() => {
  //   const fetchTabData = async () => {
  //     try {
  //       setLoading(true);
  //       let response;
  //       switch (activeTab) {
  //         case "open":
  //           const count = await filterIssues();
  //           setCountIssues(count);
  //           response = await openIssues();
  //           break;
  //         case "closed":
  //           response = await closedIssues();
  //           break;
  //       }
  //       setIssues(response); // Update state with the fetched data
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching tab data:", error);
  //       showAlert({
  //         title: "Something went wrong",
  //         description: "Failed to fetch data",
  //         isFailure: true,
  //         key: "fetch-error-users-2",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTabData();
  // }, [activeTab]);

  // const refreshData = async () => {
  //   try {
  //     setLoading(true);

  //     const query = {
  //       searchQuery: searchTerm || "",
  //     };

  //     let updatedIssues: IssueResponse;
  //     if (activeTab === "open") {
  //       const count = await filterIssues(query);
  //       setCountIssues(count);
  //       updatedIssues = await openIssues(query);
  //     } else {
  //       updatedIssues = await closedIssues(query);
  //     }

  //     setIssues(updatedIssues); // Update issues state with refreshed data
  //   } catch (error) {
  //     console.error("Error refreshing issues data:", error);
  //     showAlert({
  //       title: "Something went wrong",
  //       description: "Failed to refresh data",
  //       isFailure: true,
  //       key: "refresh-error-issues",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "open":
  //       return (
  //         <>
  //           {loading ? (
  //             <div className="flex justify-center items-center w-full h-[500px]">
  //               <DeviceFlowLoader />
  //             </div>
  //           ) : (
  //             <IssueTableDisplay
  //               data={issues}
  //               onRefresh={refreshData}
  //               countIssues={countIssues}
  //               setIssues={setIssues}
  //             />
  //           )}
  //         </>
  //       );
  //     case "closed":
  //       return (
  //         <>
  //           {loading ? (
  //             <div className="flex justify-center items-center w-full h-[500px]">
  //               <DeviceFlowLoader />
  //             </div>
  //           ) : (
  //             <ClosedIssueTable
  //               data={issues}
  //               setIssues={setIssues}
  //               onRefresh={refreshData}
  //             />
  //           )}
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <section className="w-full h-fit relative  overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex  mb-4 gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
          <div className="flex gap-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] ">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem value="open" className="w-full py-2.5 rounded-lg">
                  Open Issues
                </SelectItem>
                <SelectItem value="closed" className="w-full py-2.5 rounded-lg">
                  Closed Issues
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg px-2 py-2 h-full">
              <div className="flex gap-2 justify-center items-center h-full">
                <Search className=" size-[1.16rem]" />
                <input
                  type="text"
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Issues..."
                  className={`flex-grow h-full bg-transparent outline-none text-black placeholder-black placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 `}
                />
              </div>
            </div>
          </div>
        </div>
        <TabsContent value="open">
          <IssueTableDisplay
            data={data}
            status={status}
            issuesText="open"
            countIssues={data}
          />
        </TabsContent>
        <TabsContent value="closed">
          <IssueTableDisplay
            data={data}
            status={status}
            issuesText="closed"
            countIssues={data}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default NewPage;
