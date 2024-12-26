"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { UserForm } from "./user-form";
import { useState } from "react";

export default function CreateUser({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="bg-black rounded-full text-white text-lg font-gilroySemiBold px-10 py-2">
        {name}
      </SheetTrigger>
      <SheetContent>
        <UserForm closeBtn={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
