"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import React, { useState } from "react";
import Form from "../Form";

function CreateDevice({ button }: { button: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="text-[#6C6C6C] text-base font-medium rounded-lg hover:opacity-90 duration-300">
            {button}
          </SheetTrigger>
          <SheetContent>
            <Form closeBtn={handleClose} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default CreateDevice;
