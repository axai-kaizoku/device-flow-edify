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
import WarningDelete from "@/icons/WarningDelete";
import { updateDevice } from "@/server/deviceActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const UnassignAsset = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateDevice(id, { userId: null }),
    onSuccess: () => {
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

      queryClient.invalidateQueries({
        queryKey: ["fetch-user-by-id"],
        exact: false,
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: ["user-timeline"],
        refetchType: "all",
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["device-timeline", id],
        refetchType: "all",
        exact: false,
      });
    },
    onError: () => {
      toast.error("Failed to unassign");
    },
  });

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
          <DialogDescription className="p-1 -mt-4 text-sm text-gray-600">
            Are you sure you want to unassign this device?
          </DialogDescription>
          <DialogFooter className="flex w-full items-center justify-between">
            <Button
              variant="outlineTwo"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              className="w-full rounded-md h-9 bg-black text-white"
              onClick={() => mutation.mutate()}
              loading={mutation?.isPending}
            >
              Unassign
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
