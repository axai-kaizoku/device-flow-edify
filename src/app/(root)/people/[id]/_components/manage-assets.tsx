"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/buttons/Button";
import { User } from "@/server/userActions";
import Link from "next/link";

export default function ManageAssets({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: User;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[97%] h-full justify-start items-center">
            <div className="flex flex-col gap-1 pb-5 w-full">
              <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
                <div className="bg-black rounded-full size-12 2xl:size-16 p-2 flex justify-center items-center">
                  <Icons.user_form_icon className="size-8 2xl:size-11" />
                </div>
                <span className="font-gilroySemiBold text-2xl 2xl:text-3xl">
                  Manage assets
                </span>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="font-gilroySemiBold text-lg 2xl:text-xl text-black">
                  {"Step 1 of 1"}
                </div>
                <div className="h-[1px] bg-[#E7E7E7] w-full mb-3"></div>
              </div>
            </div>
            {userData.devices?.map((deviceData) => (
              <Link
                key={deviceData._id}
                href={`/assets/${deviceData._id}`}
                className="h-[28vh] w-full bg-[#F1F1F1] border rounded-3xl mb-8 flex items-center gap-6 pl-7"
              >
                <img
                  src={deviceData.image ?? ""}
                  alt="team-image"
                  className="w-24 h-24 object-contain rounded-full border"
                />
                <div className="h-full w-full flex flex-col justify-center gap-1">
                  <div className="flex gap-3 items-center">
                    <div className="text-black font-gilroySemiBold text-xl 2xl:text-2xl">
                      {deviceData?.device_name ?? "-"}
                    </div>
                    <div className="text-[#027A48] h-fit rounded-3xl bg-[#ECFDF3] text-sm 2xl:text-base font-gilroySemiBold flex justify-center items-center px-2 py-0.5">
                      Active
                    </div>
                  </div>
                  <div className="text-[#7C7C7C] text-base 2xl:text-lg font-gilroyMedium">
                    {deviceData?.serial_no ?? ""}
                  </div>

                  {/* <div className="flex gap-2 items-end">
                  <div className="text-[#ADADAC] text-sm 2xl:text-base font-gilroySemiBold">
                    Reporting Manger:
                  </div>
                  <div className="text-black font-gilroySemiBold">
                    {`${teamData?.manager![0]?.first_name ?? "-"} ${
                      teamData?.manager![0]?.last_name ?? ""
                    }`}
                  </div>
                </div> */}
                </div>
              </Link>
            ))}

            <div className="flex gap-2  w-full p-4">
              <Button
                className="rounded-full w-1/2  text-xl font-gilroySemiBold border border-black"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>

              <Button
                className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                onClick={() => setOpen(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
