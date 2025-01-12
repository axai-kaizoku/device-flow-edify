"use client";
import { CombinedContainer } from "@/components/container/container";
import { AssetsCount } from "./admin-conponents/assets-count";
import { AssetsHealth } from "./admin-conponents/assets-health";
import { ManageIssue } from "./admin-conponents/manage-issue";
import { TrendingDevices } from "./admin-conponents/trending-devices";
import { getDashboard } from "@/server/dashboard";
import { ManageOrders } from "./admin-conponents/Manage-orders";
import { Members } from "./admin-conponents/members";
import { Teams } from "./admin-conponents/Teams";
import { useEffect, useState } from "react";
import { DashboardDetails } from "./admin-conponents/interface";

export default function AdminDashboard() {
  const [dashboardData, setDasboardData] = useState<DashboardDetails | null>(
    null
  );

  useEffect(() => {
    getDashboardDetils();
  }, []);

  const getDashboardDetils = async () => {
    const dashboard: DashboardDetails = await getDashboard();
    setDasboardData(dashboard)
  };

  return (
    <CombinedContainer title="Admin Dashboard">
      <div className="flex gap-3">
        <div
          style={{ width: "75%" }}
          className="flex justify-between gap-3 flex-wrap "
        >
          <div style={{ width: "49%" }}>
            <AssetsHealth dashboardData={dashboardData} />
          </div>
          <div style={{ width: "49%" }}>
            <AssetsCount dashboardData={dashboardData} />
          </div>
          <div className="flex gap-4 w-[100%]">
            <ManageIssue dashboardData={dashboardData} />
            <div className="flex flex-col gap-5 ">
              <Members dashboardData={dashboardData} />
              <Teams dashboardData={dashboardData} />
            </div>
            <ManageOrders dashboardData={dashboardData} />
          </div>
        </div>
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <TrendingDevices dashboardData={dashboardData}  />
          <div>
            <img src={'/media/dashboard/store-banner.png'} style={{width: '100%', height: 170}} />
          </div>
        </div>
      </div>
    </CombinedContainer>
  );
}
