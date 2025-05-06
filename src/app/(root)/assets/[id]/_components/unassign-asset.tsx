"use client";

import { Button, buttonVariants } from "@/components/buttons/Button";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import WarningDelete from "@/icons/WarningDelete";
import { updateDevice } from "@/server/deviceActions";
import { useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();
  const handleDelete = async () => {
    if (id) {
      setLoading(true);
      try {
        // @ts-ignore
        await updateDevice(id, { userId: null });
        setLoading(false);
        toast.success("Unassigned asset from user !");
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["fetch-assets"],
          exact: false,
          refetchType: "all",
        });

        queryClient.invalidateQueries({
          queryKey: ["fetch-single-device"],
          exact: false,
          refetchType: "all",
        });

      } catch (e: any) {
        toast.error("Failed to assign to user !");
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
              className="w-full rounded-md h-9 bg-black text-white"
              onClick={handleDelete}
            >
              {loading ? (
                <>
                  <Spinner className={spinnerVariants({ size: "sm" })} />
                </>
              ) : (
                "Unassign"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
