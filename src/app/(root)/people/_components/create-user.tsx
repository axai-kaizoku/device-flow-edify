"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { UserForm } from "./user-form";
import { useState } from "react";

export default function CreateUser() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="focus:outline-none ring-2 py-2 hover:ring-muted-foreground ring-muted px-2 rounded-md">
        Add User
      </SheetTrigger>
      <SheetContent>
        <UserForm closeBtn={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
