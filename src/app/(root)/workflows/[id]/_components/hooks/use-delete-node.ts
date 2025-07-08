"use client";

import { deleteNode } from "@/server/workflowActions/workflowById/workflowNodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteNode = () => {
  const queryClient = useQueryClient();

  const deleteNodeMutation = useMutation({
    mutationFn: (nodeId: string) => {
      return deleteNode(nodeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id"],
      });
    },
    onError: (error) => {
      toast.error("Error deleting node");
    },
  });

  return {
    deleteNodeMutation,
  };
};
