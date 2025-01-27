"use client";

import { useQueryState } from "nuqs";
import { Tab } from "./_components/Tab";
import {
  fetchActiveTeams,
  fetchInactiveTeams,
  Team,
  TeamsResponse,
} from "@/server/teamActions";
import TeamsMain from "./_components/teams-main";
import DeletedTeams from "./_components/deleted-teams";
import { Search, Plus, Download, Loader, Send } from "lucide-react"; // Importing icons from lucide-react
import CreateTeam from "./_components/create-team";
import { Employee, mapEmployeeData } from "../_org-chart/_components/data";
import Org from "../_org-chart/_components/orgChart";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import InvitePeople from "../people/[id]/_components/invite-people";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { HierarchyResponse } from "@/server/userActions";

interface TabDisplayProps {
  teams: TeamsResponse;
  deletedTeams: TeamsResponse;
  orgData: any;
}

function TabDisplay({ orgData }: TabDisplayProps) {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const actualData: Employee = {
    children: mapEmployeeData(orgData),
    designation: userData?.orgId.name || '',
    name: userData?.orgId.name || '',
    image: "/media/sidebar/profile.svg",
  };
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active_teams",
  });
  const [teams, setTeams] = useState<TeamsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const { showAlert } = useAlert();
  // Function to handle tab change with loading state
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleSearchAndFilter = async () => {
    // Combine search term and filters
    const query = {
      searchQuery: searchTerm || "",
    };

    try {
      setLoading(true);
      let res: TeamsResponse;
      if (activeTab === "inactive_teams") {
        res = await fetchInactiveTeams(query);
      } else {
        res = await fetchActiveTeams(query);
      }
      setTeams(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      showAlert({
        title: "Something went wrong !!",
        description: "Failed to fetch data. Please try again.",
        isFailure: true,
        key: "fetch-error-team",
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
          case "active_teams":
            response = await fetchActiveTeams();
            break;
          case "inactive_teams":
            response = await fetchInactiveTeams();
            break;

          default:
            response = [];
        }
        setTeams(response); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tab data:", error);
        showAlert({
          title: "Something went wrong !!",
          description: "Failed to fetch data. Please try again.",
          isFailure: true,
          key: "fetch-error-device-tab",
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
      let res: TeamsResponse | null = null;
  
      if (activeTab === "active_teams") {
        res = await fetchActiveTeams(query);
      } else if (activeTab === "inactive_teams") {
        res = await fetchInactiveTeams(query);
      }
  
      // Update the state with fresh data
      setTeams(res);
    } catch (error) {
      console.error("Error refreshing data:", error);
      showAlert({
        title: "Something went wrong !!",
        description: "Failed to refresh data. Please try again.",
        isFailure: true,
        key: "refresh-error-team",
      });
    } finally {
      setLoading(false);
    }
  };
  

  const renderContent = () => {
    switch (activeTab) {
      case "active_teams":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <TeamsMain teams={teams} setTeams={setTeams} onRefresh={refreshData}/>
            )}
          </>
        );
      case "inactive_teams":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <DeletedTeams teams={teams} setTeams={setTeams} onRefresh={refreshData}/>
            )}
          </>
        );
      case "org":
        return <Org data={actualData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Teams
        </h1>
        <h1 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Manage Teams & Employee
        </h1>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full -mb-9 -mt-1 gap-12">
            <Tab
              active={activeTab === "active_teams"}
              onClick={() => handleTabChange("active_teams")}
              label="Active Teams"
            />

            <Tab
              className="after:left-[-20%]  after:w-[140%]"
              active={activeTab === "inactive_teams"}
              onClick={() => handleTabChange("inactive_teams")}
              label="Deleted Teams"
            />

            <Tab
              className="after:left-[-20%]  after:w-[140%]"
              active={activeTab === "org"}
              onClick={() => handleTabChange("org")}
              label="Org Chart"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />{" "}
              {/* Lucide icon for search */}
              <input
                className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search teams..."
              />
            </div>
            <CreateTeam>
              <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <Plus className="text-[#6C6C6C]  size-5" />
                <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Add Team
                </span>
              </div>
            </CreateTeam>
            <InvitePeople>
              <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <Send className="text-[#6C6C6C]  size-4" />
                <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Invite People
                </span>
              </div>
            </InvitePeople>

            {/* <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Download size={16} /> 
              <span className="text-sm font-gilroyMedium">Download</span>
            </button> */}
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
