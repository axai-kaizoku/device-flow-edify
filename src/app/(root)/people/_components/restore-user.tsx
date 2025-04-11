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
import Spinner from "@/components/Spinner";
import { updateUser } from "@/server/userActions";
import { useToast } from "@/hooks/useToast";
import WarningIcon from "@/icons/WarningIcon";
import { useQueryClient } from "@tanstack/react-query";

export const RestoreUser = ({
  id,
  children,
  onRefresh,
}: {
  id: string;
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
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
          <Button
            type="button"
            className="rounded-lg text-sm  w-full font-gilroySemiBold border border-black"
            onClick={() => setOpen(false)}
          >
            {"Discard"}
          </Button>
          <Button
            type="submit"
            className="rounded-lg bg-black text-white text-sm  w-full font-gilroySemiBold border border-black"
            onClick={async () => {
              if (id) {
                setLoading(true); // Start loading
                try {
                  await updateUser(id!, { deleted_at: null });
                  setOpen(false);
                  openToast("success", "User restored Successfully! ");
                  queryClient.invalidateQueries({
                    queryKey: ["fetch-people"],
                    exact: false,
                    refetchType: "all",
                  });
                } catch (e: any) {
                  openToast(
                    "error",
                    "Some Error Occured! Please try again later."
                  );
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
