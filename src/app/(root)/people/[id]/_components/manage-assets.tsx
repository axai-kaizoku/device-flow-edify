"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useState } from "react";
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
        <div className="flex relative flex-col w-full h-full gap-6  justify-start items-center">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
              <div className="size-9 2xl:size-11 flex justify-center items-center bg-black rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M3.67163 10.3953C3.67163 7.24709 3.67163 5.67298 4.64966 4.69495C5.62769 3.71692 7.20181 3.71692 10.35 3.71692H17.0285C20.1767 3.71692 21.7508 3.71692 22.7288 4.69495C23.7069 5.67298 23.7069 7.24709 23.7069 10.3953V15.9607C23.7069 18.0595 23.7069 19.1089 23.0548 19.7609C22.4028 20.4129 21.3534 20.4129 19.2546 20.4129H8.1239C6.02508 20.4129 4.97567 20.4129 4.32366 19.7609C3.67163 19.1089 3.67163 18.0595 3.67163 15.9607V10.3953Z"
                    stroke="white"
                    strokeWidth="1.6696"
                  />
                  <path
                    d="M24.8202 23.7521H2.55884"
                    stroke="white"
                    strokeWidth="1.6696"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.0285 17.0737H10.3501"
                    stroke="white"
                    strokeWidth="1.6696"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1 className="font-gilroySemiBold text-xl 2xl:text-3xl">
                Assign Asset
              </h1>
            </div>
          </div>
          <div className="h-[1px] bg-[#E7E7E7] w-full mb-1"></div>
          <div className="h-[80vh] flex flex-col w-full gap-6 overflow-auto">
            {userData.devices?.map((deviceData) => (
              <Link
                key={deviceData._id}
                href={`/assets/${deviceData._id}`}
                className="w-[97%]  flex items-center "
              >
                <div className=" w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4 ">
                  <img
                    src={
                      deviceData?.image?.[0]?.url ??
                      "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                    }
                    alt="device-image"
                    className="w-20 h-20 p-1  object-contain border rounded-full "
                  />
                  <div className=" w-full flex flex-col justify-center ">
                    <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                      {deviceData?.custom_model ?? "-"}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                      {deviceData?.ram ?? "RAM"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {deviceData?.storage ?? "Storage"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {deviceData?.serial_no ?? "Serial number"}
                    </h1>
                    <p className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                      Active
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Button */}
          <div className="flex mb-2 gap-2  w-full ">
            <Button
              className="rounded-full w-1/2  text-base font-gilroySemiBold border border-black"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>

            <Button
              className="rounded-full w-1/2 text-base font-gilroySemiBold bg-black text-white "
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
