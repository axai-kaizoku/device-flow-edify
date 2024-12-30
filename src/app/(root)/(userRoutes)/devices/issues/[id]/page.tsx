import { CombinedContainer } from "@/components/container/container";
import React from "react";
import { getIssueById, Issues } from "@/server/issueActions";
import { X } from "lucide-react";

interface IssuePageProps {
  params: { id: string };
}

async function SignleIssue({ params }: IssuePageProps) {
  const data: Issues = await getIssueById(params.id);

  return (
    <div className="w-full pr-8 overflow-y-scroll mb-10">
      <h1 className="font-gilroySemiBold  text-[#7F7F7F] text-lg px-2 py-6">
        Issues <span className="text-black text-xl">(ID: {data?._id})</span>
      </h1>
      <div className="flex h-fit w-full">
        <div className="flex flex-col w-[45%]">
          <div className="m-2 py-1 px-6 rounded-[27px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex justify-start items-center p-3 gap-4">
              <div className="size-[90.21px] rounded-[90.21px]">
                <img
                  src={`/media/mac.jpeg`}
                  alt=" Asset Image"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-2xl font-gilroySemiBold text-black">
                  Macbook Pro 2023
                </div>
                <div className="font-gilroyMedium text-[17.557px] text-[#7C7C7C]">
                  A13HNSXGE683BSDGG
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
                      Apple
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Model
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      Macbook Pro 2023
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      RAM
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      16GB
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Storage
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      512GB
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Serial Number
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      EDIFY-23456
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Condition
                    </div>
                    <div className="font-gilroySemiBold text-[#008910] text-lg">
                      Good
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Warranty Status
                    </div>
                    <div className="font-gilroySemiBold text-[#008910] text-lg">
                      In Warranty
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
                      {data?.userName}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Purchased on
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      Macbook Pro 2023
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Assigned on
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      16GB
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Department
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      512GB
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Role
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      EDIFY-23456
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Team
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      Good
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-base">
                      Reporting Manager
                    </div>
                    <div className="font-gilroySemiBold text-black text-lg">
                      Active
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
                  {data?.priority?.toLowerCase() === "low" ? (
                    <div className="font-gilroySemiBold text-lg text-[#027A48] bg-[#ECFDF3] py-1 px-3 rounded-3xl text-center">
                      {data?.priority}
                    </div>
                  ) : data?.priority?.toLowerCase() === "medium" ? (
                    <div className="font-gilroySemiBold text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl text-center">
                      {data?.priority}
                    </div>
                  ) : (
                    <div className="font-gilroySemiBold text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl text-center">
                      {data?.priority}
                    </div>
                  )}
                  {data?.status!.toLowerCase() === "open" ? (
                    <div className="font-gilroySemiBold text-lg text-[#027A48] bg-[#ECFDF3] py-1 px-3 rounded-3xl">
                      {data?.status}
                    </div>
                  ) : (
                    <div className="font-gilroySemiBold text-lg text-[#FF0000] bg-[#FED9D9] py-1 px-3 rounded-3xl">
                      {data?.status}
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
                    {new Date(data?.createdAt!).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
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
                  {data?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignleIssue;
