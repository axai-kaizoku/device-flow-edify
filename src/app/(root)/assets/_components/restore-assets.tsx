"use client";

import { Button, LoadingButton } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WarningIcon from "@/icons/WarningIcon";
import { updateDevice } from "@/server/deviceActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const RestoreDevice = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => updateDevice(id, { deleted_at: null }),
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["fetch-assets"],
        exact: false,
        refetchType: "all",
      });
    },
    onError: () => {
      toast.error("Failed to restore asset");
    },
  });

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
            variant="outlineTwo"
            className="w-full"
            onClick={() => setOpen(false)}
            disabled={deleteMutation?.isPending}
          >
            Discard
          </Button>
          <LoadingButton
            variant="primary"
            className="w-full"
            loading={deleteMutation?.isPending}
            onClick={() => deleteMutation.mutate(id)}
            disabled={deleteMutation?.isPending}
          >
            Restore
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
