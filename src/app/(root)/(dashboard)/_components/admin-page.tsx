// 'use client'
import { ManageIssue } from "./admin-conponents/manage-issue";
import { TrendingDevices } from "./admin-conponents/trending-devices";
import { AssetsCount } from "./admin-conponents/assets-count";
import { AssetsHealth } from "./admin-conponents/assets-health";
import { CombinedContainer } from "@/components/container/container";

import { getTrendingDevice } from "@/server/storeActions";
import { getCurrentOrg, Org } from "@/server/orgActions";
import { Device } from "@/server/deviceActions";
import { Members } from "./admin-conponents/members";
import { Teams } from "./admin-conponents/Teams";
import { ManageOrders } from "./admin-conponents/Manage-orders";
import { DashboardStore } from "./admin-conponents/store";

export default async function AdminDashboard() {
  const trendingDevice: Device[] = await getTrendingDevice();
  const organisation: Org = await getCurrentOrg();
  const organisationById = organisation;

  return (
    <CombinedContainer title="Admin Dashboard">
      <div className="flex gap-3">
        <div
          style={{ width: "75%" }}
          className="flex justify-between gap-3 flex-wrap "
        >
          <div style={{ width: "49%" }}>
            <AssetsHealth />
          </div>
          <div style={{ width: "49%" }}>
            <AssetsCount />
          </div>
          <div className="flex gap-4 w-[100%]">
            <ManageIssue />
            <div className="flex flex-col gap-5 ">
              <Members />
              <Teams />
            </div>
            <ManageOrders />
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
          <TrendingDevices />
          <DashboardStore />
        </div>
      </div>
    </CombinedContainer>
  );
}
