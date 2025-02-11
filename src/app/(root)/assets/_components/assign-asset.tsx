"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useState } from "react";
import AssignAssetsForm from "./assignAssetsForm";
import { Device } from "@/server/deviceActions";

type AssignAssetProps = {
  children: React.ReactNode;
  device: Device;
  onRefresh: () => Promise<void>;
};

export const AssignAsset = ({ children, device, onRefresh }: AssignAssetProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <AssignAssetsForm device={device} closeBtn={setOpen} onRefresh={onRefresh}/>
      </SheetContent>
    </Sheet>
  );
};
