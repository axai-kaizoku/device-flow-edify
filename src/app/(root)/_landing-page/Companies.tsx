import React from "react";

export function Companies({}) {
  return (
    <div
      className={`font-gilroy flex w-full flex-col items-center gap-y-2 bg-white px-8 pb-16 sm:px-12 lg:px-36 text-center tracking-[0px] text-gray-500`}
    >
      <div className="relative marquee marquee--8 max-lg:w-[100%] max-lg:mx-auto flex items-center justify-center max-lg:gap-x-4 gap-[65px] gap-y-9 self-stretch pt-[3.5px] min-[1430px]:flex-nowrap max-lg:flex-row max-lg:gap-y-6 max-lg:overflow-hidden">
         <img
          src="/media/company/electricpe.png"
           style={{width: 140, height: 38, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
         <img
          src="/media/company/finaag.png"
           style={{width: 60, height: 38, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />

         <img
          src="/media/company/joyspoon.webp"
           style={{width: 140, height: 38, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
        <img
          src="/media/company/elchemy.jpg"
           style={{width: 140, height: 68, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
         <img
          src="/media/company/metafin.png"
          style={{width: 140, height: 38, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
         <img
          src="/media/company/mygate.png"
           style={{width: 144, height: 53, marginTop: 9}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
         <img
          src="/media/company/urban.png"
           style={{width: 93, height: 93}}
          className="max-sm:w-8 max-sm:h-8 marquee__item"
        />
      </div>
    </div>
  );
}
