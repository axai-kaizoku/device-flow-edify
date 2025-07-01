"use client";
import { Button } from "@/components/buttons/Button";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import { updateWorkFlowById } from "../[id]/_components/api";

export const useSaveWorkflowMutation = () => {
  return useMutation({
    mutationFn: ({ id, definition }: { id: string; definition: string }) =>
      updateWorkFlowById({ id, definition })

  });
};

export const TestRun = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  const saveMutation = useSaveWorkflowMutation();
  return (
    <Button
      variant="outlineTwo"
      disabled={saveMutation.isPending}
      className="flex items-center gap-2 h-9"
      onClick={() => {
        const workflowDefination = JSON.stringify(toObject());
        saveMutation.mutate({ id: workflowId, definition: workflowDefination }, {
          onSuccess: () => {
            toast.success("Flow saved successfully !");
          },
          onError: () => {
            toast.error("Failed to saved flow !");
          }
        });
      }}
    >
      <HugeiconsIcon icon={PlayCircleIcon} size={16} />
      Test Run
    </Button>
  );
};
