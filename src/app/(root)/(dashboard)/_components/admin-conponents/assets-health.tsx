"use client";
import React, { useEffect } from "react";
import { DashboardDetails } from "./interface";
import ExcellentDeviceIcon from "@/icons/ExcellentDeviceIcon";
import UnassignedDeviceIcon from "@/icons/UnassignedDeviceIcon";
import FairDeviceIcon from "@/icons/FairDeviceIcon";

export function AssetsHealth({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) {
  return (
    <div className={`flex w-full flex-col `}>
      <div className="font-gilroy flex flex-grow flex-col gap-y-[18px] rounded-2xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white px-5 pb-[49px] pt-[13px] tracking-[0px] backdrop-blur-[24]">
        <div className="flex items-center">
          <div className="text-sm font-gilroySemiBold leading-[23px]">
            Asset Health Status
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-start justify-center gap-x-5 gap-y-8 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
          {(dashboardData?.deviceConditionData?.length || 0) > 0 ? (
            dashboardData?.deviceConditionData?.map(
              (response, index: number) => {
                if (response._id === "Excellent") {
                  return (
                    <div className="flex gap-2 items-end w-full">
                      <div className="flex flex-col w-[75%] items-start gap-2">
                        <div className="text-sm font-gilroySemiBold leading-[23px]">
                          Excellent Device
                        </div>
                        <div
                          className="flex w-full h-1.5 bg-[#2FEA9B]/20 rounded-full overflow-hidden dark:bg-neutral-700"
                          role="progressbar"
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                            style={{ width: "65%",  background:
                              "linear-gradient(270deg, #2FEA9B 15.5%, #7FDD53 85.5%)", opacity: 1 }}
                          ></div>
                        </div>
                      </div>
                      <div style={{ width: "10%" }} className="flex gap-1">
                        <span className="text-sm font-gilroySemiBold leading-[23px]">
                          546
                        </span>
                        <span
                          className="text-sm font-gilroySemiBold leading-[23px]"
                          style={{ color: "rgba(0, 0, 0, 0.30)" }}
                        >
                          Devices
                        </span>
                      </div>
                    </div>
                  );
                }
                if (response._id === "Good") {
                  return (
                    <div className="flex gap-2 items-end w-full">
                      <div className="flex flex-col w-[75%] items-start gap-2">
                        <div className="text-sm font-gilroySemiBold leading-[23px]">
                          Good Device
                        </div>
                        <div
                          className="flex w-full h-1.5 bg-[#2FEA9B]/20 rounded-full overflow-hidden dark:bg-neutral-700"
                          role="progressbar"
                          aria-valuenow={45}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                            style={{ width: "45%", background:
                              "linear-gradient(270deg, #2FEA9B 15.5%, #7FDD53 85.5%)", }}
                          ></div>
                        </div>
                      </div>
                      <div style={{ width: "10%" }} className="flex gap-1">
                        <span className="text-sm font-gilroySemiBold leading-[23px]">
                          206
                        </span>
                        <span
                          className="text-sm font-gilroySemiBold leading-[23px]"
                          style={{ color: "rgba(0, 0, 0, 0.30)" }}
                        >
                          Devices
                        </span>
                      </div>
                    </div>
                  );
                }
                if (response._id === "Fair") {
                  return (
                    <div className="flex gap-2 items-end w-full">
                      <div className="flex flex-col w-[75%] items-start gap-2">
                        <div className="text-sm font-gilroySemiBold leading-[23px]">
                          Fair Device
                        </div>
                        <div
                          className="flex w-full h-1.5 bg-[#2FEA9B]/20 rounded-full overflow-hidden dark:bg-neutral-700"
                          role="progressbar"
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                            style={{
                              width: "25%",
                              background:
                                "linear-gradient(270deg, #2FEA9B 15.5%, #7FDD53 85.5%)",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div style={{ width: "10%" }} className="flex gap-1">
                        <span className="text-sm font-gilroySemiBold leading-[23px]">
                          106
                        </span>
                        <span
                          className="text-sm font-gilroySemiBold leading-[23px]"
                          style={{ color: "rgba(0, 0, 0, 0.30)" }}
                        >
                          Devices
                        </span>
                      </div>
                    </div>
                  );
                }
              }
            )
          ) : (
            <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
              <div className="flex w-[127px]  flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <ExcellentDeviceIcon />
                </div>
                <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-center  text-[11px]">Excellent Device</div>
              </div>
              <div className="w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <UnassignedDeviceIcon />
                </div>
                <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
                  0
                </div>
                <div className="text-center">Good Device</div>
              </div>
              <div className=" w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[10px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
                <div className="relative z-0 flex items-center  text-center">
                  <FairDeviceIcon />
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
