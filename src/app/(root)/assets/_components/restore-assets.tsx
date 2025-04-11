"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/buttons/Button";
import { updateDevice } from "@/server/deviceActions";
import Spinner from "@/components/Spinner";
import WarningIcon from "@/icons/WarningIcon";
import { useQueryClient } from "@tanstack/react-query";

export const RestoreDevice = ({
  id,
  children,
  onRefresh,
}: {
  id: string;
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for restore action
  const [initText, setInitText] = useState("Restore Device");
  const queryClient = useQueryClient();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <WarningIcon />
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="-mt-4 mb-3 font-gilroyMedium text-sm text-gray-600">
          Do you want to restore the deleted item?
        </DialogDescription>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between">
          <button
            className={buttonVariants({
              variant: "outlineTwo",
              className: "w-full",
            })}
            onClick={() => setOpen(false)}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Discard"}
          </button>
          <button
            className={buttonVariants({
              variant: "primary",
              className: "w-full",
            })}
            onClick={async () => {
              if (id) {
                setLoading(true); // Start loading
                try {
                  await updateDevice(id!, { deleted_at: null });
                  setOpen(false);
                  queryClient.invalidateQueries({
                    queryKey: ["fetch-assets"],
                    exact: false,
                    refetchType: "all",
                  });
                } catch (e: any) {
                  const errorMessage =
                    e.response?.data?.message ||
                    e.message ||
                    "Failed to restore the device.";
                  setInitText(errorMessage);
                } finally {
                  setLoading(false); // End loading
                }
              }
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Restore"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
