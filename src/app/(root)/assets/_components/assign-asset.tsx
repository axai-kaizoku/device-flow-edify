"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { Device } from "@/server/deviceActions";
import { useState } from "react";
import AssignAssetsForm from "./assignAssetsForm";

type AssignAssetProps = {
  children: React.ReactNode;
  device: Device;
};

export const AssignAsset = ({ children, device }: AssignAssetProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <AssignAssetsForm device={device} closeBtn={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
