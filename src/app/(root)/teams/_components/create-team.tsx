"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { TeamForm } from "./team-form";
import { useState } from "react";

export default function CreateTeam() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>Add team</SheetTrigger>
      <SheetContent>
        <TeamForm closeBtn={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
