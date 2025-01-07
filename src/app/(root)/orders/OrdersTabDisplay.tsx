"use client";
import { useQueryState } from "nuqs";
import { Search, Download, ArrowUpDown } from "lucide-react"; // Importing icons from lucide-react
import { useState, useEffect, Suspense } from "react";
import Spinner from "@/components/Spinner";
import { Tab } from "../teams/_components/Tab";
import { Icons } from "@/components/icons";
import AllOrders from "./_components/AllOrders";
import DeliveredOrders from "./_components/DeliveredOrders";
import CancelledOrders from "./_components/CancelledOrders";

function TabDisplay() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "orders",
  });

  // Function to handle tab change with loading state
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <Suspense fallback={<Spinner />}>
            <AllOrders />
          </Suspense>
        );
      case "delivered":
        return (
          <Suspense fallback={<Spinner />}>
            <DeliveredOrders />
          </Suspense>
        );
      case "cancelled":
        return (
          <Suspense fallback={<Spinner />}>
            <CancelledOrders />
          </Suspense>
        );
      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "orders",
      label: "Orders",
      component: <AllOrders />,
    },
    {
      key: "delivered",
      label: "Delivered",
      component: <DeliveredOrders />,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      component: <CancelledOrders />,
    },
  ];
  return (
    <>
      <div className="flex flex-col 2xl:gap-2  pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Orders
        </h1>
        <h1 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Manage Orders
        </h1>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full 2xl:-mb-8 -mb-9 gap-12 -mt-1">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
                className="after:left-[-60%] after:w-[200%] text-center"
              />
            ))}
          </div>

          <div className="flex 2xl:gap-2 gap-1.5">
            <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />

              <input
                className=" bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
                placeholder="Search Orders"
              />
            </div>

            {/* <div className="flex justify-between items-center gap-2 text-nowrap px-5 py-2 text-[#7F7F7F] border border-[#7F7F7F] rounded-full">
              <ArrowUpDown className="text-[#7F7F7F] 2xl:size-6 size-5" />
              <div className="font-gilroyMedium 2xl:text-base text-[14px] text-[#7F7F7F]">
                Sort By
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="border 2xl:mt-[9px] mt-[7.5px]"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
