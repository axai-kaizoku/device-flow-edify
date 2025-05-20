"use client";

import { CombinedContainer } from "@/components/container/container";
import { toast } from "sonner";
import FeedBackIcon from "@/icons/FeedBackIcon";
import { cn } from "@/lib/utils";
import {
  getDashboard,
  getTotalIntegrationData,
  sendFeedback,
} from "@/server/dashboard";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import CreateDevice from "../../assets/_components/addDevices/_components/create-device";
import { AssetsCount } from "./admin-conponents/assets-count";
import { AssetsHealth } from "./admin-conponents/assets-health";
import { DashboardDetails } from "./admin-conponents/interface";
import { ManageIssue } from "./admin-conponents/manage-issue";
// import { TrendingDevices } from "./admin-conponents/trending-devices";
import DashboardSkeleton from "./dashboard-skeleton";
import { Subscriptions } from "./subscriptions/interface";
import TotalSpendingCard from "./subscriptions/totalSpendingCard";
import TotalSubscriptionsCard from "./subscriptions/totalSubscriptionsCard";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

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

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitFeedback = async () => {
    if (!formData.rating || !formData.comment) {
      toast.error(
        "Please select a rating and add a comment before submitting."
      );
      return;
    }

    try {
      const response = await sendFeedback(formData);
      toast.success("Thank you for your feedback!");
      toggleModal();
      setClickedIndex(null);
      setFormData((prev) => ({ ...prev, rating: 0, comment: "" }));
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  const emojis = [
    {
      png: "/media/emojis/worst.png",
      gif: "/media/emojis/worst-gif.gif",
      text: "Worst",
      id: 1,
    },
    {
      png: "/media/emojis/bad.png",
      gif: "/media/emojis/bad-gif.gif",
      text: "Bad",
      id: 2,
    },
    {
      png: "/media/emojis/fine.png",
      gif: "/media/emojis/fine-gif.gif",
      text: "Fine",
      id: 3,
    },
    {
      png: "/media/emojis/good.png",
      gif: "/media/emojis/good-gif.gif",
      text: "Good",
      id: 4,
    },
    {
      png: "/media/emojis/great.png",
      gif: "/media/emojis/great-gif.gif",
      text: "Great",
      id: 5,
    },
  ];

  return (
    <>
      {integrationStatus === "pending" || dashboardStatus === "pending" ? (
        <DashboardSkeleton />
      ) : (
        <CombinedContainer title="Admin Dashboard" className="pt-0 w-full">
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
          <div
            className="flex flex-row justify-between items-stretch mb-7 gap-3 w-full "
            onClick={() => setIsModalOpen(false)}
          >
            {/* Left Column - ManageIssue */}
            <div className="w-[calc(35%-12px)] flex flex-col gap-3">
              <ManageIssue dashboardData={dashboardData} />
              {/* <img
                src="/media/dashboard/Today_sales.svg"
                alt=""
                className="mt-1"
              /> */}
            </div>
            <div className="w-[calc(35%-12px)]">
              <AssetsCount dashboardData={dashboardData} />
            </div>

            {/* Middle Column - AssetsHealth & AssetsCount */}
            {dashboardData ? (
              <div className="w-[calc(35%-12px)] flex flex-col gap-4">
                <div className="w-full">
                  <AssetsHealth dashboardData={dashboardData} />
                </div>
              </div>
            ) : (
              <div className="w-[35%]  bg-white  rounded-md border border-black/10 flex flex-col justify-center items-center px-3 py-5 gap-6 lg:p-7">
                <img
                  src="/media/dashboard/assets-empty.png"
                  width={200}
                  height={150}
                />
                <div className="w-full">
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

            {/* Right Column - TrendingDevices */}
            {/* <div className="w-[calc(30%-12px)] flex flex-col gap-1.5 lg:gap-6 rounded-[2px]">
              <TrendingDevices dashboardData={dashboardData} />
            </div> */}
          </div>

          {/* Feedback */}

          <div
            className="bg-black cursor-pointer p-2 rounded-lg w-fit flex gap-1 items-center text-base text-white font-gilroySemiBold px-3 fixed bottom-10 right-11 z-[300]"
            style={{ boxShadow: "0px 0px 13.154px 0px rgba(0, 0, 0, 0.40)" }}
            onClick={toggleModal}
          >
            <FeedBackIcon />
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
                onClick={() => {
                  toggleModal();
                  setHoveredIndex(null);
                  setClickedIndex(null);
                }}
              >
                <X className="text-black" />
              </button>
              <h2 className="text-lg font-gilroySemiBold mb-4 w-full text-center">
                Feedback
              </h2>
              <div className="text-sm text-gray-600 gap-2 flex flex-col w-full">
                <div className="text-xl text-black font-gilroySemiBold text-center">
                  Share your feedback!
                </div>

                <div className="flex justify-center">
                  <div className="text-sm text-[#363636] font-gilroyMedium w-[70%] text-center">
                    Your input is important for us. We take customer feedback
                    very seriously.
                  </div>
                </div>

                {/* Emoji Feedback Section */}
                <div className="flex justify-center gap-6 my-5">
                  {emojis.map((emoji, index) => (
                    <div
                      className="flex flex-col cursor-pointer group"
                      onClick={() => {
                        setClickedIndex(index);
                        setFormData((prev) => ({ ...prev, rating: emoji.id }));
                      }}
                    >
                      <img
                        key={index}
                        src={
                          clickedIndex === index || hoveredIndex === index
                            ? `${emoji.gif}?t=${new Date().getTime()}` // Add timestamp to prevent caching
                            : emoji.png
                        }
                        alt={`Emoji ${index + 1}`}
                        className="w-10 h-10 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => {
                          setClickedIndex(index);
                          setFormData((prev) => ({
                            ...prev,
                            rating: emoji.id,
                          }));
                        }}
                      />

                      <div
                        className={`text-center text-sm ${
                          clickedIndex === index
                            ? "text-black"
                            : "text-[#C9C9C9]"
                        } font-gilroySemiBold`}
                      >
                        {emoji.text}
                      </div>
                    </div>
                  ))}
                </div>

                <textarea
                  id="review-write"
                  placeholder="Add a comment"
                  onChange={handleCommentChange}
                  rows={6}
                  className={cn(
                    " mb-2 rounded-[8px] placeholder:text-[#767676] placeholder:font-gilroyMedium text-[15px] border border-[#DFDFDF] my-2 font-gilroyMedium text-sm py-3 px-4 outline-none focus:outline-none"
                    // errors.comment ? "border-destructive/80 border " : ""
                  )}
                />
              </div>

              <div
                className="bg-black text-white font-gilroySemiBold text-sm p-2.5 rounded-[10px] text-center mt-5 cursor-pointer"
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </div>
            </div>
          )}
        </CombinedContainer>
      )}
    </>
  );
}
