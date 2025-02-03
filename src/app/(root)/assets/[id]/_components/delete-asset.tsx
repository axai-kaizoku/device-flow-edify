"use client";

import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAlert } from "@/hooks/useAlert";
import WarningDelete from "@/icons/WarningDelete";
import { deleteDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteAsset = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteDevice(id);
        setOpen(false);
        router.refresh();
      } catch (e: any) {
        showAlert({
          title: "Failed to delete asset.",
          description: "Device is assigned to a user. Can't delete asset",
          isFailure: true,
          key: "delete-asset-1",
        });
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>

        <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
          <div className="flex justify-center">
            <WarningDelete />
          </div>

          <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
            Are you sure?
          </DialogTitle>

          <DialogDescription className="p-1 text-sm text-gray-600">
            Are you sure you want to delete this device?
          </DialogDescription>

          <DialogFooter className="flex w-full items-center justify-between">
            <Button
              className="w-1/2 rounded-md border border-[#D0D5DD] bg-[#FFF] shadow-sm text-[#344054]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 rounded-md bg-[#D92D20] text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
