import { getIssueById, Issues } from "@/server/issueActions";
import { cn } from "@/lib/utils";

interface IssuePageProps {
  params: { id: string };
}

async function SignleIssue({ params }: IssuePageProps) {
  const data: Issues = await getIssueById(params.id);

  return (
    <div className="w-full pr-8 overflow-y-scroll">
      <h1 className="font-gilroySemiBold  text-[#7F7F7F] text-lg px-2 mb-6">
        Issues <span className="text-black text-xl">(ID: {data?._id})</span>
      </h1>

      <div className="flex h-fit  w-full gap-6">
        {/* <!-- First Column --> */}
        <div className="flex flex-col gap-6 w-[45%]">
          {/* <!-- First Row of First Column --> */}
          <div className="px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
            <div className="flex justify-start items-center  gap-4">
              <img
                src={data?.deviceDetails?.image ?? "/media/mac.jpeg"}
                alt=" Asset Image"
                className="object-cover size-20 border  flex justify-center items-center rounded-full"
              />
              <div>
                <div className="text-2xl font-gilroySemiBold text-black">
                  {data?.deviceDetails?.device_name ?? "-"}
                </div>
                <div className="font-gilroyMedium text-lg text-[#7C7C7C]">
                  {data?.deviceDetails?.serial_no ?? "-"}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Second Row of First Column --> */}
          <div className="flex flex-1 gap-6">
            {/* <!-- First Column of Second Row --> */}
            <div className="flex-1  px-6 py-4 rounded-[25px] bg-[rgba(255,255,255,0.8)] border border-[rgba(195,195,195,0.31)]">
              <div className="flex flex-col gap-4  h-fit">
                <div className="text-lg  font-gilroySemiBold">Device Info.</div>

                <div className="flex flex-col gap-3 w-full">
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
                      Model
                    </div>
                    <div className="font-gilroySemiBold text-black text-base">
                      {data?.deviceDetails?.custom_model ?? "-"}
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
                      Good
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
                      {new Date(
                        data?.deviceDetails?.createdAt!
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#737373] font-gilroySemiBold text-sm">
                      Assigned on
                    </div>
                    <div className="font-gilroySemiBold text-black text-base">
                      {new Date(
                        data?.deviceDetails?.assigned_at!
                      ).toLocaleDateString()}
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
                    {new Date(data?.createdAt!).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {!(data?.status!.toLowerCase() === "open") && (
                  <div className="flex flex-col gap-1">
                    <div className="font-gilroySemiBold text-base text-[#737373]">
                      Closed on
                    </div>
                    <div className="font-gilroySemiBold underline text-[#FF0000] text-base">
                      {new Date(data?.updatedAt!).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
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
                  {data?.description!}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-gilroySemiBold  text-sm text-[#737373]">
                  View attached photos
                </h1>
                <div className="flex items-center gap-3 pb-2">
                  <img
                    src={
                      data?.images ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxfQLhFFAUUzm5fbyfNWKfv2jfDJcbrCBxQ&s"
                    }
                    className="p-1 rounded-lg border h-28 w-24"
                    alt="issue-image"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxfQLhFFAUUzm5fbyfNWKfv2jfDJcbrCBxQ&s"
                    className="p-1 rounded-lg border h-28 w-24"
                    alt="issue-image"
                  />
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
