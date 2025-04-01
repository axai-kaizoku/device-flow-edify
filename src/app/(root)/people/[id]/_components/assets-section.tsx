import { Device } from "@/server/deviceActions";
import { User } from "@/server/userActions";
import { useRouter } from "next/navigation";
import React from "react";
import ManageAssets from "./manage-assets";

const AssetsSection = ({ user }: { user: User }) => {
  const totalAssets = user?.devices?.length;
  const router = useRouter();
  return (
    <>
      <div className=" w-full">
        <div className="flex justify-between">
          <div className="text-black -mt-2 font-gilroySemiBold text-lg">
            Assets Issued
          </div>
          <div>
            <h1 className="text-xs bg-[#ECFDF3] py-1 rounded-2xl -mt-2 px-2 font-gilroyMedium  text-[#027A48]">
              {totalAssets} Assigned
            </h1>
          </div>
        </div>

        {/* Assets */}

        <div className="flex flex-col  gap-1">
          {user?.devices?.slice(0, 2).map((device: Device) => (
            <div className="flex justify-start items-center gap-4 py-4 border-b">
              <div className="">
                <img
                  src={
                    device?.image![0]?.url ??
                    "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                  }
                  alt="Asset-1"
                  className="size-16 rounded-full border object-contain"
                />
              </div>
              <div className="flex flex-col ">
                <div className="font-gilroySemiBold text-lg">
                  {device?.custom_model ?? ""}
                </div>
                <div className="text-[#7C7C7C] font-gilroyMedium text-sm">
                  {device?.ram ?? ""} . {device?.storage ?? ""}
                </div>
                {device?.device_type && (
                  <div className="bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-gilroyMedium text-[#027A48] mt-1 max-w-16">
                    <div>{device?.device_type ?? ""}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {totalAssets! > 2 && (
            <div className="text-[#9B9B9B] font-gilroySemiBold text-lg mt-1 text-center">
              +{totalAssets! - 2} more
            </div>
          )}
          {totalAssets !== 0 && (
            <ManageAssets userData={user}>
              <div className="text-white bg-black font-gilroySemiBold text-lg w-full mt-2 py-2 rounded-full">
                Manage Assets
              </div>
            </ManageAssets>
          )}
        </div>
      </div>
    </>
  );
};

export default AssetsSection;
