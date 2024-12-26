"use client";
import React, { useState } from "react";
import { report } from "../page";
import { RenderIcon } from "./renderIcons";
import AllReports from "./allReports";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ReportCard = ({ report, index }: { report: report; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-[rgba(195, 195, 195, 0.31)] rounded-[33px] p-6 flex flex-col justify-between gap-4">
        {/* Title with Icon */}
        <div className="flex justify-start items-center gap-3.5">
          <RenderIcon report={report} />

          <h3 className="text-xl font-gilroySemiBold text-black">
            {report?.title}
          </h3>
        </div>

        <div className="text-[#737373] font-gilroySemiBold text-[15px] mb-1">
          {report?.description}
        </div>

        {/* Button as Sheet Trigger */}
        <button
          className="bg-black text-white rounded-[49px] py-2.5 px-20 font-gilroySemiBold text-lg"
          onClick={() => setIsOpen(true)}
        >
          Download
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
          <AllReports closeBtn={setIsOpen} report={report} index={index} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportCard;
