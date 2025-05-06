"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { TeamForm } from "../../_components/team-form";
import { useState } from "react";

export default function EditTeam({
  children,
  _id,
  title,
  active_manager,
  description,
  image,
  onRefresh,
}: {
  children: React.ReactNode;
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  active_manager?: any;
  onRefresh: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <TeamForm
          manager={active_manager[0]}
          closeBtn={setOpen}
          isEditForm={true}
          id={_id!}
          title={title}
          description={description}
          image={image}
        />
      </SheetContent>
    </Sheet>
  );
}
