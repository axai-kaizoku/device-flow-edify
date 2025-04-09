"use client";

import DeviceFlowLogo from "@/icons/DeviceFlowLogo";

export default function Page() {
  return (
    <section className="min-h-screen h-fit max-w-2xl w-full border rounded-3xl bg-white flex flex-col items-center justify-start gap-8 p-6">
      <img
        src="/media/Deviceflow.png"
        alt="Device flow logo"
        className="w-40 h-12 object-contain"
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-[#7F7F7F] font-gilroyMedium text-sm">
          Device Score
        </span>
        <span className="font-gilroyBold text-4xl text-[#0D9B00]">9.5</span>
        <span className="text-[12px] font-gilroyMedium">
          👌 Your device is running perfectly
        </span>
      </div>
      <h1 className="font-gilroySemiBold text-lg">MacBook Air 2022 A2681</h1>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col justify-center items-center">
          <span className="font-gilroyMedium text-sm">Diagnosed By</span>
          <span className="text-[#7F7F7F] font-gilroyMedium">Lalitya</span>
        </div>

        <div className="h-[1.3rem] w-[1px] bg-[#D0D0D0]" />

        <div className="flex flex-col justify-center items-center">
          <span className="font-gilroyMedium text-sm">Serial Number</span>
          <span className="text-[#7F7F7F] font-gilroyMedium">SD435DFGE</span>
        </div>

        <div className="h-[1.3rem] w-[1px] bg-[#D0D0D0]" />

        <div className="flex flex-col justify-center items-center">
          <span className="font-gilroyMedium text-sm">Warranty Status</span>
          <span className="text-[#0D9B00] font-gilroyMedium">InWarranty</span>
        </div>

        <div className="h-[1.3rem] w-[1px] bg-[#D0D0D0]" />

        <div className="flex flex-col justify-center items-center">
          <span className="font-gilroyMedium text-sm">Diagnosed On</span>
          <span className="text-[#7F7F7F] font-gilroyMedium">
            April 1, 2025
          </span>
        </div>
      </div>

      <h2 className="font-gilroySemiBold text-sm">Physical Checks</h2>
      <div className="flex flex-col gap-2.5 w-full">
        {[1, 23, 2, 45, 5, 65].map((_, i) => (
          <div
            key={i}
            className="w-full flex justify-between items-center font-gilroyMedium text-sm"
          >
            <span>Keyboard</span>
            <span>234 Kb</span>
          </div>
        ))}
      </div>

      <h2 className="font-gilroySemiBold text-sm">Internal Checks</h2>
      <div className="flex flex-col gap-2.5 w-full">
        {[1, 23, 2, 45, 5, 65].map((_, i) => (
          <div
            key={i}
            className="w-full flex justify-between items-center font-gilroyMedium text-sm"
          >
            <span>Keyboard</span>
            <span>234 Kb</span>
          </div>
        ))}
      </div>
    </section>
  );
}
