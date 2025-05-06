import { useRouter } from "next/navigation";
import { DashboardDetails } from "./interface";
import HorizontalLine from "@/icons/HorizontalLine";
import DotSeperator from "@/icons/DotSeperator";

export function TrendingDevices({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  const router = useRouter();

  if (!dashboardData) {
    return (
      <div className="w-full h-full bg-white  rounded-md border border-black/10 flex flex-col justify-center items-center px-3 py-5 gap-6 lg:p-7">
        <img
          src="/media/dashboard/trending-empty.jpg"
          width={200}
          height={150}
        />
        <div className="w-full">
          <p className="text-black text-lg font-gilroySemiBold text-center">
            Nothing here yet
          </p>
          <p className="text-gray-400 text-sm font-gilroyMedium text-center">
            We'll be here soon
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/store");
          }}
          className="bg-black cursor-pointer px-3 py-2 text-sm rounded-[6px] text-white font-gilroyMedium"
        >
          Visit Store
        </button>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col rounded-[10px] `}>
      {(dashboardData?.deviceStatusData?.[0]?.trendingDevices?.length || 0) >
      0 ? (
        <div className="font-gilroy flex flex-grow flex-col items-center justify-center gap-y-[5px] rounded-[10px] border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white pb-2 pl-[5.2px] pr-[4.7px] pt-[13px] leading-[normal] tracking-[0px] backdrop-blur-[24]">
          <div className="flex items-center justify-between gap-x-4 self-stretch pl-4 pr-8">
            <div className="flex flex-col items-center">
              <div className="text-sm font-gilroySemiBold leading-[23px]">
                Trending devices
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-y-2 self-stretch ">
            {dashboardData?.deviceStatusData?.[0]?.trendingDevices.map(
              (response, index) => {
                return (
                  <div
                    className="flex flex-col gap-y-6 pt-[5px] overflow-hidden"
                    key={`trending-${index}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`store/${response._id}`);
                    }}
                  >
                    <HorizontalLine />
                    <div className="flex h-16 flex-shrink-0 items-center justify-evenly gap-x-3.5">
                      <div className="flex flex-col justify-center items-center self-stretch w-[101px] h-16 object-cover max-xl:w-[80px] max-xl:h-[40px]">
                        <img
                          src={response?.image?.[0]?.url || "/media/mac-2.png"}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-y-[1.9px]">
                        <div className="text-center w-[150px] truncate text-lg max-xl:text-base font-gilroySemiBold leading-[normal]">
                          {response.device_name}
                        </div>
                        <div className="flex items-center gap-x-[2.8px] text-sm font-gilroyMedium leading-[normal] text-[gray]">
                          <div>{response.ram}</div>
                          <div className="flex flex-col items-center pb-[3.4px]">
                            <DotSeperator />
                          </div>
                          <div>{response.storage}</div>
                        </div>
                        <div className="flex items-center pt-[1.9px]">
                          <div className="rounded-[15px] bg-green-50 py-[1.9px] pl-[5.7px] pr-[7.6px] text-center text-[11px] font-gilroyMedium leading-[17px] text-green-700">
                            New
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-white  rounded-md border border-black/10 flex flex-col justify-center items-center px-3 py-5 gap-6 lg:p-7">
        <img
          src="/media/dashboard/trending-empty.jpg"
          width={200}
          height={150}
        />
        <div className="w-full">
          <p className="text-black text-lg font-gilroySemiBold text-center">
            Nothing here yet
          </p>
          <p className="text-gray-400 text-sm font-gilroyMedium text-center">
            We'll be here soon
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/store");
          }}
          className="bg-black cursor-pointer px-3 py-2 text-sm rounded-[6px] text-white font-gilroyMedium"
        >
          Visit Store
        </button>
      </div>
      )}
    </div>
  );
}
