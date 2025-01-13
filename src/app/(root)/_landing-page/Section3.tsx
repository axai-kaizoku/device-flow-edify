import { useState } from "react";

export const Section3 = () => {
  const [cardHeight1, setCardHeight1] = useState(334);
  const [cardHeight4, setCardHeight4] = useState(334);
  const [cardHeight2, setCardHeight2] = useState(334);
  const [cardHeight5, setCardHeight5] = useState(334);
  const [cardHeight3, setCardHeight3] = useState(334);
  const [cardHeight6, setCardHeight6] = useState(334);

  return (
    <div className={`flex w-full flex-col gap-y-16 bg-zinc-800 px-32 py-20 `}>
      <div className="flex items-center px-0.5">
        <div className="font-gilroy text-[52px] font-bold leading-[58px] tracking-[-1.2px]">
          <span>
            <span className="text-gray-400">{"Why Choose "}</span>
            <span className="text-white">DeviceFlow?</span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 min-[1430px]:flex-nowrap">
        <div className="flex flex-col items-start gap-y-8">
          <div
            onMouseEnter={() => {
              setCardHeight1(526);
            }}
            onMouseLeave={() => {
              setCardHeight1(334);
            }}
            style={{ transition: "height 0.5s ease-in-out", height:  cardHeight1 >334 ? cardHeight1 : cardHeight4 <= 334 ? cardHeight4 : 147,   overflow: "hidden" }}
            className={`flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]`}
          >
            <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
          <div
            style={{
              transition: "height 0.5s ease-in-out",
              height: cardHeight4 >334 ? cardHeight4 : cardHeight1 <= 334 ? cardHeight1 : 147,
              overflow: "hidden"
            }}
            onMouseEnter={() => {
                setCardHeight4(526);
              }}
              onMouseLeave={() => {
                setCardHeight4(334);
              }}
            className="flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]"
          >
               <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-8">
          <div
            onMouseEnter={() => {
              setCardHeight2(526);
            }}
            onMouseLeave={() => {
              setCardHeight2(334);
            }}
            style={{ transition: "height 0.5s ease-in-out", height:  cardHeight2 >334 ? cardHeight2 : cardHeight5 <= 334 ? cardHeight5 : 147,  overflow: "hidden"  }}
            className={`flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]`}
          >
               <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
          <div
            style={{
              transition: "height 0.5s ease-in-out",
              height: cardHeight5 >334 ? cardHeight5 : cardHeight2 <= 334 ? cardHeight2 : 147,
              overflow: "hidden"
            }}
            onMouseEnter={() => {
                setCardHeight5(526);
              }}
              onMouseLeave={() => {
                setCardHeight5(334);
              }}
            className="flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]"
          >
               <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-8">
          <div
            onMouseEnter={() => {
              setCardHeight3(526);
            }}
            onMouseLeave={() => {
              setCardHeight3(334);
            }}
            style={{ transition: "height 0.5s ease-in-out", height:  cardHeight3 >334 ? cardHeight3 : cardHeight6 <= 334 ? cardHeight6 : 147,   overflow: "hidden" }}
            className={`flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]`}
          >
               <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
          <div
            style={{
              transition: "height 0.5s ease-in-out",
              height: cardHeight6 >334 ? cardHeight6 : cardHeight3 <= 334 ? cardHeight3 : 147,
              overflow: "hidden"
            }}
            onMouseEnter={() => {
                setCardHeight6(526);
              }}
              onMouseLeave={() => {
                setCardHeight6(334);
              }}
            className="flex flex-col items-center justify-center rounded-3xl border border-solid border-zinc-700 bg-zinc-800 p-[3px]"
          >
              <div
              className={
                "flex w-96 flex-col items-start justify-end gap-y-1.5 rounded-3xl border border-solid border-zinc-600 p-10"
              }
              style={{ height: "100%" }}
            >
              <div className="flex flex-col items-center pl-[0.06px]">
                <img src='/media/landingPage/device-flow-1.png'   />
              </div>
              <div className="self-stretch  [max-width:291px]">
                <div className="font-gilroy text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-gray-100">
                  Save time with automation.
                </div>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div style={{
                height: '100%', transition: "height 0.5s ease-in-out",
                overflow: "hidden"
              }}>
             
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              <div className="font-inter flex items-start self-stretch leading-6 tracking-[-0.2px] text-gray-400">
                <p>
                  Update your contacts with the latest information on autopilot.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
