"use client";

import { updateAppAction } from "@/server/workflowActions/workflowById/workflowNodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAppActions = (workflowId: string) => {
  const queryClient = useQueryClient();

  const updateAppActionsMutation = useMutation({
    mutationFn: updateAppAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", workflowId],
        exact: false,
      });
      toast.success("Instruction Condition set Successfully");
    },
    onError: () => {
      toast.error("Failed to set App Condition");
    },
  });

  return {
    updateAppActionsMutation,
  };
};
