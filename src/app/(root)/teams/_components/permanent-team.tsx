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
import { updateTeam } from "@/server/teamActions";
import { AlertCircle } from "lucide-react"; // Importing the icon from lucide-react
import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/useToast";
import WarningDelete from "@/icons/WarningDelete";

export const PermanentTeamDelete = ({
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
  const [initText, setInitText] = useState("Are you sure?");
  const { openToast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center ">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
            <WarningDelete />
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="p-1 text-sm text-gray-600">
          Are you sure you want to delete this? This can't be undone.
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
            onClick={async () => {
              if (id) {
                try {
                  updateTeam(id!, { orgId: null });
                  setOpen(false);
                  openToast('success', "Team Deleted Successfully!");
                  // router.refresh();
                  onRefresh();
                } catch (e: any) {
                  const errorMessage =
                    e.response?.data?.message ||
                    e.message ||
                    "Failed to delete the team.";
                  setInitText(errorMessage);
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
