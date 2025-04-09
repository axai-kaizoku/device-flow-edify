"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useState } from "react";
import { UserForm } from "../../_components/user-form";
import { CreateUserArgs } from "@/server/userActions";

export default function EditUser({
  children,
  userData,
  onRefresh,
}: {
  children: React.ReactNode;
  userData?: CreateUserArgs;
  onRefresh?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <UserForm
          closeBtn={setOpen}
          isEditForm={true}
          userData={userData}
          onRefresh={onRefresh}
        />
      </SheetContent>
    </Sheet>
  );
}
