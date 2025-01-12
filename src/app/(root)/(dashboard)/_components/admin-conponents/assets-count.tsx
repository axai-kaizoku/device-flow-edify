import React from "react";
import { DashboardDetails } from "./interface";
export function AssetsCount({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  return (
    <div className={`flex w-full items-start rounded-3xl `}>
      <div className="font-gilroy flex h-full w-full flex-shrink-0 flex-col gap-y-4 overflow-clip rounded-3xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white pb-5 pl-[22px] pr-5 pt-[13px] tracking-[0px] backdrop-blur-[24]">
        <div className="flex items-center">
          <div className="flex items-center justify-center gap-x-[18px] pt-[0.08px]">
            <div className="text-sm font-gilroySemiBold leading-[23px]">
              Asset Count
            </div>
            <div className="rounded-[17px] bg-purple-50 px-2 py-0.5 text-center text-xs font-gilroyMedium leading-[19px] text-purple-700">
              {(dashboardData?.deviceStatusData?.[0]?.assigned || 0) +
                (dashboardData?.deviceStatusData?.[0]?.inactive || 0) +
                (dashboardData?.deviceStatusData?.[0]?.un_assigned || 0)}{" "}
              Total Assets
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
          <div className="flex w-[127px] flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
            <div className="relative z-0 flex items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <circle cx="14.9335" cy="14.8325" r="14.1789" fill="#027A48" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.97127 8.45196C9.18819 8.45196 8.55338 9.08678 8.55338 9.86985V19.7951C8.55338 20.5782 9.18819 21.213 9.97127 21.213H19.8965C20.6796 21.213 21.3144 20.5782 21.3144 19.7951V9.86985C21.3144 9.08678 20.6796 8.45196 19.8965 8.45196H9.97127ZM12.0981 15.5414C12.0981 15.1499 11.7807 14.8325 11.3892 14.8325C10.9976 14.8325 10.6802 15.1499 10.6802 15.5414V18.3772C10.6802 18.7688 10.9976 19.0862 11.3892 19.0862C11.7807 19.0862 12.0981 18.7688 12.0981 18.3772V15.5414ZM14.9339 12.7056C15.3254 12.7056 15.6428 13.023 15.6428 13.4146V18.3772C15.6428 18.7688 15.3254 19.0862 14.9339 19.0862C14.5424 19.0862 14.2249 18.7688 14.2249 18.3772V13.4146C14.2249 13.023 14.5424 12.7056 14.9339 12.7056ZM19.1876 11.2877C19.1876 10.8962 18.8702 10.5788 18.4786 10.5788C18.0871 10.5788 17.7697 10.8962 17.7697 11.2877V18.3772C17.7697 18.7688 18.0871 19.0862 18.4786 19.0862C18.8702 19.0862 19.1876 18.7688 19.1876 18.3772V11.2877Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
              {dashboardData?.deviceStatusData?.[0]?.assigned || 0}
            </div>
            <div className="text-center  text-[11px]">Assigned</div>
          </div>
          <div className="w-[127px] flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
            <div className="relative z-0 flex items-center  text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
              >
                <circle cx="14.4127" cy="14.8324" r="14.1789" fill="#FF947A" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.74067 10.5786C8.74067 9.01243 10.0103 7.74281 11.5765 7.74281H15.8301V10.5786C15.8301 12.1448 17.0998 13.4144 18.6659 13.4144H20.0838V19.0859C20.0838 20.6521 18.8142 21.9217 17.248 21.9217H11.5765C10.0103 21.9217 8.74067 20.6521 8.74067 19.0859V10.5786ZM11.5765 14.1233C11.1849 14.1233 10.8675 14.4407 10.8675 14.8323C10.8675 15.2238 11.1849 15.5412 11.5765 15.5412H12.9943C13.3859 15.5412 13.7033 15.2238 13.7033 14.8323C13.7033 14.4407 13.3859 14.1233 12.9943 14.1233H11.5765ZM11.5765 16.9591C11.1849 16.9591 10.8675 17.2765 10.8675 17.6681C10.8675 18.0596 11.1849 18.377 11.5765 18.377H14.4122C14.8038 18.377 15.1212 18.0596 15.1212 17.6681C15.1212 17.2765 14.8038 16.9591 14.4122 16.9591H11.5765ZM17.7314 9.30163L17.6386 10.6941C17.61 11.122 17.9651 11.4771 18.3931 11.4486L19.7855 11.3558C20.3933 11.3153 20.6704 10.5778 20.2397 10.1471L18.9401 8.84749C18.5094 8.41679 17.7719 8.69388 17.7314 9.30163Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
              {dashboardData?.deviceStatusData?.[0]?.un_assigned || 0}
            </div>
            <div className="text-center">Unassigned</div>
          </div>
          <div className=" w-[127px] flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
            <div className="relative z-0 flex items-center  text-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14.8918" cy="14.8325" r="14.1789" fill="#FF0000" />
                <g clip-path="url(#clip0_2303_3395)">
                  <path
                    d="M8.89264 16.4929L11.5593 18.0554L13.5593 15.8679L15.5593 18.3679L16.8926 16.8054L18.8926 17.1179L16.8926 15.2429L15.5593 16.8054L13.5593 13.6804L11.226 16.0241L8.89264 13.9929V9.61286C8.89264 9.27723 9.19064 8.99286 9.55797 8.99286H16.226V12.7429C16.226 12.9086 16.2962 13.0676 16.4212 13.1848C16.5463 13.302 16.7158 13.3679 16.8926 13.3679H20.8926V20.8635C20.8933 20.9456 20.8766 21.0269 20.8437 21.103C20.8107 21.179 20.7622 21.2483 20.7007 21.3067C20.6392 21.3652 20.5661 21.4117 20.4854 21.4436C20.4048 21.4756 20.3182 21.4923 20.2306 21.4929H9.55464C9.37918 21.4929 9.2109 21.4276 9.08677 21.3113C8.96264 21.195 8.89282 21.0373 8.89264 20.8729V16.4929ZM20.8926 12.1179H17.5593V8.99473L20.8926 12.1179Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2303_3395">
                    <rect
                      width="16"
                      height="15"
                      fill="white"
                      transform="translate(6.89264 7.74286)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
              {dashboardData?.deviceStatusData?.[0]?.inactive || 0}
            </div>
            <div className="text-center">Inactive</div>
          </div>
        </div>
      </div>
    </div>
  );
}
