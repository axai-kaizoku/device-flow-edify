"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { UserForm } from "./user-form";
import { useState } from "react";

export default function CreateUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <UserForm closeBtn={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
