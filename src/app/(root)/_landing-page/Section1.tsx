export const Section1 = (cardsRef: any, boxRef: any) => {
    return(
        <>
        <div className="px-8">
        <div
          className={
            " fade-in-top flex w-full items-center rounded-xl bg-neutral-800 py-[15px] pl-10 pr-2.5 mt-5"
          }
        >
          <div className=" flex flex-grow flex-wrap items-center justify-center gap-x-2.5 gap-y-[9px] min-[1355px]:flex-nowrap">
            <div className="font-gilroy flex h-[18px] w-[1285px] flex-shrink-0 items-center justify-center text-center text-lg font-semibold leading-[18px] tracking-[0px] text-white">
              <p>
                {
                  "Welcome to the club!! Join the BETA program to get all the new updates  "
                }
                <span className="text-center text-[15px] leading-[18px] underline">
                  Click here
                </span>
              </p>
            </div>
            {/* <IconOutlineCancel className="h-5 w-5 flex-shrink-0" /> */}
          </div>
        </div>
      </div>
      <div
        className={
          " font-gilroy flex w-full flex-col items-center gap-y-8 bg-white tracking-[0px] px-8"
        }
      >
        <div className="fade-in-top flex flex-wrap items-center justify-center gap-x-7 gap-y-5 self-stretch bg-white py-6 pl-12 pr-12 min-[1430px]:flex-nowrap">
          <div className="font-inter flex flex-grow flex-wrap items-center justify-between gap-x-10 gap-y-[11px] text-sm leading-normal min-[1430px]:flex-nowrap">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="flex h-full w-full flex-shrink-0 items-center justify-center gap-x-[6.5px] overflow-clip px-3 pb-2.5 pt-[11px]">
                  <img
                    src="/media/landingPage/Deviceflow-logo.png"
                    width={184}
                    height={41}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-10">
              <div>About</div>
              <div>Features</div>
              <div>Pricing</div>
              <div>Blog</div>
            </div>
            <div className="pl-3 font-medium underline">Log in</div>
          </div>
          <div
            className={
              "flex w-[162px] items-center justify-center rounded-xl border border-solid border-gray-600 bg-neutral-800 px-[15px] py-[11px]"
            }
          >
            <div className="font-gilroy text-center font-semibold leading-6 tracking-[-0.2px] text-white">
              <span>
                {"Register for "}
                Beta
              </span>
            </div>
          </div>
        </div>
        <div className="fade-in  flex items-end justify-center self-stretch pt-6">
          <div className="font-inter flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[100px] bg-zinc-100 py-0.5 pl-0.5 pr-2 text-sm leading-5 tracking-[-0.1px] min-[1430px]:flex-nowrap">
            <div className="rounded-[100px] bg-neutral-800 px-2 py-0.5 text-center text-white">
              New
            </div>
            <div className="text-zinc-700">
              How DeviceFlow grow your business ?
            </div>
            {/* <IconOutlineArrowRight className="h-[13px] w-3.5 flex-shrink-0" /> */}
          </div>
        </div>
        <div className="fade-in fltopex w-[826px] items-center justify-center text-center text-[60px] font-bold leading-[88px] tracking-[-3.6px] text-neutral-800">
          <p>Streamline IT Asset Management with DeviceFlow</p>
        </div>
        <div className="fade-in flex w-[548px] items-center justify-center text-center text-[22px] font-medium leading-8 tracking-[-0.3px] text-[darkgray]">
          <p>
            Simplify your office's IT workflows with seamless asset, user, and
            inventory management.
          </p>
        </div>
        <div className="fade-in flex items-center justify-center self-stretch">
          <div className="flex items-center justify-end pl-9">
            <div className="flex items-center justify-center gap-x-3 text-center font-semibold leading-6 tracking-[-0.2px]">
              <div
                className={
                  "flex w-[162px] items-center justify-center rounded-xl border border-solid border-gray-600 bg-neutral-800 px-[15px] py-[11px]"
                }
              >
                <div className="font-gilroy text-center font-semibold leading-6 tracking-[-0.2px] text-white">
                  <span>
                    {"Register for "}
                    Beta
                  </span>
                </div>
              </div>
              <div className="flex items-center w-[148px] justify-center rounded-xl border border-solid border-gray-100 bg-white px-[15px] py-[11px]">
                <div className="text-center text-zinc-700">Request Demo</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            ref={(el: any) => (cardsRef.current[0] = el)}
            className="fade-in-left"
            src={"/media/landingPage/hero-issue.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 425,
              left: 108,
              transform: "rotate(-9.781deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[1] = el)}
            className="fade-in-left"
            src={"/media/landingPage/hero-asset.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 311,
              left: 70,
              transform: "rotate(-9.781deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[2] = el)}
            className="fade-in-right"
            src={"/media/landingPage/hero-order.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 300,
              right: 78,
              transform: "rotate(6.615deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[3] = el)}
            className="fade-in-right"
            src={"/media/landingPage/hero-banner.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 600,
              right: 100,
              transform: "rotate(6.615deg)",
              transition: "transform 1s ease, top 1s ease, left 0.5s ease",
            }}
          />
        </div>
        <div ref={boxRef}>
          <img src={"/media/landingPage/hero.svg"} />
        </div>
      </div></>
    )
}