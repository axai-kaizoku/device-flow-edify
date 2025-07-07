"use client";
import { Button } from "@/components/buttons/Button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import { WorkflowIcon } from "../icons";
import { updateWorkflow, Workflow } from "@/server/workflowActions/workflow";
import { formatDate } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface PaginatedListProps {
  data: any[];
}

export default function PaginatedList({ data }: { data: Workflow[] }) {
  return (
    <div className="py-2 w-full min-h-[70vh] max-h-[70vh] h-full">
      <div className="flex gap-4 flex-wrap w-full ">
        {data?.map(
          (workflow) =>
            workflow && (
              <WorkflowMainCard key={workflow?._id ?? ""} {...workflow} />
            )
        )}
      </div>
    </div>
  );
}

export const WorkflowMainCard = ({
  name,
  _id,
  creatorName,
  updatedAt,
  status,
}: Workflow) => {
  const [enabled, setEnabled] = useState(status !== "published");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updates: Partial<Workflow>) => updateWorkflow(_id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-all-workflows"] });
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", _id],
      });
      toast.success("Workflow updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update workflow!");
    },
  });

  const handleToggleStatus = () => {
    const newStatus = enabled ? "published" : "draft";
    mutation.mutate({ status: newStatus });
    setEnabled((prev) => !prev);
  };

  return (
    <div
      className="border border-[#B4B4B4] hover:border-black bg-[#FCFCFC] backdrop-blur-[14.1px]
      relative rounded-lg w-[calc(33%-16px)] 2xl:w-[calc(25%-16px)] p-4 flex flex-col transition-all"
    >
      <Link
        href={`/workflows/${_id}`}
        className="flex flex-col gap-5 cursor-pointer"
      >
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <WorkflowIcon />
            <h2 className="text-lg font-gilroySemiBold">{name}</h2>
          </div>
          {!enabled ? (
            <span className="text-[#2E8016] w-14 text-center text-xs py-1 font-gilroySemiBold bg-[#E2FBE6] rounded-full ">
              Active
            </span>
          ) : (
            <span className=" text-xs py-1 w-14 text-center font-gilroySemiBold bg-[#F4F4F4] rounded-full">
              Draft
            </span>
          )}
        </div>
        <h3 className="font-gilroyMedium text-sm">
          <span className="text-[#7F7F7F]">By</span> {creatorName}
        </h3>
        <div className="h-[1px] bg-[#F3F3F3]"></div>
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-gilroyMedium">
            <span className="text-[#7F7F7F]">Modified On </span>
            {formatDate(new Date(updatedAt))}
          </h4>
          <Button
            variant="outlineTwo"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center h-fit m-0 p-0 pr-2 gap-1 w-10 border-none bg-transparent"
          >
            <Switch
              checked={!enabled}
              className="cursor-pointer"
              onChange={handleToggleStatus}
            />
            {!enabled ? <>On</> : <>Off</>}
          </Button>
        </div>
      </Link>
    </div>
  );
};
