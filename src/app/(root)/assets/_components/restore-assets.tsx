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
import { Button } from "@/components/buttons/Button";
import { updateDevice } from "@/server/deviceActions";
import Spinner from "@/components/Spinner";
import { Icons } from "@/components/icons";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <Icons.warning_restore />
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
          <Button
            className="w-1/2 rounded-md border border-[#D0D5DD] bg-[#FFF] shadow-base text-[#344054]"
            onClick={() => setOpen(false)}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Discard"}
          </Button>
          <Button
            className="w-1/2 rounded-md border border-[#039855] bg-[#039855] shadow-base text-white"
            onClick={async () => {
              if (id) {
                setLoading(true); // Start loading
                try {
                  await updateDevice(id!, { deleted_at: null });
                  setOpen(false);
                  // router.refresh();
                  onRefresh();
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
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
