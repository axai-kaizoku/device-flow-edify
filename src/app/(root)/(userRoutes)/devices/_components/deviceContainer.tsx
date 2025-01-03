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
      label: "Assets",
      component: <Devices devices={devices} />,
    },
    {
      key: "issues",
      label: "Issues",
      component: <Issue issues={issues} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-3xl font-gilroyBold py-2">
          Manage Assets & Issues
        </h1>
        <div className="flex items-center justify-between ">
          <div className="flex items-center w-full -mb-8 gap-12">
            {tabs?.map((tab) => (
              <Tab
                className="after:left-[-60%]  after:w-[220%]"
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
              <input
                className="text-base bg-transparent font-gilroyMedium whitespace-nowrap focus:outline-none"
                placeholder="Search "
              />
            </div>

            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300 group">
              <Icons.sort_icon />
              <span className="text-base font-gilroyMedium whitespace-nowrap">
                Sort By
              </span>
            </button>
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
