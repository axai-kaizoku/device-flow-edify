"use client";
import WorkFlowOptions from "@/app/(root)/workflows/[id]/_components/dropdowns/workflow-options";
import { ActionBar } from "@/components/action-bar/action-bar";
import { Button } from "@/components/buttons/Button";
import { Switch } from "@/components/ui/switch";
import {
  ArrowDown01Icon,
  Redo03Icon,
  Undo03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { TestRun } from "../../_components/test-run";
import { SearchToolbar } from "./search-toolbar";
import { WorkflowTreeResponse } from "@/server/workflowActions/workflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteWorkflow,
  updateWorkflow,
} from "@/server/workflowActions/workflow";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function WorkflowHeader({ workflow }: { workflow: WorkflowTreeResponse }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isRenaming, setIsRenaming] = useState(false);
  const [flowName, setFlowName] = useState(workflow?.data?.workflow?.name);

  const enabled = workflow?.data?.workflow?.status === "published";

  const inputRef = useRef<HTMLInputElement>(null);
  // console.log(workflow);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: { name?: string; status?: string }) =>
      updateWorkflow(workflow?.data?.workflow?._id, data),
    onMutate: async (newData) => {
      // Optimistically update the status
      if (newData.status) {
        await queryClient.invalidateQueries({
          queryKey: ["workflow-by-id", workflow?.data?.workflow?._id],
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", workflow?.data?.workflow?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-workflows"],
      });
      toast.success("Workflow updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update workflow");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteWorkflow(workflow?.data?.workflow?._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-by-id"] });
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-workflows"],
      });
      router.replace("/workflows");
      toast.success("Workflow deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete workflow");
    },
  });

  useEffect(() => {
    if (isRenaming) inputRef.current?.focus();
  }, [isRenaming]);

  const handleRename = () => setIsRenaming(true);

  const handleBlur = () => {
    setIsRenaming(false);
    if (flowName !== workflow?.data?.workflow?.name) {
      updateMutation.mutate({ name: flowName });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const handleStatusChange = (checked: boolean) => {
    const status = checked ? "published" : "draft";
    updateMutation.mutate({ status });
  };

  const handlePublish = () => {
    if (!enabled) {
      updateMutation.mutate({ status: "published" });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <ActionBar
      showBackBtn
      outerClassName="rounded-b-none border-t-[#CECECE] border-l-[#CECECE] border-r-[#CECECE]"
    >
      <div className="flex  items-center justify-between  w-full">
        <div className="flex gap-3">
          <Button
            variant="outlineTwo"
            className="flex items-center h-9 gap-2 w-28 hover:border-[#0000001A]"
            disabled={updateMutation.isPending}
          >
            <Switch
              checked={enabled}
              className="cursor-pointer"
              onChange={(e) => handleStatusChange(e.target.checked)}
              isLoading={updateMutation.isPending}
            />
            {enabled ? <>Enabled</> : <>Disabled</>}
          </Button>

          <SearchToolbar
            searchIcon={
              <Button
                variant="outlineTwo"
                className="h-9 w-7 transition-opacity duration-300"
              >
                <Search className="size-5" />
              </Button>
            }
          />
        </div>
        <div className="flex items-center gap-2">
          {isRenaming ? (
            <input
              ref={inputRef}
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-[15px] focus:outline-none font-gilroySemiBold   px-2 py-1 w-[180px]"
            />
          ) : (
            <h1 className="text-[15px] font-gilroySemiBold flex gap-1 justify-center items-center">
              {flowName}
              <WorkFlowOptions onRename={handleRename} onDelete={handleDelete}>
                <span
                  className="cursor-pointer"
                  // onClick={() => setOnboard(!onboard)}
                >
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="text-[#CCCCCC] size-5"
                  />
                </span>
              </WorkFlowOptions>
            </h1>
          )}

          <button
            className={`${
              enabled
                ? "border border-[#0C941C] text-[#0C941C] bg-[#F9FFFA]"
                : "border border-[#E5E5E5]"
            }  rounded-lg text-xs font-gilroyMedium text-center  w-20 px-5 h-7`}
          >
            {enabled ? <>Active</> : <>Draft</>}
          </button>
        </div>
        <div className="flex gap-2.5">
          {" "}
          <Button
            variant="outlineTwo"
            className="h-9 w-7 transition-opacity duration-300"
          >
            <HugeiconsIcon icon={Undo03Icon} className="size-5" />
          </Button>
          <Button
            variant="outlineTwo"
            className="h-9 w-7 transition-opacity duration-300"
          >
            <HugeiconsIcon icon={Redo03Icon} className="size-5" />
          </Button>
          <TestRun workflowId={workflow?.data?.workflow?._id ?? ""} />
          <Button
            variant="primary"
            className="h-9"
            onClick={handlePublish}
            disabled={enabled || updateMutation.isPending}
          >
            Publish
          </Button>
        </div>
      </div>
    </ActionBar>
  );
}

export default WorkflowHeader;
