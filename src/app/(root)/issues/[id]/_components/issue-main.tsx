"use client";
import { cn } from "@/lib/utils";
import { Issues } from "@/server/issueActions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IssueStatusChange } from "../../_components/issue-status-change";

const IssueSection = ({ data }: { data: Issues }) => {
  return (
    <div className="flex h-fit w-full">
      {/* <!-- First Column --> */}
      <div className="flex flex-col w-[45%]">
        {/* <!-- First Row of First Column --> */}
        <div className="m-2 py-1 px-6 rounded-[27px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
          <div className="flex justify-start items-center p-3 gap-4">
            <div className="size-[90.21px] rounded-[90.21px]">
              <img
                src={data?.deviceDetails?.image ?? "/media/mac.jpeg"}
                alt=" Asset Image"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-2xl font-gilroySemiBold text-black">
                {data?.deviceDetails?.device_name ?? "-"}
              </div>
              <div className="font-gilroyMedium text-[17.557px] text-[#7C7C7C]">
                {data?.deviceDetails?.serial_no ?? "-"}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Second Row of First Column --> */}
        <div className="flex flex-1">
          {/* <!-- First Column of Second Row --> */}
          <div className="flex-1 m-2 px-4 py-2 rounded-[27px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex flex-col gap-4 p-2 h-fit">
              <div className="text-[22px] text-[#9B9B9B] font-gilroySemiBold">
                Device Info.
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Brand
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.deviceDetails?.brand ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Model
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.deviceDetails?.custom_model ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    RAM
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.deviceDetails?.ram ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Storage
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.deviceDetails?.storage ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Serial Number
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.deviceDetails?.serial_no ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Condition
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    Good
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Warranty Status
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data.deviceDetails?.warranty_status
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Second Column of Second Row --> */}
          <div className="flex-1 m-2 px-4 py-2 rounded-[27px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex flex-col gap-4 p-2 h-fit">
              <div className="text-[22px] text-[#9B9B9B] font-gilroySemiBold">
                Assignee Info.
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Assigned to
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data?.userDetails?.name ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Purchased on
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {new Date(
                      data?.deviceDetails?.createdAt!
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Assigned on
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {new Date(
                      data?.deviceDetails?.assigned_at!
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Department
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data.teamDetails?.description ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Role
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data.userDetails?.designation ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Team
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
                    {data.teamDetails?.title ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-base">
                    Reporting Manager
                  </div>
                  <div className="font-gilroySemiBold text-black text-lg">
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
        <div className="m-2 p-4 rounded-[27px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
          <div className="flex flex-col px-6 py-4 gap-2">
            <div className="text-[#9B9B9B] font-gilroySemiBold text-[22px]">
              Issue Info
            </div>
            <div className="flex justify-between items-center pb-4 border-b-[1px] border-[rgba(195, 195, 195, 0.31);]">
              <div className="font-gilroySemiBold text-3xl text-black">
                {data?.title}
              </div>
              <div className="flex gap-3">
                {data?.status!.toLowerCase() === "open" ? (
                  <div className="font-gilroyRegular text-lg text-[#027A48] bg-[#ECFDF3] py-1 px-3 rounded-3xl">
                    {data?.status}
                  </div>
                ) : (
                  <div className="font-gilroyRegular text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl">
                    {data?.status}
                  </div>
                )}

                {data?.priority?.toLowerCase() === "low" ? (
                  <div className="font-gilroyRegular text-lg text-[#027A48] bg-[#ECFDF3] py-1 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                ) : data?.priority?.toLowerCase() === "medium" ? (
                  <div className="font-gilroyRegular text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                ) : (
                  <div className="font-gilroyRegular text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl text-center">
                    {data?.priority}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="font-gilroySemiBold text-base text-[#737373]">
                  Opened on
                </div>
                <div className="font-gilroySemiBold underline text-[#008910] text-xl">
                  {new Date(data?.createdAt!).toLocaleDateString()}
                </div>
              </div>

              {!(data?.status!.toLowerCase() === "open") && (
                <div className="flex flex-col gap-1">
                  <div className="font-gilroySemiBold text-base text-[#737373]">
                    Closed on
                  </div>
                  <div className="font-gilroySemiBold underline text-[#FF0000] text-xl">
                    {new Date(data?.updatedAt!).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-gilroySemiBold text-base text-[#737373]">
                Description
              </div>
              <div className="font-gilroySemiBold text-xl">
                {/* Show up to 12 words */}
                {data?.description!.split(" ").slice(0, 12).join(" ")}
                {data?.description!.split(" ").length > 12 && (
                  <>
                    <Dialog>
                      <DialogTrigger className="text-[#0051FF] cursor-pointer underline">
                        view more
                      </DialogTrigger>

                      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
                        {/* Title */}
                        <DialogTitle className="text-xl font-gilroySemiBold text-gray-900">
                          Issue Description
                        </DialogTitle>

                        {/* Description */}
                        <DialogDescription className="p-1 text-gray-600 overflow-auto font-gilroySemiBold ">
                          {data?.description}
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Third Row of Second Column --> */}
        <div className="m-2 p-4">
          <div className="flex justify-end gap-4">
            <div className="w-1/2" />

            <IssueStatusChange
              id={data?._id ?? ""}
              issueData={data}
              reOpen={data.status!.toLowerCase() === "open" ? false : true}
              className={cn(
                data.status!.toLowerCase() === "open"
                  ? "bg-[#027A47] "
                  : "bg-black",
                "flex-1 rounded-[49px] py-3 px-20 whitespace-nowrap justify-center items-center border border-[#5F5F5F] font-gilroySemiBold text-lg text-white"
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
