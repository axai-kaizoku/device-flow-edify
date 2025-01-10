"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import React, { useState } from "react";
import { AdminIssueForm } from "./AdminIssueForm";
import { Device } from "@/server/deviceActions";

function CreateIssue({ children, device }: { children: React.ReactNode; device: Device;}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>{children}</SheetTrigger>
          <SheetContent>
            <AdminIssueForm device={device} closeBtn={handleClose} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default CreateIssue;
