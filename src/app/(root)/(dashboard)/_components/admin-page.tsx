"use client";

import { CombinedContainer } from "@/components/container/container";
import { getDashboard, getTotalIntegrationData } from "@/server/dashboard";
import { useQuery } from "@tanstack/react-query";
import CreateDevice from "../../assets/_components/addDevices/_components/create-device";
import { AssetsCount } from "./admin-conponents/assets-count";
import { AssetsHealth } from "./admin-conponents/assets-health";
import { DashboardDetails } from "./admin-conponents/interface";
import { ManageIssue } from "./admin-conponents/manage-issue";
import DashboardSkeleton from "./dashboard-skeleton";
import { Subscriptions } from "./subscriptions/interface";
import TotalSpendingCard from "./subscriptions/totalSpendingCard";
import TotalSubscriptionsCard from "./subscriptions/totalSubscriptionsCard";

export default function AdminDashboard() {
  const { data: integrationData, status: integrationStatus } =
    useQuery<Subscriptions>({
      queryKey: ["get-total-integration-data"],
      queryFn: getTotalIntegrationData,
    });

  const { data: dashboardData, status: dashboardStatus } =
    useQuery<DashboardDetails>({
      queryKey: ["get-dashboard-data"],
      queryFn: getDashboard,
    });

  return (
    <>
      {integrationStatus === "pending" || dashboardStatus === "pending" ? (
        <DashboardSkeleton />
      ) : (
        <div className="flex flex-col h-[114dvh] overflow-y-auto px-5  hide-scrollbar w-full">
          <span className="text-black/30 font-gilroyMedium text-[18px] w-full leading-none mt-6 mb-6">
            Your subscriptions
          </span>
          <div className="flex w-full gap-3">
            <TotalSpendingCard integrationData={integrationData} />
            <TotalSubscriptionsCard integrationData={integrationData} />
          </div>
          <span className="text-black/30 font-gilroyMedium text-[18px] w-full leading-none mt-6 mb-6">
            Your Assets
          </span>
          <div className="flex flex-row justify-between items-stretch mb-7 gap-3 w-full ">
            <div className="w-[calc(35%-12px)] flex flex-col gap-3">
              <ManageIssue dashboardData={dashboardData} />
            </div>
            <div className="w-[calc(35%-12px)]">
              <AssetsCount dashboardData={dashboardData} />
            </div>

            {dashboardData ? (
              <div className="w-[calc(35%-12px)] flex flex-col gap-4">
                <div className="w-full">
                  <AssetsHealth dashboardData={dashboardData} />
                </div>
              </div>
            ) : (
              <div className="w-[35%]  bg-white  rounded-md border border-black/10 flex flex-col justify-center items-center px-3 py-5 lg:p-7">
                <img
                  src="/media/dashboard/assets-empty.webp"
                  width={180}
                  height={120}
                />
                <div className="w-full mt-4">
                  <p className="text-black text-lg font-gilroySemiBold text-center">
                    Add your first device
                  </p>
                  <p className="text-gray-400 text-sm font-gilroyMedium text-center">
                    Start adding your devices to get data
                  </p>
                </div>

                <CreateDevice>
                  <div className="bg-black cursor-pointer px-3 py-2 mt-8 text-sm rounded-[6px] text-white font-gilroyMedium">
                    Add Device
                  </div>
                </CreateDevice>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
