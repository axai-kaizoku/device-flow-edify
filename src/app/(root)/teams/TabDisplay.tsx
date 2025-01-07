"use client";

import { useQueryState } from "nuqs";
import { Tab } from "./_components/Tab";
import { Team } from "@/server/teamActions";
import TeamsMain from "./_components/teams-main";
import DeletedTeams from "./_components/deleted-teams";
import { Search, Plus, Download, Loader } from "lucide-react"; // Importing icons from lucide-react
import CreateTeam from "./_components/create-team";
import { Employee } from "../_org-chart/_components/data";
import Org from "../_org-chart/_components/orgChart";

interface TabDisplayProps {
  teams: Team[];
  deletedTeams: Team[];
  orgData: Employee;
}

function TabDisplay({ teams, deletedTeams, orgData }: TabDisplayProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active",
  });

  // Function to handle tab change with loading state
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "active":
        return <TeamsMain teams={teams} />;
      case "deleted":
        return <DeletedTeams teams={deletedTeams} />;
      case "org":
        return <Org data={orgData} />;
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

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
