import React from "react";

export function Integration({}) {
  return (
    <div
      className={`font-gilroy flex w-full flex-col items-center gap-y-2 bg-white px-8 pt-16 sm:px-12 lg:px-36 text-center tracking-[0px] text-gray-500`}
    >
      <div className="w-full font-gilroySemiBold leading-6 text-xl max-sm:text-sm max-lg:text-lg">
        Integrations
      </div>
      <div className="w-full max-lg:text-3xl font-gilroySemiBold leading-[40px] max-sm:text-2xl text-4xl max-sm:leading-[30px] text-gray-950">
        Upcoming Integrations
      </div>
      <div className="flex items-end justify-center self-stretch px-8 sm:px-16 pt-2 text-lg max-sm:text-base font-gilroyMedium leading-[30px] max-sm:hidden">
        <div>
          <div className="text-center max-sm:text-sm">
            Soon DeviceFlow will work seamlessly with your favorite apps.
          </div>
          <div className="max-sm:text-sm">
            Use over 50+ and apps with just one click.
          </div>
        </div>
      </div>

      <div className="max-sm:block hidden self-stretch px-8 sm:px-16 pt-2 text-lg max-sm:text-base font-gilroyMedium leading-[30px] ">
        Soon DeviceFlow will works seamlessly with your favorite apps.
      </div>

      <div className="flex items-end justify-center self-stretch pr-[0.32px] pt-12 sm:pt-16">
        <div className="flex items-center justify-center gap-x-[8.5px] pt-[1.4px] text-center">
          <img
            src="/media/landingPage/Deviceflow-logo.png"
            width={160}
            height={36}
            style={{
              flexShrink: 0,
            }}
            className="max-lg:w-32"
          />
        </div>
      </div>
      <div className="flex items-center justify-center self-stretch px-6 sm:px-12 py-[1.5px]">
        <div className="relative w-full z-0 flex items-center justify-center pt-2.5 text-center">
          <img
            src="/media/landingPage/device-flow-vector.png"
            width={"100%"}
            height={100}
            style={{
              flexShrink: 0,
            }}
            className="max-lg:w-40"
          />
        </div>
      </div>
      <div className="relative max-lg:w-[100%] max-lg:mx-auto flex items-center justify-center max-lg:gap-x-4 gap-[65px] gap-y-9 self-stretch pt-[3.5px] min-[1430px]:flex-nowrap max-lg:flex-row max-lg:gap-y-6 max-lg:overflow-hidden">
        <img
          src="/media/landingPage/gmail.png"
          style={{width: 70, height: 80}}
          className="max-sm:w-8 max-sm:h-8"
        />
         <img
          src="/media/landingPage/Slack.png"
          style={{width: 50, height: 50, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8"
        />
        <img
          src="/media/landingPage/zoho.png"
          style={{width: 124, height: 85}}
          className="max-sm:w-8 max-sm:h-8"
        />
        <img
          src="/media/landingPage/keka.png"
           style={{width: 75, height: 80}}
          className="max-sm:w-8 max-sm:h-8"
        />
         <img
          src="/media/landingPage/sheet.png"
          style={{width: 53, height: 59, marginTop: 20}}
          className="max-sm:w-8 max-sm:h-8"
        />
         <img
          src="/media/landingPage/asana.png"
          style={{width: 60, height: 53, marginTop: 19}}
          className="max-sm:w-8 max-sm:h-8"
        />
         
         <img
          src="/media/landingPage/razor.png"
          style={{width: 239, height: 68, marginTop: 16}}
          className="max-sm:w-8 max-sm:h-8"
        />
      </div>
    </div>
  );
}
