"use client";

import { Button, buttonVariants } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";
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
  const { openToast } = useToast();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteDevice(id);
        setOpen(false);
        openToast("success", "Asset deleted Successfully!");
        router.push("/assets");
        // router.refresh();
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
            <button
              className={buttonVariants({
                variant: "outlineTwo",
                className: "w-full",
              })}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <Button
              className="w-full rounded-md bg-[#D92D20] text-white"
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
