"use client";
import { Button } from "@/components/buttons/Button";
import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import React, { useEffect, useRef, useState } from "react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, LoaderCircle, XIcon } from "lucide-react";
import {
  testRunWorkflow,
  updateWorkflow,
} from "@/server/workflowActions/workflow";

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
      workflowId={workflowId}
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

const STEP_DELAY_MS = 3000;

export const TestRunDialog = ({
  children,
  handlePublish,
  disabled,
  workflowId,
}: {
  children: React.ReactNode;
  handlePublish: () => void;
  disabled: boolean;
  workflowId: string;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingStepIndex, setLoadingStepIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [failedStepIndex, setFailedStepIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();
  // Add at the top inside TestRunDialog
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: workflowData, status } = useQuery({
    queryKey: ["test-run-workflow", workflowId],
    queryFn: () => testRunWorkflow(workflowId),
    enabled: !!workflowId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { name?: string; status?: string }) =>
      updateWorkflow(workflowId, data),
    onMutate: async (newData) => {
      // Optimistically update the status
      if (newData.status) {
        await queryClient.invalidateQueries({
          queryKey: ["workflow-by-id", workflowId],
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", workflowId],
      });
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-workflows"],
      });
      toast.success("Workflow updated successfully");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update workflow");
    },
  });

  // console.log(workflowData);

  useEffect(() => {
    if (!isDialogOpen || !workflowData) return;

    const steps = workflowData.results;
    let stepIndex = 0;

    const runNextStep = () => {
      if (stepIndex >= steps.length || failedStepIndex !== null) {
        setLoadingStepIndex(null);
        return;
      }

      const step = steps[stepIndex];

      // Set loading indicator
      setLoadingStepIndex(stepIndex);

      timerRef.current = setTimeout(() => {
        if (step.executable === false) {
          setFailedStepIndex(stepIndex);
          setLoadingStepIndex(null);
          return;
        }

        setCompletedSteps((prev) => [...prev, stepIndex]);
        setCurrentStep((prev) => prev + 1);

        stepIndex++;
        runNextStep();
      }, STEP_DELAY_MS);
    };

    // Reset on open
    setCurrentStep(0);
    setCompletedSteps([]);
    setFailedStepIndex(null);
    runNextStep();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDialogOpen, workflowData]);

  // Scroll the current step into view on step change
  useEffect(() => {
    const el = stepRefs.current[currentStep];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentStep, loadingStepIndex]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  const allStepsCompleted =
    workflowData?.results?.length === completedSteps.length &&
    loadingStepIndex === null &&
    failedStepIndex === null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="font-gilroyMedium max-w-sm   rounded-[10px] p-0 ">
        <DialogTitle className="font-gilroySemiBold px-5 pt-5 text-black text-sm  ">
          Test Workflow
        </DialogTitle>
        {/* {JSON.stringify(workflowData)} */}
        <div className="h-[1px] w-full bg-gray-300 "></div>
        <Stepper
          value={currentStep}
          onValueChange={setCurrentStep}
          orientation="vertical"
          className="px-5 overflow-y-auto min-h-0 h-fit max-h-[11rem]"
        >
          {workflowData?.results?.map((step, i) => {
            const isCompleted = completedSteps.includes(i) || i < currentStep;
            const isFailed = failedStepIndex === i;
            const isLoading = loadingStepIndex === i;

            return (
              <div
                className="flex gap-2.5 justify-start"
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                key={step.nodeId}
              >
                <StepperItem
                  key={i}
                  step={i}
                  id={i}
                  loading={isLoading}
                  completed={isCompleted || isFailed}
                  executable={step.executable}
                  className="[&:not(:last-child)]:flex-1/2 h-fit w-fit flex gap-1"
                >
                  <StepperTrigger asChild>
                    <StepperIndicator asChild>
                      <span className="transition-all group-data-[loading=true]/step:scale-50 group-data-[state=completed]/step:scale-50 group-data-[loading=true]/step:opacity-0 group-data-[state=completed]/step:opacity-0">
                        {/* {step.name} */}
                      </span>
                      {loadingStepIndex !== i ? (
                        step.executable ? (
                          <Check
                            className="absolute scale-50 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
                            size={14}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <XIcon
                            className="absolute scale-0 opacity-0 text-white transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100 group-data-[state=active]/step:scale-100 group-data-[state=active]/step:opacity-100"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )
                      ) : (
                        <span className="absolute scale-50 opacity-0 transition-all group-data-[loading=true]/step:scale-100 group-data-[loading=true]/step:opacity-100">
                          <LoaderCircle
                            className="animate-spin text-black"
                            size={14}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </StepperIndicator>
                  </StepperTrigger>
                  {i < workflowData.results.length - 1 && (
                    <StepperSeparator executable={step.executable} />
                  )}
                </StepperItem>

                <div className="flex flex-col">
                  <p>{step?.appName || "Sample Step"}</p>
                  {!step?.executable && (
                    <p>
                      {(isFailed || (isCompleted && !step.executable)) && (
                        <span className="text-xs text-red-500 font-gilroyMedium">
                          {step.reason}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </Stepper>
        {/* <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            className="w-20"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
          >
            Prev step
          </Button>
          <Button
            variant="outline"
            className="w-20"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep >= (workflowData?.results.length || 0) - 1}
          >
            Next step
          </Button>
        </div> */}

        {/* <div className="w-full h-full overflow-y-auto hide-scrollbar">
          {workflowData.map((action) => (
            <div key={action.name}>{action.name}</div>
          ))}
        </div> */}
        <DialogFooter>
          <div className="flex w-full gap-2 p-5 pt-0">
            <DialogClose className="w-full flex-1" asChild>
              <Button variant="outlineTwo" className="w-full flex-1">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                updateMutation.mutate({ status: "published" });
              }}
              className="w-full flex-1"
              disabled={
                !allStepsCompleted || workflowData?.status === "partial"
              }
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
