"use client";
import React from "react";
import { DashboardDetails } from "./interface";
import ExcellentDeviceIcon from "@/icons/ExcellentDeviceIcon";
import UnassignedDeviceIcon from "@/icons/UnassignedDeviceIcon";
import FairDeviceIcon from "@/icons/FairDeviceIcon";
import { useRouter } from "next/navigation";
import { Pie, Cell, PieChart } from "recharts";

export function AssetsHealth({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  // Define colors for each device condition
  const CONDITION_COLORS: Record<string, string> = {
    Excellent: "#63bc48",
    Good: "#FFAE4C",
    Fair: "#FF928A",
  };

  // Define the desired order
  const CONDITION_ORDER: Record<string, number> = {
    Excellent: 1,
    Good: 2,
    Fair: 3,
  };

  const totalCount = dashboardData?.deviceConditionData?.reduce(
    (acc, item) => acc + item.count,
    0
  );

  // Prepare and sort data for pie chart
  const data = dashboardData?.deviceConditionData
    ?.map((response) => {
      const titles: { [key: string]: string } = {
        Excellent: "Excellent",
        Good: "Good",
        Fair: "Fair",
      };

      if (!titles[response._id]) return null;

      return {
        name: titles[response._id],
        value: response.count,
        color: CONDITION_COLORS[response._id] || "#7086FD", // fallback color
        order: CONDITION_ORDER[response._id] || 99, // default to high number if not found
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a?.order || 0) - (b?.order || 0)); // Sort by the defined order

  // Sort the original deviceConditionData for the list display
  const sortedDeviceConditionData = dashboardData?.deviceConditionData
    ?.map(item => ({
      ...item,
      order: CONDITION_ORDER[item._id] || 99
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="font-gilroy flex flex-col gap-y-4 rounded-[10px] border border-solid border-gray-200 bg-white px-5 pb-9 pt-3.5 tracking-tight backdrop-blur-[24px]">
      <div className="text-sm font-gilroySemiBold leading-[23px]">
        Asset Health Status
      </div>

      <div className="flex flex-col gap-y-8 h-full">
        {(dashboardData?.deviceConditionData?.length || 0) > 0 ? (
          <div className="flex flex-col gap-4">
            {/* Horizontal Bar */}
            <div className="w-full h-[37px] rounded-lg overflow-hidden flex">
              {data?.map((entry, index) => {
                const widthPercent = totalCount
                  ? (entry.value / totalCount) * 100
                  : 0;
                return (
                  <div
                    key={index}
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: entry.color,
                    }}
                  />
                );
              })}
            </div>

            {/* Device Condition List */}
            <div className="flex gap-5 justify-start items-center">
              {sortedDeviceConditionData?.map((response, index) => {
                const titles: { [key: string]: string } = {
                  Excellent: "Excellent",
                  Good: "Good",
                  Fair: "Fair",
                };

                if (!titles[response._id]) return null;

                return (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between mt-4"
                  >
                    <div className="flex gap-2 items-start justify-center">
                      <div
                        className="mt-1.5"
                        style={{
                          width: 30,
                          height: 5,
                          borderRadius: 100,
                          background: CONDITION_COLORS[response._id],
                        }}
                      />

                      <div className="flex gap-2 flex-col">
                        <span className="text-black font-gilroySemiBold text-xs xl:text-sm">
                          {titles[response._id]}
                        </span>
                        <span className="text-black font-gilroySemiBold text-xs xl:text-sm  ">
                          {response.count} Devices
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-start">
            {[
              {
                icon: <ExcellentDeviceIcon />,
                label: "Excellent Device",
                color: "#6FD195",
              },
              {
                icon: <UnassignedDeviceIcon />,
                label: "Good Device",
                color: "#FFAE4C",
              },
              {
                icon: <FairDeviceIcon />,
                label: "Fair Device",
                color: "#FF928A",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full sm:w-1/2 lg:w-1/3 flex flex-col items-start gap-2 rounded-[11px] border border-gainsboro bg-white p-4"
              >
                <div className="flex items-center">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: item.color,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="pt-1 text-lg font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-sm text-center">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}