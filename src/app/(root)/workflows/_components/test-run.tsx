"use client";
import { Button } from "@/components/buttons/Button";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";
import { updateWorkFlowById } from "../[id]/_components/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircle } from "lucide-react";

export const useSaveWorkflowMutation = () => {
  return useMutation({
    mutationFn: ({ id, definition }: { id: string; definition: string }) =>
      updateWorkFlowById({ id, definition }),
  });
};

export const TestRun = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  const saveMutation = useSaveWorkflowMutation();
  return (
    <TestRunDialog
      disabled={saveMutation.isPending}
      handlePublish={() => {
        const workflowDefination = JSON.stringify(toObject());
        saveMutation.mutate(
          { id: workflowId, definition: workflowDefination },
          {
            onSuccess: () => {
              toast.success("Flow saved successfully !");
            },
            onError: () => {
              toast.error("Failed to saved flow !");
            },
          }
        );
      }}
    >
      <Button variant="outlineTwo" className="flex items-center gap-2 h-9">
        <HugeiconsIcon icon={PlayCircleIcon} size={16} />
        Test Run
      </Button>
    </TestRunDialog>
  );
};

const workflowData = [
  {
    name: "Google workspace",
    isRunning: true,
  },
  {
    name: "Google workspace",
    isRunning: true,
  },
  {
    name: "Google workspace",
    isRunning: false,
  },
  {
    name: "Google workspace",
    isRunning: true,
  },
  {
    name: "Google workspace",
    isRunning: true,
  },
  {
    name: "Google workspace",
    isRunning: true,
  },
];

export const TestRunDialog = ({
  children,
  handlePublish,
  disabled,
}: {
  children: React.ReactNode;
  handlePublish: () => void;
  disabled: boolean;
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md min-h-0 h-full font-gilroyMedium max-h-80 rounded-lg">
        <DialogTitle className="font-normal font-gilroyMedium">
          Test Workflow
        </DialogTitle>
        <Stepper
          value={currentStep}
          onValueChange={setCurrentStep}
          orientation="vertical"
          className="space-y-1"
        >
          {workflowData.map((step, i) => (
            <div className="flex gap-1" key={i}>
              <StepperItem
                key={i}
                step={i}
                className="[&:not(:last-child)]:flex-1 h-fit w-fit flex gap-1"
              >
                <StepperTrigger asChild>
                  <StepperIndicator asChild>
                    <span className="transition-all group-data-[loading=true]/step:scale-50 group-data-[state=completed]/step:scale-50 group-data-[loading=true]/step:opacity-0 group-data-[state=completed]/step:opacity-0">
                      {/* {step.name} */}
                    </span>
                    <Check
                      className="absolute scale-50 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="absolute scale-50 opacity-0 transition-all group-data-[loading=true]/step:scale-100 group-data-[loading=true]/step:opacity-100">
                      <LoaderCircle
                        className="animate-spin"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </StepperIndicator>
                </StepperTrigger>
                {i < workflowData.length && <StepperSeparator />}
              </StepperItem>
              {step.name}
            </div>
          ))}
        </Stepper>
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            className="w-20"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Prev step
          </Button>
          <Button
            variant="outline"
            className="w-20"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep > workflowData.length}
          >
            Next step
          </Button>
        </div>
        {/* <div className="w-full h-full overflow-y-auto hide-scrollbar">
          {workflowData.map((action) => (
            <div key={action.name}>{action.name}</div>
          ))}
        </div> */}
        <DialogFooter>
          <div className="flex w-full gap-2">
            <DialogClose className="w-full flex-1" asChild>
              <Button variant="outlineTwo" className="w-full flex-1">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={handlePublish}
              className="w-full flex-1"
              disabled={disabled}
              variant="primary"
            >
              Publish
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
