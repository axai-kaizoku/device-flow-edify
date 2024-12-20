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
import { Issues, updateIssue } from "@/server/issueActions"; // Import the updateIssue function
import { AlertCircle } from "lucide-react"; // Importing the icon from lucide-react
import { Button } from "@/components/buttons/Button";

export const IssueReOpen = ({
  id,
  issueData, // Add the issue data as a prop
  children,
}: {
  id: string;
  issueData: Issues;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initText, setInitText] = useState("Are you sure?");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center ">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="w-6 h-6" /> {/* Lucide-react icon */}
          </div>
        </div>

        {/* Title */}
        <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
          Are you sure?
        </DialogTitle>

        {/* Description */}
        <DialogDescription className="p-1 text-sm text-gray-600">
          Are you sure you want to change the status of this issue to Open?
        </DialogDescription>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between ">
          <Button
            variant="secondary"
            className="w-1/2 rounded-[0.60rem]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 rounded-[0.60rem] bg-success hover:opacity-80 "
            onClick={async () => {
              if (id) {
                try {
                  // Update the issue status to 'Closed'
                  const updatedIssue = await updateIssue(id, {
                    ...issueData,
                    status: "Open",
                  });
                  setOpen(false);

                  router.refresh(); // Optionally, refresh the page or reroute
                } catch (e: any) {
                  const errorMessage =
                    e.response?.data?.message ||
                    e.message ||
                    "Failed to update the issue status.";
                  setInitText(errorMessage); // Set any error message to display
                }
              }
            }}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
