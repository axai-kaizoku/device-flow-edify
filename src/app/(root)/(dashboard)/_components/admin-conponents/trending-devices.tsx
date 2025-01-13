import { useRouter } from "next/navigation";
import { DashboardDetails } from "./interface";

export function TrendingDevices({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  const router = useRouter();
  return (
    <div className={`flex w-full flex-col `}>
      {(dashboardData?.deviceStatusData?.[0]?.trendingDevices?.length || 0) >
      0 ? (
        <div className="font-gilroy flex flex-grow flex-col items-center justify-center gap-y-[15px] rounded-3xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white pb-2 pl-[5.2px] pr-[4.7px] pt-[13px] leading-[normal] tracking-[0px] backdrop-blur-[24]">
          <div className="flex items-center justify-between gap-x-4 self-stretch pl-4 pr-8">
            <div className="flex flex-col items-center">
              <div className="text-sm font-gilroySemiBold leading-[23px]">
                Trending devices
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
              >
                <path
                  d="M6.80011 1.66077L1.98185 6.50294L6.63315 11.3451"
                  stroke="#CDCDCD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
              >
                <path
                  d="M1.98181 1.66077L6.80007 6.50294L2.14877 11.3451"
                  stroke="#CDCDCD"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-y-2 self-stretch ">
            {dashboardData?.deviceStatusData?.[0]?.trendingDevices.map(
              (response, index) => {
                return (
                  <div
                    className="flex flex-col gap-y-3 pt-[5px]"
                    key={`trending-${index}`}
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      router.push(`store/${response._id}`)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="313"
                      height="2"
                      viewBox="0 0 313 2"
                      fill="none"
                    >
                      <path
                        d="M0.169922 0.680862H312.276"
                        stroke="#EDEDED"
                        stroke-width="0.918071"
                      />
                    </svg>
                    <div className="flex h-16 flex-shrink-0 items-center justify-start gap-x-3.5">
                      <div className="flex flex-col items-center self-stretch">
                        <img
                          src="/media/mac-2.png"
                          style={{ height: 64, width: 101 }}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-y-[1.9px]">
                        <div className="text-center w-[150px] truncate text-lg font-gilroySemiBold leading-[normal]">
                          {response.device_name}
                        </div>
                        <div className="flex items-center gap-x-[2.8px] text-sm font-gilroyMedium leading-[normal] text-[gray]">
                          <div>{response.ram}</div>
                          <div className="flex flex-col items-center pb-[3.4px]">
                            {/* <Ellipse1 className="h-[2.9px] w-[2.9px] flex-shrink-0" /> */}
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
        <img src="/media/dashboard/trending.svg" style={{cursor: 'pointer'}} onClick={() => {router.push('store')}} />
      )}
    </div>
  );
}
