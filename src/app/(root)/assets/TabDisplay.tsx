"use client";

// import { OrdersProps } from '../orders/components/orderPage';
// import AddDevices from './_components/addDevices/AddDevices';
// import DeletedDevices from './_components/DeletedDevice/deleted-devices';
// import Inventory from './_components/inventory/Inventory';
// import NewDevicesTab from './_components/newDevices/newDevicesTab';
// import { Tab } from './_components/Tab';
// import { Device } from '@/server/deviceActions';
// import { useQueryState } from 'nuqs';

// interface TabDisplayProps {
// 	devices: Device[];
// 	currentPage: number;
// 	totalPages: number;
// 	totalDocuments: number;
// 	currentDocumentCount: number;
// 	pageSize: number;
// 	prevOrders : {data : OrdersProps};
// 	deletedDevices: Device[];
// }

// function TabDisplay({
// 	devices,
// 	currentPage,
// 	totalPages,
// 	totalDocuments,
// 	currentDocumentCount,
// 	pageSize,
// 	prevOrders,
// 	deletedDevices
// }: TabDisplayProps) {
// 	const [activeTab, setActiveTab] = useQueryState('tab', {
// 		defaultValue: 'devices',
// 	});

// 	const renderContent = () => {
// 		switch (activeTab) {
// 			case 'devices':
// 				return <AddDevices devices={devices} totalDocuments={totalDocuments} />;
// 			case 'inventory':
// 				return <Inventory devices={devices} />;
// 			case 'new':
// 				return <NewDevicesTab data={prevOrders} />
// 			case 'deleted':
// 				return <DeletedDevices data={deletedDevices} />
// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="flex items-center w-full gap-6">
// 				<Tab
// 					active={activeTab === 'inventory'}
// 					onClick={() => setActiveTab('inventory')}
// 					iconType="OutlinedStore"
// 					label="Inventory"
// 				/>
// 				<Tab
// 					active={activeTab === 'devices'}
// 					onClick={() => setActiveTab('devices')}
// 					iconType="OutlinedLaptop"
// 					label="Assigned Devices"
// 				/>
// 				<Tab
// 					active={activeTab === 'new'}
// 					onClick={() => setActiveTab('new')}
// 					iconType="OutlinedStore"
// 					label="Newly Added Devices"
// 				/>
// 				<Tab
// 					active={activeTab === 'deleted'}
// 					onClick={() => setActiveTab('deleted')}
// 					iconType="OutlinedLaptop"
// 					label="Deleted Devices"
// 				/>
// 			</div>

// 			<div className="mt-4">{renderContent()}</div>
// 		</>

// 	);
// }

// export default TabDisplay;
"use client";

import { useQueryState } from "nuqs";

import { Search, Plus, Download, Loader } from "lucide-react"; // Importing icons from lucide-react

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import AssignedAssets from "./_components/assigned-assets";
import { Device } from "@/server/deviceActions";
import UnAssignedAssets from "./_components/un-assigned-assets";
import InActiveAssets from "./_components/in-active-assets";
import { Tab } from "../teams/_components/Tab";
import CreateDevice from "./_components/addDevices/_components/create-device";
import { Icons } from "@/components/icons";

interface TabDisplayProps {
  devices: Device[];
  deletedDevices: Device[];
}

function TabDisplay({ devices, deletedDevices }: TabDisplayProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "assigned_assets",
  });
  const [loading, setLoading] = useState<boolean>(false);

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
      case "assigned_assets":
        return <AssignedAssets devices={devices} />;
      case "un_assigned_assets":
        return <UnAssignedAssets devices={devices} />;
      case "inactive_assets":
        return <InActiveAssets devices={deletedDevices} />;
      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "assigned_assets",
      label: "Assigned Assets",
      component: <AssignedAssets devices={devices} />,
    },
    {
      key: "un_assigned_assets",
      label: "Unassigned Assets",
      component: <UnAssignedAssets devices={devices} />,
    },
    {
      key: "inactive_assets",
      label: "Inactive Assets",
      component: <InActiveAssets devices={deletedDevices} />,
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