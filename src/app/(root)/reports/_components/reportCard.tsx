"use client";
import React, { useState } from "react";
import { report } from "../page";
import { RenderIcon } from "./renderIcons";
import { SheetTrigger } from "@/components/ui/side-sheet";
import AllReports from "./allReports";
import Modal from "./Modal";

const ReportCard = ({ report, index }: { report: report; index: number }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <>
      <div className="bg-white border border-[rgba(195, 195, 195, 0.31)] rounded-[33px] p-6 flex flex-col justify-between gap-4">
        {/* Title with Icon */}
        <div className="flex justify-start items-center gap-3.5">
          <RenderIcon report={report} />

          <h3 className="text-xl font-semibold text-black">
            {report?.title}
          </h3>
        </div>

        <div className="text-[#737373] font-semibold text-[15px] mb-1">
          {report?.description}
        </div>

        {/* Button as Sheet Trigger */}
        <button
          className="bg-black text-white rounded-[49px] py-2.5 px-20 font-semibold text-lg"
          onClick={handleOpenModal}
        >
          Download
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AllReports report={report} index={index} />
      </Modal>
    </>
  );
};

export default ReportCard;
