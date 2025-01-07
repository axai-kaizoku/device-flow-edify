import { Icons } from "@/components/icons";
import { Device } from "@/server/deviceActions";
import { getUserById, User } from "@/server/userActions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const DeviceGrid = async ({ data }: { data: Device }) => {
  let isAssigned: boolean;
  if (!data.userId || data.userId === null || data.userId.length < 0) {
    isAssigned = false;
  } else {
    isAssigned = true;
  }

  let assignedTo: User;
  try {
    assignedTo = await getUserById(data.userId ?? "");
  } catch (error) {
    assignedTo = {};
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex w-full h-[96%] justify-between items-start">
          <div className="w-[58%] h-full flex justify-between gap-4">
            {/* Device Data */}
            <div className="rounded-2xl w-[52%] h-full border border-[#C3C3C34F] bg-white p-5 2xl:p-7 flex flex-col justify-start gap-y-1.5">
              <div className="flex gap-2 items-center">
                <img
                  src={data?.image ?? "/media/mac.jpeg"}
                  alt={data.device_name ?? "device-"}
                  className="w-[5rem] h-[5rem] 2xl:w-24 2xl:h-24 rounded-full object-contain"
                />
                <div className="flex flex-col gap-y-1 justify-center">
                  <div className="text-[#737373] font-gilroyMedium text-base 2xl:text-lg">
                    {data?.brand ?? "-"}
                  </div>
                  <div className="text-black font-gilroySemiBold text-xl 2xl:text-2xl">
                    {data?.custom_model ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Brand
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.brand ?? "-"}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Model
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.custom_model ?? "-"}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  OS
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.os ?? "-"}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Processor
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.processor ?? "-"}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  RAM & Storage{" "}
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {`${data?.ram ?? "-"} ${data?.storage ?? "-"}`}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Condition
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {/* {data?.condition ?? "-"} */}
                  Logic yet to be done
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Serial Number
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.serial_no ?? "-"}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                  Device Id
                </div>
                <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                  {data?.asset_serial_no ?? "-"}
                </div>
              </div>
            </div>

            {data.userId && (
              <div className="rounded-2xl w-[44%] h-full border border-[#C3C3C34F] bg-white p-5 2xl:p-7 flex flex-col gap-y-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={
                      assignedTo?.image ??
                      "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                    }
                    alt={assignedTo.first_name ?? "assignee-"}
                    className="w-[5rem] h-[5rem] 2xl:w-24 2xl:h-24 rounded-full object-contain"
                  />
                  <div className="flex flex-col gap-y-1 justify-center">
                    <div className="text-black font-gilroySemiBold text-xl 2xl:text-2xl">
                      {`${assignedTo?.first_name ?? "-"} ${
                        assignedTo?.last_name ?? ""
                      }`}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Employee ID
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {assignedTo?._id ?? "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Assigned to
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {`${assignedTo?.first_name ?? "-"} ${
                      assignedTo?.last_name ?? ""
                    }`}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Department
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {assignedTo?.teamId?.description ?? "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Role
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {assignedTo?.designation ?? "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Team
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {`${assignedTo?.teamId?.title ?? "-"}`}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Email ID
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {assignedTo?.email ?? "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Reporting manager
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold flex gap-.5 items-center">
                    {`${assignedTo?.reporting_manager?.first_name ?? "-"} ${
                      assignedTo?.reporting_manager?.last_name ?? ""
                    }`}{" "}
                    {assignedTo.reporting_manager?.first_name && (
                      <Icons.open_user_view />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-">
                  <div className="text-[#737373] font-gilroySemiBold text-base 2xl:text-lg">
                    Assigned on
                  </div>
                  <div className="text-black text-lg 2xl:text-xl font-gilroySemiBold">
                    {new Date(data?.assigned_at!).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }) ?? "-"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-[38%] h-full flex flex-col justify-between gap-4">
            <div className="h-[57%] w-full border border-[#C3C3C34F] bg-white rounded-2xl p-5 2xl:p-7 flex flex-col gap-y-1.5">
              <div className="flex justify-between items-center">
                <div className="text-[#9B9B9B] font-gilroySemiBold text-lg 2xl:text-xl">
                  Device Info.
                </div>
                {data.warranty_status ? (
                  <>
                    <div className="w-fit h-fit text-[#027A48] bg-[#ECFDF3] px-1 py-0.5">
                      In warranty
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-sm 2xl:text-base">
                  Warranty
                </div>
                <div className="text-[#027947] font-gilroySemiBold text-base 2xl:text-lg">
                  In Warranty :{" "}
                  {Math.ceil(
                    new Date(data.warranty_expiary_date!).getTime() -
                      new Date().getTime() / (1000 * 60 * 60 * 24)
                  )}{" "}
                  Days Remaining
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-sm 2xl:text-base">
                  Warranty Expiry
                </div>
                <div className="text-black font-gilroySemiBold text-base 2xl:text-lg">
                  {new Date(data?.warranty_expiary_date!).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-sm 2xl:text-base">
                  Purchased On
                </div>
                <div className="text-black font-gilroySemiBold text-base 2xl:text-lg">
                  {new Date(data?.createdAt!).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="text-[#737373] font-gilroySemiBold text-sm 2xl:text-base">
                  Purchase value
                </div>
                <div className="text-black font-gilroySemiBold text-base 2xl:text-lg">
                  {data?.purchase_value ?? "-"}/-
                </div>
              </div>
            </div>
            <div className="h-[38%] w-full border border-[#C3C3C34F] bg-white rounded-2xl p-6">
              {/*  */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-0.5">
                  <div className="px-2 py-0.5 text-[#B2B2B2] w-fit h-fit text-xs border rounded-3xl">
                    Store
                  </div>
                  <div className="font-gilroyMedium text-3xl">
                    Highest Quality,
                  </div>
                  <div className="font-gilroyMedium text-3xl">
                    Refurbished & New
                  </div>
                  <div className="font-gilroyMedium text-3xl">Devices</div>
                  <div className="text-[#B1B1B1] font-gilroyMedium text-sm ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod.
                  </div>
                </div>
                <Link
                  href="/store"
                  className="rounded-3xl text-white py-2 h-fit w-fit px-3.5 bg-black flex justify-center items-center gap-1.5"
                >
                  Visit <ChevronRight className="text-white size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
