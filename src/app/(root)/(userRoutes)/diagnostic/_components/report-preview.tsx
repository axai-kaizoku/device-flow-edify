"use client";
import { Button } from "@/components/buttons/Button";
import html2pdf from "html2pdf.js";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReportFormat } from "./report";
import { ReportData } from "@/server/checkMateActions";
import { useState } from "react";

export default function ReportPreview({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ReportData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="rounded-2xl w-full bg-white p-4 shadow-lg max-w-screen-lg max-h-[70%] overflow-y-auto h-full  text-center flex flex-col ">
          <DialogTitle className="text-lg sr-only font-gilroySemiBold text-gray-900">
            QC Report
          </DialogTitle>

          <ReportFormat data={data} />
          <Button
            className="border w-fit absolute bg-black text-white"
            onClick={() => {
              const element = document.querySelector("#invoice");
              if (element) {
                html2pdf(element, {
                  margin: 0,
                  filename: `${data?.data?.serial_no}_Report.pdf`,
                  image: { type: "png" },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: "in", format: "letter", orientation: "p" },
                });
              }
              setIsOpen(false);
            }}
          >
            Download
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
