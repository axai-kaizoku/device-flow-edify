"use client";
import { CombinedContainer } from "@/components/container/container";
import { cn } from "@/lib/utils";
import { getDashboard, sendFeedback } from "@/server/dashboard";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ManageOrders } from "./admin-conponents/Manage-orders";
import { Teams } from "./admin-conponents/Teams";
import { AssetsCount } from "./admin-conponents/assets-count";
import { AssetsHealth } from "./admin-conponents/old-assets-health";
import { DashboardDetails } from "./admin-conponents/interface";
import { ManageIssue } from "./admin-conponents/manage-issue";
import { Members } from "./admin-conponents/members";
import { TrendingDevices } from "./admin-conponents/trending-devices";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { toast } from "sonner";
import FeedBackIcon from "@/icons/FeedBackIcon";
import DashboardSkeleton from "./dashboard-skeleton";

export default function AdminDashboard() {
  const [dashboardData, setDasboardData] = useState<DashboardDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
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

  // List of emojis with their PNG and GIF versions
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
  useEffect(() => {
    // setLoading(true);
    getDashboardDetils();
    setLoading(false);
  }, []);

  const getDashboardDetils = async () => {
    setLoading(true);
    try {
      const dashboard: DashboardDetails = await getDashboard();
      setDasboardData(dashboard);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || !dashboardData ? (
        <DashboardSkeleton />
      ) : (
        <CombinedContainer
          title="Admin Dashboard"
          className="max-[1410px]:pt-8 pt-0"
        >
          <div
            className="flex justify-center items-center mb-7 gap-3 h-full"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
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
              <div className="flex gap-3 w-[100%]">
                <ManageIssue dashboardData={dashboardData} />
                <div className="flex flex-col gap-3 ">
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
                gap: 6,
                justifyContent: "space-between",
              }}
            >
              <TrendingDevices dashboardData={dashboardData} />
              <img
                src={"/media/dashboard/banner.png"}
                onClick={() => {
                  router.push("store");
                }}
                style={{ width: "100%", height: 170, cursor: "pointer" }}
              />
            </div>
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
