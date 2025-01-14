"use client";
import React, { useEffect } from "react";
import { DashboardDetails } from "./interface";

export function AssetsHealth({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  return (
    <div className={`flex w-full flex-col `}>
      <div className="font-gilroy flex flex-grow flex-col gap-y-[18px] rounded-3xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white px-5 pb-[19px] pt-3 tracking-[0px] backdrop-blur-[24]">
        <div className="flex items-center">
          <div className="text-sm font-gilroySemiBold leading-[23px]">
            Asset Health Status
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
          {(dashboardData?.deviceConditionData?.length || 0) > 0 ? (
            dashboardData?.deviceConditionData?.map((response) => {
              if (response._id === "Excellent") {
                return (
                  <div className="flex w-[127px]  flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                    <div className="relative z-0 flex items-center  text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                      >
                        <circle
                          cx="14.733"
                          cy="14.627"
                          r="14.1789"
                          fill="#027A48"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.0127 9.85196L15.6733 10.1862C15.3159 10.2372 15.0239 10.4076 14.8154 10.643L9.3569 16.1015C8.80318 16.6552 8.80316 17.553 9.3569 18.1067L11.3621 20.1119C11.9159 20.6656 12.8136 20.6656 13.3673 20.1119L18.8258 14.6534C19.0612 14.4449 19.2316 14.1529 19.2826 13.7955L19.6169 11.4561C19.7506 10.5204 18.9484 9.71824 18.0127 9.85196ZM16.3751 13.0937C16.652 13.3705 17.1009 13.3706 17.3777 13.0937C17.6546 12.8168 17.6546 12.3679 17.3777 12.0911C17.1009 11.8142 16.652 11.8142 16.3751 12.0911C16.0983 12.368 16.0983 12.8168 16.3751 13.0937Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                      {response.count || 0}
                    </div>
                    <div className="text-center  text-[11px]">
                      Excellent Device
                    </div>
                  </div>
                );
              }
              if (response._id === "Good") {
                return (
                  <div className="w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                    <div className="relative z-0 flex items-center  text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                      >
                        <circle
                          cx="14.2125"
                          cy="14.627"
                          r="14.1789"
                          fill="#FF947A"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.54092 10.3729C8.54092 8.8067 9.81055 7.53708 11.3767 7.53708H15.6304V10.3729C15.6304 11.939 16.9 13.2087 18.4662 13.2087H19.8841V18.8802C19.8841 20.4464 18.6144 21.716 17.0483 21.716H11.3767C9.81055 21.716 8.54092 20.4464 8.54092 18.8802V10.3729ZM11.3767 13.9176C10.9852 13.9176 10.6678 14.235 10.6678 14.6265C10.6678 15.0181 10.9852 15.3355 11.3767 15.3355H12.7946C13.1861 15.3355 13.5035 15.0181 13.5035 14.6265C13.5035 14.235 13.1861 13.9176 12.7946 13.9176H11.3767ZM11.3767 16.7534C10.9852 16.7534 10.6678 17.0708 10.6678 17.4623C10.6678 17.8539 10.9852 18.1713 11.3767 18.1713H14.2125C14.604 18.1713 14.9214 17.8539 14.9214 17.4623C14.9214 17.0708 14.604 16.7534 14.2125 16.7534H11.3767ZM17.5316 9.0959L17.4388 10.4883C17.4103 10.9163 17.7654 11.2714 18.1933 11.2429L19.5858 11.15C20.1935 11.1095 20.4706 10.3721 20.0399 9.94136L18.7403 8.64176C18.3096 8.21106 17.5722 8.48815 17.5316 9.0959Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                      {response.count || 0}
                    </div>
                    <div className="text-center">Good Device</div>
                  </div>
                );
              }
              if (response._id === "Fair") {
                return (
                  <div className=" w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                    <div className="relative z-0 flex items-center  text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                      >
                        <circle
                          cx="14.6913"
                          cy="14.627"
                          r="14.1789"
                          fill="#FF0000"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.72942 8.24596C8.94634 8.24596 8.31152 8.88079 8.31152 9.66386V19.5891C8.31152 20.3722 8.94634 21.007 9.72942 21.007H19.6547C20.4377 21.007 21.0726 20.3722 21.0726 19.5891V9.66386C21.0726 8.88079 20.4377 8.24596 19.6547 8.24596H9.72942ZM11.8563 15.3354C11.8563 14.9439 11.5388 14.6265 11.1473 14.6265C10.7558 14.6265 10.4384 14.9439 10.4384 15.3354V18.1712C10.4384 18.5628 10.7558 18.8802 11.1473 18.8802C11.5388 18.8802 11.8563 18.5628 11.8563 18.1712V15.3354ZM14.692 12.4996C15.0836 12.4996 15.401 12.817 15.401 13.2086V18.1712C15.401 18.5628 15.0836 18.8802 14.692 18.8802C14.3005 18.8802 13.9831 18.5628 13.9831 18.1712V13.2086C13.9831 12.817 14.3005 12.4996 14.692 12.4996ZM18.9457 11.0817C18.9457 10.6902 18.6283 10.3728 18.2368 10.3728C17.8452 10.3728 17.5278 10.6902 17.5278 11.0817V18.1712C17.5278 18.5628 17.8452 18.8802 18.2368 18.8802C18.6283 18.8802 18.9457 18.5628 18.9457 18.1712V11.0817Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                      {response.count || 0}
                    </div>
                    <div className="text-center">Fair Device</div>
                  </div>
                );
              }
            })
          ) : (
            <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
              <div className="flex w-[127px]  flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <circle
                      cx="14.733"
                      cy="14.627"
                      r="14.1789"
                      fill="#027A48"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.0127 9.85196L15.6733 10.1862C15.3159 10.2372 15.0239 10.4076 14.8154 10.643L9.3569 16.1015C8.80318 16.6552 8.80316 17.553 9.3569 18.1067L11.3621 20.1119C11.9159 20.6656 12.8136 20.6656 13.3673 20.1119L18.8258 14.6534C19.0612 14.4449 19.2316 14.1529 19.2826 13.7955L19.6169 11.4561C19.7506 10.5204 18.9484 9.71824 18.0127 9.85196ZM16.3751 13.0937C16.652 13.3705 17.1009 13.3706 17.3777 13.0937C17.6546 12.8168 17.6546 12.3679 17.3777 12.0911C17.1009 11.8142 16.652 11.8142 16.3751 12.0911C16.0983 12.368 16.0983 12.8168 16.3751 13.0937Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-center  text-[11px]">Excellent Device</div>
              </div>
              <div className="w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <circle
                      cx="14.2125"
                      cy="14.627"
                      r="14.1789"
                      fill="#FF947A"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.54092 10.3729C8.54092 8.8067 9.81055 7.53708 11.3767 7.53708H15.6304V10.3729C15.6304 11.939 16.9 13.2087 18.4662 13.2087H19.8841V18.8802C19.8841 20.4464 18.6144 21.716 17.0483 21.716H11.3767C9.81055 21.716 8.54092 20.4464 8.54092 18.8802V10.3729ZM11.3767 13.9176C10.9852 13.9176 10.6678 14.235 10.6678 14.6265C10.6678 15.0181 10.9852 15.3355 11.3767 15.3355H12.7946C13.1861 15.3355 13.5035 15.0181 13.5035 14.6265C13.5035 14.235 13.1861 13.9176 12.7946 13.9176H11.3767ZM11.3767 16.7534C10.9852 16.7534 10.6678 17.0708 10.6678 17.4623C10.6678 17.8539 10.9852 18.1713 11.3767 18.1713H14.2125C14.604 18.1713 14.9214 17.8539 14.9214 17.4623C14.9214 17.0708 14.604 16.7534 14.2125 16.7534H11.3767ZM17.5316 9.0959L17.4388 10.4883C17.4103 10.9163 17.7654 11.2714 18.1933 11.2429L19.5858 11.15C20.1935 11.1095 20.4706 10.3721 20.0399 9.94136L18.7403 8.64176C18.3096 8.21106 17.5722 8.48815 17.5316 9.0959Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-center">Good Device</div>
              </div>
              <div className=" w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <circle
                      cx="14.6913"
                      cy="14.627"
                      r="14.1789"
                      fill="#FF0000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.72942 8.24596C8.94634 8.24596 8.31152 8.88079 8.31152 9.66386V19.5891C8.31152 20.3722 8.94634 21.007 9.72942 21.007H19.6547C20.4377 21.007 21.0726 20.3722 21.0726 19.5891V9.66386C21.0726 8.88079 20.4377 8.24596 19.6547 8.24596H9.72942ZM11.8563 15.3354C11.8563 14.9439 11.5388 14.6265 11.1473 14.6265C10.7558 14.6265 10.4384 14.9439 10.4384 15.3354V18.1712C10.4384 18.5628 10.7558 18.8802 11.1473 18.8802C11.5388 18.8802 11.8563 18.5628 11.8563 18.1712V15.3354ZM14.692 12.4996C15.0836 12.4996 15.401 12.817 15.401 13.2086V18.1712C15.401 18.5628 15.0836 18.8802 14.692 18.8802C14.3005 18.8802 13.9831 18.5628 13.9831 18.1712V13.2086C13.9831 12.817 14.3005 12.4996 14.692 12.4996ZM18.9457 11.0817C18.9457 10.6902 18.6283 10.3728 18.2368 10.3728C17.8452 10.3728 17.5278 10.6902 17.5278 11.0817V18.1712C17.5278 18.5628 17.8452 18.8802 18.2368 18.8802C18.6283 18.8802 18.9457 18.5628 18.9457 18.1712V11.0817Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-center">Fair Device</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
