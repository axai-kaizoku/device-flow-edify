"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { TeamForm } from "./team-form";
import { useState } from "react";

export default function CreateTeam({
  children,
  onRefresh
}: {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  return (
    // <Sheet open={open} onOpenChange={setOpen}>
    //   <SheetTrigger>{children}</SheetTrigger>
    //   <SheetContent>
    //     <TeamForm closeBtn={setOpen} />
    //   </SheetContent>
    // </Sheet>

    <div className="flex justify-center items-center gap-8">
      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>{children}</SheetTrigger>
          <SheetContent>
            <TeamForm closeBtn={setOpen} onRefresh={onRefresh}/>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
