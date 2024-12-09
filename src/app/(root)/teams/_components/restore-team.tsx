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
import { TriangleAlert } from "lucide-react"; // Importing the icon from lucide-react
import { Button } from "@/components/buttons/Button";

export const RestoreTeam = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initText, setInitText] = useState("Restore Team");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center ">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-50 ring-8 ring-yellow-100 text-yellow-400">
            <TriangleAlert className="w-6 h-6" /> {/* Lucide-react icon */}
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-semibold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="p-1 text-sm text-gray-600">
          Do you want to restore the deleted item?
        </DialogDescription>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between ">
          <Button
            variant="secondary"
            className="w-1/2 rounded-[0.60rem] "
            onClick={() => setOpen(false)}
          >
            Discard
          </Button>
          <Button
            className="w-1/2 rounded-[0.60rem] bg-green-500"
            onClick={async () => {
              if (id) {
                try {
                  await updateTeam(id!, { deleted_at: null });
                  setOpen(false);
                  router.push("/teams");
                  router.refresh();
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
            Restore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
