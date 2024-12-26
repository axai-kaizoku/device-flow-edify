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
import { TriangleAlert } from "lucide-react"; // Importing the icon from lucide-react
import { Button } from "@/components/buttons/Button";
import { updateDevice } from "@/server/deviceActions";
import Spinner from "@/components/Spinner";
import { Icons } from "@/components/icons";
import { updateUser } from "@/server/userActions";

export const RestoreUser = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for restore action
  const [initText, setInitText] = useState("Restore User");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-50 ring-8 ring-yellow-100 text-yellow-400">
            <Icons.warning_restore />
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="p-1 text-sm text-gray-600">
          Do you want to restore the deleted item?
        </DialogDescription>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between">
          <Button
            className="w-1/2 rounded-md border border-[#D0D5DD] bg-[#FFF] shadow-sm text-[#344054]"
            onClick={() => setOpen(false)}
            disabled={loading} // Disable button while loading
          >
            {loading ? <Spinner /> : "Discard"}
          </Button>
          <Button
            className="w-1/2 rounded-md border border-[#039855] bg-[#039855] shadow-sm text-white"
            onClick={async () => {
              if (id) {
                setLoading(true); // Start loading
                try {
                  await updateUser(id!, { deleted_at: null });
                  setOpen(false);
                  router.refresh();
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
