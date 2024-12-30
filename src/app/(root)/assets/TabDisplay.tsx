"use client";

import { useQueryState } from "nuqs";

import { Search, Plus, Download, Loader } from "lucide-react"; // Importing icons from lucide-react

import { useState, useEffect, Suspense } from "react";
import Spinner from "@/components/Spinner";
import AssignedAssets from "./_components/assigned-assets";
import { Device } from "@/server/deviceActions";
import UnAssignedAssets from "./_components/un-assigned-assets";
import InActiveAssets from "./_components/in-active-assets";
import { Tab } from "../teams/_components/Tab";
import CreateDevice from "./_components/addDevices/_components/create-device";
import { Icons } from "@/components/icons";


function TabDisplay() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "assigned_assets",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle tab change with loading state
  const handleTabChange = (tab: string) => {
    setLoading(true); // Set loading to true before fetching data
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "assigned_assets":
        return (<Suspense fallback={<Spinner/>}><AssignedAssets /></Suspense>);
      case "un_assigned_assets":
        return (<Suspense fallback={<Spinner/>}><UnAssignedAssets /></Suspense>);
      case "inactive_assets":
        return (<Suspense fallback={<Spinner/>}><InActiveAssets /></Suspense>);
      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "assigned_assets",
      label: "Assigned Assets",
      component: <AssignedAssets />,
    },
    {
      key: "un_assigned_assets",
      label: "Unassigned Assets",
      component: <UnAssignedAssets />,
    },
    {
      key: "inactive_assets",
      label: "Inactive Assets",
      component: <InActiveAssets />,
    },
  ];
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-gray-400 font-gilroySemiBold text-lg">Assets</h1>
        <h1 className="text-3xl font-gilroyBold py-4">Manage Assets</h1>
        <div className="flex items-center justify-between ">
          <div className="flex items-center w-full -mb-8 gap-12">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />{" "}
              {/* Lucide icon for search */}
              <input
                className="text-base bg-transparent font-gilroyMedium whitespace-nowrap focus:outline-none"
                placeholder="Search Assets"
              />
            </div>

            <div className="flex items-center relative gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Icons.tab_add_device /> {/* Lucide icon for add */}
              <span className="text-sm font-gilroyMedium whitespace-nowrap">
                <CreateDevice button={"Add Device"} />
              </span>
            </div>

            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Icons.tab_filter /> {/* Lucide icon for download */}
              <span className="text-base font-gilroyMedium">Filters</span>
            </button>
            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Download size={20} className="text-[#7F7F7F]" />{" "}
              {/* Lucide icon for download */}
              <span className="text-sm font-gilroyMedium">Download</span>
            </button>
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