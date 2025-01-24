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
import { deleteDevice } from "@/server/deviceActions";
import { Icons } from "@/components/icons";
import { useAlert } from "@/hooks/useAlert";

export const SoftDeleteAsset = ({
  id,
  children,
  onRefresh,
}: {
  id: string;
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteDevice(id);
        setOpen(false);
        // router.push("/assets?tab=un_assigned_assets");
        // router.refresh();
        onRefresh();
      } catch (e: any) {
        showAlert({
          title: "Failed to delete the asset.",
          description:
            "This asset is assigned to a user. Please unassign the asset before deleting.",
          isFailure: true,
          key: "delete-asset",
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
          {/* Warning Icon */}
          <div className="flex justify-center  mb-1">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <Icons.warning_delete />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
            Are you sure?
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="p-1 text-sm text-gray-600">
            Are you sure you want to delete this?
          </DialogDescription>

          {/* Footer Buttons */}
          <DialogFooter className="flex w-full items-center justify-between ">
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
