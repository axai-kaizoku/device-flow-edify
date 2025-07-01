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
import { Workflow } from "./types/types";

function WorkflowHeader({ workflow }: { workflow: Workflow }) {
  const [enabled, setEnabled] = useState(false);
  const [onboard, setOnboard] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [flowName, setFlowName] = useState("Onboarding Flow");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenaming) inputRef.current?.focus();
  }, [isRenaming]);

  const handleRename = () => setIsRenaming(true);

  const handleBlur = () => {
    setIsRenaming(false);
    // 🔄 Save logic can go here (e.g. call API)
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
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
            onClick={() => setEnabled((prev) => !prev)}
            className="flex items-center h-9 gap-2 w-28 hover:border-[#0000001A]"
          >
            <Switch
              checked={enabled}
              className="cursor-pointer"
              onChange={() => setEnabled((prev) => !prev)}
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
              <WorkFlowOptions onRename={handleRename}>
                <span
                  className="cursor-pointer"
                  onClick={() => setOnboard(!onboard)}
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
          <TestRun workflowId={workflow._id} />
          <Button variant="primary" className="h-9">
            Publish
          </Button>
        </div>
      </div>
    </ActionBar>
  );
}

export default WorkflowHeader;
