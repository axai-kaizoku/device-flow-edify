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
import { updateUser } from "@/server/userActions";
import { useToast } from "@/hooks/useToast";
import WarningDelete from "@/icons/WarningDelete";

export const PermanentUserDelete = ({
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
  const { openToast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center ">
          <div>
            <WarningDelete />
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="-mt-4 mb-3 font-gilroyMedium text-sm text-gray-600">
          Are you sure you want to delete this? This can't be undone.
        </DialogDescription>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between ">
          <Button
            className="w-1/2 rounded-md border text-base border-[#D0D5DD] bg-[#FFF] shadow-sm text-[#344054]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 rounded-md bg-[#D92D20] text-base text-white"
            onClick={async () => {
              if (id) {
                try {
                  await updateUser(id!, { orgId: null });
                  openToast("success", "User Deleted Successfully!");
                  setOpen(false);
                  // onRefresh();
                  // router.push("/people?tab=inactive_people");

                  router.refresh();
                } catch (e: any) {
                  openToast(
                    "error",
                    "Some Error Occured! Please try again later"
                  );
                }
              }
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
