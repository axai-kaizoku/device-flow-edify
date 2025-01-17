"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

import { Device, updateDevice } from "@/server/deviceActions";
import Form from "../../_components/addDevices/Form";

export default function EditAsset({
  children,
  deviceData,
}: {
  children: React.ReactNode;
  deviceData: Device;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
  const [device, setDevice] = useState<Device>(deviceData);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      await updateDevice(deviceData?._id ?? "", device);
      setOpen(false);
      openToast("success", "Assigned asset to user !");
      setLoading(false);
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to assign to user !");
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <Form
          closeBtn={handleClose}
          isEditForm={true}
          deviceData={deviceData}
        />
      </SheetContent>
    </Sheet>
  );
}
