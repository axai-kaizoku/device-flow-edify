import { updateWorkflow } from "@/server/workflowActions/workflow";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useChangeStatusToDraft = (workflow: {
  data?: { workflow?: { _id?: string; status?: string } } | any;
}) => {
  const updateStatusMutation = useMutation({
    mutationFn: (data: { status: string }) =>
      updateWorkflow(workflow?.data?.workflow?._id, data),
    onError: (error) => {
      console.error("Failed to update workflow status:", error);
    },
  });

  const changeStatusToDraft = useCallback(() => {
    const currentStatus = workflow?.data?.workflow?.status;
    if (currentStatus === "published") {
      updateStatusMutation.mutate({ status: "draft" });
    }
  }, [workflow?.data?.workflow?.status, updateStatusMutation]);

  return {
    changeStatusToDraft,
  };
};
