"use client";

import { useQueryState } from "nuqs";
import { Tab } from "./_components/Tab";
import { Team } from "@/server/teamActions";
import TeamsMain from "./_components/teams-main";
import DeletedTeams from "./_components/deleted-teams";
import { Search, Plus, Download, Loader } from "lucide-react"; // Importing icons from lucide-react
import CreateTeam from "./_components/create-team";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { Icons } from "@/components/icons";

interface TabDisplayProps {
  sess: any;
  teams: Team[];
  deletedTeams: Team[];
}

function TabDisplay({ sess, teams, deletedTeams }: TabDisplayProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active",
  });
  const [loading, setLoading] = useState(false);

  // Function to handle tab change with loading state
  const handleTabChange = (tab: string) => {
    setLoading(true); // Set loading to true before fetching data
    setActiveTab(tab);
  };

  useEffect(() => {
    // When the active tab changes, simulate a delay to show loading
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once the content is ready
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "active":
        return <TeamsMain teams={teams} sess={sess} />;
      case "deleted":
        return <DeletedTeams teams={deletedTeams} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium text-lg">Teams</h1>
        <h1 className="text-3xl font-gilroySemiBold pt-[10px]">
          Manage Teams & Employee
        </h1>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full -mb-9 -mt-1 gap-12">
            <Tab
              active={activeTab === "active"}
              onClick={() => handleTabChange("active")}
              label="Active Teams"
            />

            <Tab
              className="after:left-[-20%]  after:w-[140%]"
              active={activeTab === "deleted"}
              onClick={() => handleTabChange("deleted")}
              label="Deleted Teams"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />{" "}
              {/* Lucide icon for search */}
              <input
                className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
                placeholder="Search teams"
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

            {/* <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Download size={16} /> 
              <span className="text-sm font-gilroyMedium">Download</span>
            </button> */}
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      {/* Show loading spinner while fetching */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <div className="mt-4">{renderContent()}</div>
      )}
    </>
  );
}

export default TabDisplay;
