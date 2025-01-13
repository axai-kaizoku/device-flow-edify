import React from "react";
export function Integration({}) {
  return <div className={`font-gilroy flex w-full flex-col items-center gap-y-3 bg-white px-36 pt-24 text-center tracking-[0px] text-gray-500 `}>
        <div className="w-[692px] font-bold leading-6">Integrations</div>
        <div className="w-[692px] text-4xl font-bold leading-[44px] tracking-[-0.32px] text-gray-950">
          Upcoming Integrations
        </div>
        <div className="flex items-end justify-center self-stretch px-56 pt-2 text-xl font-gilroyMedium leading-[30px]">
          <div>
          <p className="text-center">
            Soon DeviceFlow will works seamlessly with your favorite apps.
          </p>
          <p>Use over 500 tools and apps by just one click.</p>
          </div>
        </div>
        <div className="flex items-end justify-center self-stretch pr-[0.32px] pt-16">
          <div className="flex items-center justify-center gap-x-[8.5px] pt-[1.4px] text-center">
            <img src="/media/landingPage/Deviceflow-logo.png" width={242} height={54} style={{
          flexShrink: 0
        }} />
          </div>
        </div>
        <div className="flex items-center justify-center self-stretch px-12 py-[1.5px]">
          <div className="relative w-[full] z-0 flex  items-center justify-center pt-2.5 text-center">
            <img src="/media/landingPage/device-flow-vector.png" width={"100%"} height={100} style={{
          flexShrink: 0
        }} />
          </div>
        </div>
        <div className="relative flex flex-wrap items-center justify-center gap-x-9 gap-y-9 self-stretch pt-[3.5px] min-[1430px]:flex-nowrap">
          <div className="absolute w-[392px] h-[81px]" style={{
        background: "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 124.74%)",
        left: 0
      }} />
          <img src="/media/landingPage/Zendesk.png" width={80} height={81} />
          <img src="/media/landingPage/Zapier.png" width={80} height={81} />
          <img src="/media/landingPage/Stripe.png" width={80} height={81} />
          <img src="/media/landingPage/Notion.png" width={80} height={81} />
          <img src="/media/landingPage/Intercom.png" width={80} height={81} />
          <img src="/media/landingPage/Slack.png" width={80} height={81} />
          <img src="/media/landingPage/Mailchimp.png" width={80} height={81} />
          <img src="/media/landingPage/Google_drive.png" width={80} height={81} />
          <img src="/media/landingPage/Figma.png" width={80} height={81} />
          <img src="/media/landingPage/Dropbox.png" width={80} height={81} />
          <div className="absolute w-[392px] h-[81px]" style={{
        background: "linear-gradient(269deg, #FFF 0%, rgba(255, 255, 255, 0.00) 124.74%)",
        right: 0
      }} />
        </div>
      </div>;
}
  