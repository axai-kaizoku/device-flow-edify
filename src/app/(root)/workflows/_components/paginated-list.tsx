"use client";
import { Button } from "@/components/buttons/Button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import { WorkflowIcon } from "../icons";

interface PaginatedListProps {
  data: any[];
}

export default function PaginatedList({ data }: PaginatedListProps) {
  return (
    <div className=" py-2 w-full min-h-[70vh] max-h-[70vh] h-full ">
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

interface TeamCardProps {
  _id?: string;
  name?: string;
}

export const WorkflowMainCard = ({ name, _id }: TeamCardProps) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      className="border border-[#B4B4B4] hover:border-black bg-[#FCFCFC] backdrop-blur-[14.1px]
 relative rounded-lg w-[calc(33%-16px)]  2xl:w-[calc(25%-16px)]  p-4 flex flex-col transition-all "
    >
      <Link
        href={`/workflows/${_id}`}
        className="flex flex-col gap-5 cursor-pointer"
      >
        <div className="flex   gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <WorkflowIcon />
            <h2 className="text-lg font-gilroySemiBold">Onboarding Flow</h2>
          </div>
          <span className="text-[#2E8016] text-xs py-1 font-gilroySemiBold bg-[#E2FBE6] rounded-full px-4">
            Active
          </span>
        </div>
        <h3 className="font-gilroyMedium text-sm">
          <span className="text-[#7F7F7F]">By</span> Lalitya Sahu
        </h3>
        <div className="h-[1px] bg-[#F3F3F3]"></div>
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-gilroyMedium">
            <span className="text-[#7F7F7F]">Modified On </span> 14 June’25
          </h4>
          <Button
            variant="outlineTwo"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center h-fit m-0 p-0 pr-2 gap-1 w-10 border-none bg-transparent"
          >
            <Switch
              checked={enabled}
              className="cursor-pointer"
              onChange={() => setEnabled((prev) => !prev)}
            />
            {enabled ? <>On</> : <>Off</>}
          </Button>
        </div>
      </Link>
    </div>
  );
};
