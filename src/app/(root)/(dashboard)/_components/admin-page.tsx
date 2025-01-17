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
import { useRouter } from "next/navigation";
import StoreBanner from "../../store/_components/store-banner";
import { StoreBannerCard } from "@/components/store-banner";
import { Icons } from "@/components/icons";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [dashboardData, setDasboardData] = useState<DashboardDetails | null>(
    null
  );
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  useEffect(() => {
    getDashboardDetils();
  }, []);

  const getDashboardDetils = async () => {
    const dashboard: DashboardDetails = await getDashboard();
    setDasboardData(dashboard);
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
          <TrendingDevices dashboardData={dashboardData} />
          <StoreBannerCard />
        </div>
      </div>

      {/* Feedback */}
      
        <div className="bg-black cursor-pointer p-2 rounded-lg w-fit flex gap-1 items-center text-base text-white font-gilroySemiBold px-3 fixed bottom-10 right-11 z-[300]" style={{boxShadow: "0px 0px 13.154px 0px rgba(0, 0, 0, 0.40)"}} onClick={toggleModal}>
          <Icons.feedback_icon/>
          <div>Feedback</div>
        </div>

        {isModalOpen && (
        <div
          className="fixed bottom-24 right-11 bg-white p-5 rounded-2xl shadow-lg w-[413px]"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-4 text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
          >
            <X className="text-black"/>
          </button>
          <h2 className="text-lg font-gilroySemiBold mb-4 w-full text-center">Feedback</h2>
          <div className="text-sm text-gray-600 gap-2 flex flex-col w-full">
            <div className="text-xl text-black font-gilroySemiBold text-center">Share your feedback!</div>

            <div className="flex justify-center"><div className="text-sm text-[#363636] font-gilroyMedium w-[70%] text-center">Your input is important for us. We take customer feedback very seriously.</div></div>

            <div className="h-[109px] w-full"></div>

            <textarea
              id="review-write"
              placeholder="Add a comment"
              onChange={(e) =>
                // setFormData((prev) => ({ ...prev, comment: e.target.value }))
                console.log("text")
              }
              rows={6}
              className={cn(
                " mb-2 rounded-[8px] placeholder:text-[#767676] placeholder:font-gilroyMedium text-[15px] border border-[#DFDFDF] my-2 font-gilroyMedium text-sm p-3 outline-none focus:outline-none",
                // errors.comment ? "border-destructive/80 border " : ""
              )}
            />
          </div>

          <div className="bg-black text-white font-gilroySemiBold text-sm p-2.5 rounded-[10px] text-center mt-5">Submit Feedback</div>
        </div>
      )}
      
    </CombinedContainer>
  );
}
