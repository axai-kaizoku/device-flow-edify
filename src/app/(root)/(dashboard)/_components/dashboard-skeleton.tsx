"use client";
import { CombinedContainer } from "@/components/container/container";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toast } from "sonner";
import FeedBackIcon from "@/icons/FeedBackIcon";

export default function DashboardSkeleton() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const userData = useSelector((state: RootState) => state.auth.userData);

  return (
    <CombinedContainer
      title="Admin Dashboard"
      className="max-[1410px]:pt-8 pt-0"
    >
      <div className="flex justify-center items-center mb-7 gap-3 h-full">
        {/* Main Content Area (75% width) */}
        <div
          style={{ width: "75%" }}
          className="flex justify-between gap-3 flex-wrap"
        >
          {/* First Row */}
          <div
            style={{ width: "49%" }}
            className="h-40 bg-gray-300 rounded-3xl animate-pulse"
          ></div>
          <div
            style={{ width: "49%" }}
            className="h-40 bg-gray-300 rounded-3xl animate-pulse"
          ></div>

          {/* Second Row */}
          <div className="flex gap-3 w-[300%] mt-3">
            <div className="flex-1 h-92 bg-gray-300 rounded-3xl animate-pulse"></div>

            <div className="flex flex-col gap-3 w-1/4">
              <div className="h-48 bg-gray-300 rounded-3xl animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-3xl animate-pulse"></div>
            </div>

            <div className="flex-1 h-96 bg-gray-300 rounded-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Sidebar Area (25% width) */}
        <div style={{ width: "25%" }} className="flex flex-col gap-6">
          <div className="h-96 bg-gray-300 rounded-3xl animate-pulse"></div>
          <div className="h-44 bg-gray-300 rounded-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Feedback Button (same as original) */}
      <div
        className="bg-black cursor-pointer p-2 rounded-lg w-fit flex gap-1 items-center text-base text-white font-gilroySemiBold px-3 fixed bottom-10 right-11 z-[300]"
        style={{ boxShadow: "0px 0px 13.154px 0px rgba(0, 0, 0, 0.40)" }}
        onClick={toggleModal}
      >
        <FeedBackIcon />
        <div>Feedback</div>
      </div>

      {/* Feedback Modal (same as original) */}
      {isModalOpen && (
        <div
          className="fixed bottom-24 right-11 bg-white p-5 rounded-2xl shadow-lg w-[413px]"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}
        >
          <button
            className="absolute top-5 right-4 text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
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
                Your input is important for us. We take customer feedback very
                seriously.
              </div>
            </div>

            {/* Emoji Feedback Section */}
            <div className="flex justify-center gap-6 my-5">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-10 h-4 mt-1 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="h-32 bg-gray-300 rounded animate-pulse"></div>

            <div className="bg-gray-300 h-10 rounded-[10px] mt-5 animate-pulse"></div>
          </div>
        </div>
      )}
    </CombinedContainer>
  );
}
