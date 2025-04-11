"use client";

import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WarningDelete from "@/icons/WarningDelete";
import { deleteIntegrationById } from "@/server/integrationActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const RemoveIntegration = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteIntegrationById,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-by-integrations", "all-data"],
        exact: true,
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["all-integrations"],
        exact: false,
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["get-integration-by-id"],
        exact: false,
        refetchType: "all",
      });
      router.push("/integrations/installed");
    },
  });

  return (
    <>
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
          <DialogDescription className="p-1 -mt-4 text-sm text-gray-600">
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
              onClick={() => mutation.mutate({ id: id })}
              disabled={mutation.isPending}
              onMouseEnter={() => router.prefetch("/integrations/installed")}
            >
              {mutation.isPending ? (
                <>
                  Delete <Loader2 className="animate-spin size-4" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
