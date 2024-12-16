import React from "react";
import { report } from "../page";
import { RenderIcon } from "./renderIcons";
import { SheetTrigger } from "@/components/ui/side-sheet";

const ReportCard = ({ report }: { report: report }) => {
  return (
    <>
      <div className="bg-white border border-[rgba(195, 195, 195, 0.31)] rounded-[33px] p-6 flex flex-col justify-between gap-4">
        {/* Title with Icon */}
        <div className="flex items-center gap-3">
          <h3 className="text-[26.931px] font-semibold text-black">
            {report?.title}
          </h3>
        </div>

        <div className="flex justify-start items-center gap-3.5">
          <RenderIcon report={report} />

          <div>
            <div className="text-[#737373] font-semibold text-base">
              {report?.description}
            </div>
            <div className="text-black font-semibold text-[25px]">
              205 Members
            </div>
          </div>
        </div>

        {/* Button as Sheet Trigger */}
        <SheetTrigger className="bg-black text-white rounded-[49px] py-2.5 px-20 font-semibold text-lg">
          Download
        </SheetTrigger>
      </div>
    </>
  );
};

export default ReportCard;
