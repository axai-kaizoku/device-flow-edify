"use client";

import { deleteNode } from "@/server/workflowActions/workflowById/workflowNodes";
import { deleteSplit } from "@/server/workflowActions/workflowById/workflowPaths";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export const useSplitDeletion = (workflowId: string) => {
  const queryClient = useQueryClient();

  const deleteSplitMutation = useMutation({
    mutationFn: async ({
      nodeId,
      nodeData,
    }: {
      nodeId: string;
      nodeData: any;
    }) => {
      const isFakeApp = nodeData?.backendData?.isFakeSplitApp === true;
      const fakeAppId =
        nodeData?.backendData?.fakeAppId || nodeData?.splitData?._id;

      console.log("Delete operation:", {
        nodeId,
        isFakeApp,
        fakeAppId,
        nodeType: nodeData?.type,
      });

      if (isFakeApp && fakeAppId) {
        // This split connector represents a fake Split app - delete the fake app
        console.log("Deleting fake Split app:", fakeAppId);
        await deleteNode(fakeAppId);
      } else {
        // This is a regular split - delete normally
        console.log("Deleting regular split:", nodeId);
        const splitId = nodeId.replace("-split", "").replace("-connector", "");
        await deleteSplit(splitId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", workflowId],
      });
      toast.success("Split path deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete the Split Path");
    },
  });

  const handleSplitDeletion = useCallback(
    (splitNodeId: string, nodeData: any) => {
      console.log("Handling split deletion:", {
        splitNodeId,
        nodeData: {
          type: nodeData?.type,
          isFakeSplitApp: nodeData?.backendData?.isFakeSplitApp,
          fakeAppId: nodeData?.backendData?.fakeAppId,
        },
      });

      deleteSplitMutation.mutate({
        nodeId: splitNodeId,
        nodeData,
      });
    },
    [deleteSplitMutation]
  );

  return {
    handleSplitDeletion,
    isDeleting: deleteSplitMutation.isPending,
  };
};
