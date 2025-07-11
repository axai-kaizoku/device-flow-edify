import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useInvalidateWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient();
  const invalidateWorkflow = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["workflow-by-id", workflowId],
    });
  }, [queryClient, workflowId]);

  return {
    invalidateWorkflow,
  };
};
