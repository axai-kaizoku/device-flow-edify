"use client";

import { useState, useEffect } from "react";
import { Tab } from "../../teams/_components/Tab";
import Spinner from "@/components/Spinner";
import BestSellerContent from "./best-seller-content";
import { getAllDevicesProp } from "@/server/deviceActions";
import Link from "next/link";

const BestSellerSection = ({ products }: { products: getAllDevicesProp }) => {
  const [activeTab, setActiveTab] = useState("best_sellers");
  const [loading, setLoading] = useState(false);

  const tabs = [
    {
      key: "best_sellers",
      label: "Best Sellers",
      content: <BestSellerContent />,
    },
    {
      key: "trending_devices",
      label: "Trending Devices",
      content: <BestSellerContent />,
    },
    {
      key: "latest_release",
      label: "Latest Release",
      content: <BestSellerContent />,
    },
  ];

  const handleTabChange = (tabKey: string) => {
    setLoading(true);
    setActiveTab(tabKey);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate content loading delay
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center w-full py-5 p-24 bg-white">
      {/* Section Title */}
      <h1 className="font-gilroySemiBold text-4xl py-8">Best Seller</h1>

      {/* Tabs */}
      <div className="relative flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full border-b border-[#909090]">
          <div className="relative  flex gap-4">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>
          {/* View All */}
          <Link href={"/store/view-all"}>
            <h1 className="cursor-pointer font-gilroyMedium text-lg">
              View all
            </h1>
          </Link>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Spinner />
          </div>
        ) : (
          <div>
            {tabs.map(
              (tab) =>
                activeTab === tab.key && (
                  <div key={tab.key}>
                    <p>{tab.content}</p>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellerSection;
