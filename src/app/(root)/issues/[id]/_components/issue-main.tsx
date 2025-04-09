"use client";
import { cn } from "@/lib/utils";
import { Issues } from "@/server/issueActions";

import { IssueStatusChange } from "../../_components/issue-status-change";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

const IssueSection = ({ data }: { data: Issues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === data?.images!.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? data?.images!.length - 1 : prevIndex - 1
    );
  };

  // Enable arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);
  const router = useRouter();
  return (
    <div className="flex h-fit  w-full gap-6">
      {/* <!-- First Column --> */}
      <div className="flex flex-col gap-6 w-[45%]">
        {/* <!-- First Row of First Column --> */}
        <div
          onClick={() => router.push(`/assets/${data?.deviceDetails?._id}`)}
          className="px-6 cursor-pointer py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]"
        >
          <div className="flex justify-start items-center  gap-4">
            <img
              src={
                data?.deviceDetails?.image?.[0]?.url ??
                "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
              }
              alt="Asset Image"
              className="   object-cover size-20 border  flex justify-center items-center rounded-full"
            />

            <div>
              <div className="text-2xl font-gilroySemiBold text-black">
                {data?.deviceDetails?.custom_model ?? "-"}
              </div>
              <div className="font-gilroyMedium text-lg text-[#7C7C7C]">
                {data?.deviceDetails?.serial_no ?? "-"}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Second Row of First Column --> */}
        <div className="flex gap-6 flex-1">
          {/* <!-- First Column of Second Row --> */}
          <div className="flex-1  px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex flex-col gap-4  h-fit">
              <div className="text-lg  font-gilroySemiBold">Device Info.</div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Device Type
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.device_type ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Brand
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.brand ?? "-"}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    RAM
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.ram ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Storage
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.storage ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Serial Number
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.serial_no ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Condition
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.device_condition ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Warranty Status
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.deviceDetails?.warranty_status
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Second Column of Second Row --> */}
          <div className="flex-1  px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex flex-col gap-4 ">
              <h1 className="text-lg font-gilroySemiBold">Assignee Info.</h1>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Assigned to
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.userDetails?.name ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Purchased on
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {(() => {
                      const purchaseDate = data?.deviceDetails?.createdAt;

                      // Check if purchaseDate is null, undefined, or empty
                      if (!purchaseDate) {
                        return "-"; // Return "-" for null, undefined, or empty value
                      }

                      const date = new Date(purchaseDate);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return "-"; // Return "-" for invalid date
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return formattedDate;
                    })()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Assigned on
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {(() => {
                      const assignedDate = data?.deviceDetails?.assigned_at;

                      // Check if assignedDate is null, undefined, or empty
                      if (!assignedDate) {
                        return "-"; // Return "-" for null, undefined, or empty value
                      }

                      const date = new Date(assignedDate);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return "-"; // Return "-" for invalid date
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return formattedDate;
                    })()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Department
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.teamDetails?.description ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Role
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.userDetails?.designation ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Team
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.teamDetails?.title ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-sm">
                    Reporting Manager
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.manager?.name ?? "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Second Column --> */}
      <div className="flex flex-col w-[55%]">
        {/* <!-- First Row of Second Column --> */}
        <div className="px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
          <div className="flex flex-col  gap-2">
            <div className=" font-gilroySemiBold text-lg">Issue Info</div>
            <div className="flex justify-between items-center pb-4 border-b-[1px] border-[rgba(195, 195, 195, 0.31);]">
              <div className="font-gilroySemiBold text-2xl text-black">
                {data?.title}
              </div>
              <div className="flex gap-3">
                {data?.status!.toLowerCase() === "open" ? (
                  <div className="font-gilroyMedium  text-[#027A48] bg-[#ECFDF3] py-0.5 px-3 rounded-full">
                    {data?.status}
                  </div>
                ) : (
                  <div className="font-gilroyMedium  text-[#FF0000] bg-[#FED9D9] py-0.5 px-3 rounded-full">
                    {data?.status}
                  </div>
                )}

                {data?.priority?.toLowerCase() === "low" ? (
                  <div className="font-gilroyMedium  text-[#027A48] bg-[#ECFDF3] py-0.5 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                ) : data?.priority?.toLowerCase() === "medium" ? (
                  <div className="font-gilroyMedium  text-[#FF0000] bg-[#FED9D9] py-0.5 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                ) : (
                  <div className="font-gilroyMedium  text-[#FF0000] bg-[#FED9D9] py-0.5 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="font-gilroySemiBold text-sm text-[#737373]">
                  Opened on
                </div>
                <div className="font-gilroySemiBold underline text-[#008910] text-base">
                  {(() => {
                    const createIssue = data?.createdAt!;

                    // Check if createIssue is null, undefined, or empty
                    if (!createIssue) {
                      return "-"; // Return "-" for null, undefined, or empty value
                    }

                    const date = new Date(createIssue);

                    // Check if the date is valid
                    if (isNaN(date.getTime())) {
                      return "-"; // Return "-" for invalid date
                    }

                    const formattedDate = date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });

                    return formattedDate;
                  })()}
                </div>
              </div>

              {!(data?.status!.toLowerCase() === "open") && (
                <div className="flex flex-col gap-1">
                  <div className="font-gilroySemiBold text-base text-[#737373]">
                    Closed on
                  </div>
                  <div className="font-gilroySemiBold underline text-[#FF0000] text-base">
                    {(() => {
                      const closedOn = data?.updatedAt!;

                      // Check if closedOn is null, undefined, or empty
                      if (!closedOn) {
                        return "-"; // Return "-" for null, undefined, or empty value
                      }

                      const date = new Date(closedOn);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return "-"; // Return "-" for invalid date
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return formattedDate;
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-gilroySemiBold text-sm text-[#737373]">
                Description
              </div>
              <div className="font-gilroySemiBold text-base">
                {/* Show up to 12 words */}
                {data?.description! ?? "-"}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-gilroySemiBold text-sm text-[#737373]">
                View attached photos
              </h1>
              <div className="flex items-center gap-3 pb-2">
                {data?.images?.length! > 0 ? (
                  data?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={
                        image ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxfQLhFFAUUzm5fbyfNWKfv2jfDJcbrCBxQ&s"
                      }
                      className="p-1 rounded-lg border h-28 w-24 cursor-pointer object-contain hover:border-black transition-transform"
                      alt={`issue-image-${index}`}
                      onClick={() => openModal(index)}
                    />
                  ))
                ) : (
                  <p className="text-xs font-gilroyMedium text-gray-500">
                    No issue images available
                  </p>
                )}
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                  {/* Modal Container */}
                  <div className="relative  rounded-xl p-4 w-[80%]  h-[80%] shadow-lg">
                    {/* Close Button */}
                    <button
                      className="absolute top-4 right-4  focus:ring-2 focus:ring-ring text-white focus:ring-offset-2 rounded-sm"
                      onClick={closeModal}
                    >
                      <X className="rounded-full bg-gray-600 p-2 size-10" />
                    </button>

                    {/* Image Display */}
                    <div className="flex justify-center items-center object-contain h-[80%]">
                      <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2  bg-black text-white rounded-full p-2 hover:bg-white hover:text-black duration-300"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <img
                        src={data?.images![selectedImageIndex]}
                        alt={`modal-image-${selectedImageIndex}`}
                        className="rounded-lg h-[100%] w-auto"
                      />
                      <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2  bg-black text-white rounded-full p-2 hover:bg-white hover:text-black duration-300"
                        onClick={handleNextImage}
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex items-center gap-3 overflow-x-auto  mt-8 justify-center">
                      {data?.images?.map((thumb, idx) => (
                        <img
                          key={idx}
                          src={
                            thumb ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxfQLhFFAUUzm5fbyfNWKfv2jfDJcbrCBxQ&s"
                          }
                          className={`p-1 rounded-lg border h-16 w-16 cursor-pointer ${
                            idx === selectedImageIndex
                              ? "border-black"
                              : "border-gray-300"
                          }`}
                          alt={`thumbnail-${idx}`}
                          onClick={() => setSelectedImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" pt-4">
          <div className="flex justify-end ">
            <div className="w-1/2" />

            <IssueStatusChange
              id={data?._id ?? ""}
              issueData={data}
              reOpen={data.status!.toLowerCase() === "open" ? false : true}
              className={cn(
                data.status!.toLowerCase() === "open"
                  ? "bg-[#027A47] "
                  : "bg-black",
                "flex-1 rounded-md py-2 px-20 whitespace-nowrap justify-center items-center border border-[#5F5F5F] font-gilroySemiBold text-[13px] text-white"
              )}
            >
              {data?.status!.toLowerCase() === "open"
                ? "Mark as Resolved"
                : "Reopen"}
            </IssueStatusChange>

            <button onClick={() => {}}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueSection;
