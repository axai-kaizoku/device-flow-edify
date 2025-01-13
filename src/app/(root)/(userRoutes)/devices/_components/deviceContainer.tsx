"use client";

import { useQueryState } from "nuqs";

import { Search } from "lucide-react"; // Importing icons from lucide-react

import Spinner from "@/components/Spinner";
import Devices from "./devicesPage";
import Issue from "./issuePage";
import { getAllDevicesProp, getDevicesByUserId } from "@/server/deviceActions";
import { Icons } from "@/components/icons";

import { getAllResponse, getIssueByUserId } from "@/server/issueActions";
import { Tab } from "@/app/(root)/teams/_components/Tab";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

function DeviceContainer() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "devices",
  });
  const [loading, setLoading] = useState(false);

  const [issues, setIssues] = useState<getAllResponse>([]);
  const [devices, setDevices] = useState<getAllDevicesProp>([]);

  useEffect(() => {
    const fetchData = async (type: "devices" | "issues") => {
      try {
        setLoading(true);
        if (type === "devices") {
          const devicesData: getAllDevicesProp = await getDevicesByUserId();
          setDevices(devicesData);
        } else if (type === "issues") {
          const issueData: getAllResponse = await getIssueByUserId();
          setIssues(issueData);
        }
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
        notFound();
        // Optionally, handle error state or show a notification to the user
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "devices") {
      fetchData("devices");
    } else if (activeTab === "issues") {
      fetchData("issues");
    }
  }, [activeTab]);

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "devices":
        return <Devices devices={devices} />;
      case "issues":
        return <Issue issues={issues} />;

      default:
        return null;
    }
  };

  const tabs = [
    {
      key: "devices",
      label: "Assets Assigned",
      component: <Devices devices={devices} />,
    },
    {
      key: "issues",
      label: "Issues Raised",
      component: <Issue issues={issues} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col  pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Assets
        </h1>
        <h2 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Manage Assets & Issues
        </h2>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full -mb-9 gap-12 -mt-1">
            {tabs?.map((tab) => (
              <Tab
                className="after:left-[-30%]  after:w-[160%]"
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>

          <div className="flex opacity-0 pointer-events-none items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
            <Search size={20} className="text-[#7F7F7F]" />

            <input
              disabled
              className=" bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
              // value={searchTerm || ""}
              // onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets..."
            />
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </>
  );
}

export default DeviceContainer;
