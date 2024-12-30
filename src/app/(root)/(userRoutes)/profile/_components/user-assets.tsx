import { Device } from "@/server/deviceActions";
import { User } from "@/server/userActions";
import { useRouter } from "next/navigation";

export const AssetsSection = ({ user }: { user: User }) => {
  const totalAssets = user?.devices?.length;
  const router = useRouter();
  return (
    <>
      <div className=" w-full">
        <div className="flex justify-between">
          <div className="text-[#9B9B9B] font-gilroySemiBold text-[22px]">
            Assets Issued
          </div>
          <div className="bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2  text-xs font-gilroyMedium text-[#027A48]">
            {totalAssets} Assigned
          </div>
        </div>

        {/* Assets */}

        <div className="flex flex-col mt-5 gap-1">
          {user?.devices?.slice(0, 2).map((device: Device) => (
            <div className="flex justify-start items-center gap-4 pb-4 border-b">
              <div className="">
                <img
                  src={`${device?.image || "/media/mac-2.png"}`}
                  alt="Asset-1"
                />
              </div>
              <div>
                <div className="font-gilroySemiBold text-xl">
                  {device?.device_name}
                </div>
                <div className="text-[#7C7C7C] font-gilroyMedium text-base">
                  {device?.ram} . {device?.storage}
                </div>
                <div className="bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-gilroyMedium text-[#027A48] mt-1 max-w-16">
                  <div>{device?.device_type}</div>
                </div>
              </div>
            </div>
          ))}

          {totalAssets > 2 && (
            <div className="text-[#9B9B9B] font-gilroySemiBold text-lg my-2 text-center">
              +{totalAssets - 2} more
            </div>
          )}

          <button
            className="text-white bg-black font-gilroySemiBold text-lg w-full mt-2 py-3 rounded-full"
            onClick={() => {
              router.push("/assets");
            }}
          >
            Manage Assets
          </button>
        </div>
      </div>
    </>
  );
};
