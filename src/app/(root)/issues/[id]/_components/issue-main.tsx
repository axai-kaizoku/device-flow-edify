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
        <div className="px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
          <div className="flex justify-start items-center p-3 gap-4">
            <img
              src={
                data?.deviceDetails?.image ??
                "data:image/jpeg;base64,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"
              }
              alt="Asset Image"
              className="   object-cover size-20 border  flex justify-center items-center rounded-full"
            />

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
          <div className="flex-1  px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex flex-col gap-4 p-2 h-fit">
              <div className="text-lg  font-gilroySemiBold">Device Info.</div>

              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Brand
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.brand ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Model
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.custom_model ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    RAM
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.ram ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Storage
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.storage ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Serial Number
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.deviceDetails?.serial_no ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Condition
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    Good
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
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
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Assigned to
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data?.userDetails?.name ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Purchased on
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {new Date(
                      data?.deviceDetails?.createdAt!
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Assigned on
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {new Date(
                      data?.deviceDetails?.assigned_at!
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Department
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.teamDetails?.description ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Role
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.userDetails?.designation ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
                    Team
                  </div>
                  <div className="font-gilroySemiBold text-black text-base">
                    {data.teamDetails?.title ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroySemiBold text-xs">
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
        <div className="m-2 p-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
          <div className="flex flex-col px-6 py-4 gap-2">
            <div className=" font-gilroySemiBold text-lg">Issue Info</div>
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
