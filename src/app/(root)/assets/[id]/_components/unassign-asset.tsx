"use client";

import { Button } from "@/components/buttons/Button";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import WarningDelete from "@/icons/WarningDelete";
import { updateDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UnassignAsset = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();

  const handleDelete = async () => {
    if (id) {
      setLoading(true);
      try {
        // @ts-ignore
        await updateDevice(id, { userId: null });
        setLoading(false);
        openToast("success", "Unassigned asset from user !");
        setOpen(false);
        router.refresh();
      } catch (e: any) {
        openToast("error", "Failed to assign to user !");
        setOpen(false);
      } finally {
        setLoading(false);
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
            Are you sure you want to unassign this device?
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
              {loading ? (
                <>
                  <Spinner className={spinnerVariants({ size: "sm" })} />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
