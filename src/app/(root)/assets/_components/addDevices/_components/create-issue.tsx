"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { Device } from "@/server/deviceActions";
import React, { useState } from "react";
import { AdminIssueForm } from "./AdminIssueForm";
import RaiseTicketForm from "@/app/(root)/issues/[id]/_components/raise-ticket-form";

function CreateIssue({
  children,
  device,
}: {
  children: React.ReactNode;
  device: Device;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>{children}</SheetTrigger>
          <SheetContent>
            {/* <AdminIssueForm device={device} closeBtn={handleClose} /> */}
            <RaiseTicketForm closeBtn={setIsOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default CreateIssue;
