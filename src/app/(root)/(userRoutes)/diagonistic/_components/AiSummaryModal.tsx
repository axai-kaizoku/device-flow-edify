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

export default function AISummaryModal({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="rounded-2xl w-full bg-white p-4 shadow-lg max-w-screen-lg max-h-[70%] overflow-y-auto h-full  text-center flex flex-col ">
          <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
            AI Summary {data?.tag}
          </DialogTitle>
          <div>
        {data?.summary}
        </div>
        </DialogContent>
       
      </Dialog>
    </>
  );
}
