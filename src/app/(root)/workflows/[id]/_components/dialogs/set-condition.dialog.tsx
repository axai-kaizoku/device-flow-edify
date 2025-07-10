import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button, LoadingButton } from "@/components/buttons/Button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  SideDialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addPathCondition } from "@/server/workflowActions/workflowById/workflowPaths";
import { getConditionsOfPath } from "@/server/workflowActions/workflowById/workflowPositions";
import {
  Add01Icon,
  AlertCircleIcon,
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConfirmationModal } from "../dropdowns/confirmation-popup";

// Define schema for a single condition item
const conditionItemSchema = z.object({
  field: z.string().min(1, "Field is required"),
  condition: z.string().min(1, "Condition is required"),
  value: z.string().min(1, "Value is required"),
});

// Define the main form schema
const conditionSchema = z.object({
  description: z.string().optional(),
  conditions: z
    .array(conditionItemSchema)
    .min(1, "At least one condition is required"),
});

type ConditionFormValues = z.infer<typeof conditionSchema>;

function SetConditionDialog({
  children,
  parentData,
  onDelete,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  parentData: any;
  onDelete: () => void;
}) {
  // const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<ConditionFormValues>({
    defaultValues: {
      description: parentData?.branchData?.branchDescription,
      conditions:
        parentData?.branchData?.condition?.length > 0
          ? parentData.branchData.condition.map((data) => ({
              field: data?.field,
              condition: data?.operator,
              value: data?.value,
            }))
          : [{ field: "", condition: "", value: "" }],
    },
    resolver: zodResolver(conditionSchema),
  });

  const mutation = useMutation({
    mutationFn: addPathCondition,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", parentData?.backendData?.workflowId],
      });
      await queryClient.refetchQueries({
        queryKey: ["workflow-by-id", parentData?.backendData?.workflowId],
      });
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "conditions",
  });

  const handleSubmit = async (data: ConditionFormValues) => {
    console.log(data, "condition data");

    const existingConditions = parentData?.branchData?.condition ?? [];

    console.log(parentData, "condition parent data");

    const promises = data?.conditions?.map(async (cond, idx) => {
      const existing = existingConditions[idx];

      if (existing?._id) {
        // Update existing condition
        return mutation.mutateAsync({
          branchId: parentData?.branchData?.branchId,
          nodeId: parentData?.branchData?.parentNodeId,
          conditionId: existing?._id,
          branchDescription: data?.description,
          condition: {
            field: cond?.field,
            operator: cond?.condition,
            value: cond?.value,
          },
          isNew: false,
        });
      } else {
        // Add new condition
        return mutation.mutateAsync({
          branchId: parentData?.branchData?.branchId,
          nodeId: parentData?.branchData?.parentNodeId,
          branchDescription: data?.description,
          condition: {
            field: cond?.field,
            operator: cond?.condition,
            value: cond?.value,
          },
          isNew: true,
        });
      }
    });

    try {
      await Promise.all(promises);
      toast.success("Conditions updated");
      setOpen(false);
    } catch (e) {
      toast.error("Failed to update conditions");
    }
  };

  const { data: ifCondtionsData } = useQuery<any>({
    queryKey: [
      "if-condition-template-key",
      parentData?.branchData?.parentTemplateKey,
    ],
    queryFn: async () =>
      await getConditionsOfPath({
        templateKey: parentData?.branchData?.parentTemplateKey,
      }),
    staleTime: Infinity,
    refetchOnMount: false,
  });

  const fieldOptions =
    ifCondtionsData?.outputFields?.map((field) => ({
      value: field,
      label: field,
    })) || [];

  const conditionOptions = [
    { value: "==", label: "Equals" },
    { value: "!=", label: "Not Equals" },
    { value: ">", label: "Greater Than" },
    { value: "<", label: "Less Than" },
  ];

  const hasConditions = conditionOptions.length > 0;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          form.reset();
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>

        <SideDialogContent className="flex flex-col gap-0 overflow-y-visible rounded-xl p-0 max-w-md [&>button:last-child]:top-8">
          <DialogTitle className="border-b px-6 py-3 text-sm font-gilroySemiBold flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                className="size-5 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              Set Condition
            </div>
            {parentData?.branchData?.condition ? (
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="text-[#0C941C] size-4"
              />
            ) : (
              <HugeiconsIcon
                icon={AlertCircleIcon}
                className="text-[#F59E0B] size-4"
              />
            )}
          </DialogTitle>
          <DialogDescription className="sr-only">
            paths description
          </DialogDescription>

          <div className="p-6 h-[28.6rem] w-full overflow-y-auto hide-scrollbar">
            <Form {...form}>
              <form
                id="set-condition-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full overflow-y-auto hide-scrollbar"
              >
                <div className="flex gap-2 items-center">
                  <img
                    src="/media/path-form.svg"
                    alt="path"
                    className="size-10"
                  />
                  <div className="flex flex-col">
                    <p className="font-gilroySemiBold text-sm text-[#222222]">
                      {parentData?.branchData?.label}
                    </p>
                    <p className="text-xs font-gilroyMedium text-black border border-gray-100 py-0.5 px-2 rounded-md">
                      Condition
                    </p>
                  </div>
                </div>

                <div className=" mt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter description"
                            className="placeholder:text-[13px] placeholder:text-[#CCCCCC] font-gilroyMedium"
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="invisible" />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-2">
                    <FormLabel className="font-gilroyMedium text-sm ">
                      Continue only if
                    </FormLabel>

                    <div className="flex flex-col gap-2.5">
                      {fields.map((field, index) => (
                        <div key={field.id}>
                          {index > 0 && (
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-gilroyMedium text-sm">
                                And
                              </div>

                              {index > 0 && (
                                <div
                                  className="text-red-500 font-gilroyMedium text-xs flex items-center gap-1 cursor-pointer"
                                  onClick={() => remove(index)}
                                >
                                  <HugeiconsIcon
                                    icon={Delete01Icon}
                                    className="size-4"
                                  />
                                  Delete
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex flex-col">
                            <FormField
                              control={form.control}
                              name={`conditions.${index}.field`}
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        className={cn(
                                          "flex justify-between font-gilroyMedium placeholder:text-[#cccccc]",
                                          fieldState.error && "border-red-400"
                                        )}
                                      >
                                        <SelectValue
                                          placeholder="Field"
                                          className={"text-[#ccc]"}
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="font-gilroyMedium">
                                      {fieldOptions.length > 0 ? (
                                        fieldOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <div className="p-2 text-sm text-gray-500">
                                          ⚠️ No conditions available.
                                        </div>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className={"invisible"} />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`conditions.${index}.condition`}
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!hasConditions} // disables dropdown when empty
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        className={cn(
                                          "flex justify-between font-gilroyMedium placeholder:text-[#cccccc]",
                                          fieldState.error && "border-red-400"
                                        )}
                                      >
                                        <SelectValue placeholder="Condition" />
                                      </SelectTrigger>
                                    </FormControl>

                                    <SelectContent className="font-gilroyMedium">
                                      {conditionOptions.length > 0 ? (
                                        conditionOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <div className="p-2 text-sm text-gray-500">
                                          ⚠️ No conditions available. Please
                                          check your template setup.
                                        </div>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className={"invisible"} />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`conditions.${index}.value`}
                              render={({ field, fieldState }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter text"
                                      className="placeholder:text-[13px] placeholder:text-[#CCCCCC] font-gilroyMedium"
                                      value={field.value || ""}
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage className="invisible" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit font-gilroyMedium text-xs items-center flex py-1"
                    onClick={() =>
                      append({ field: "", condition: "", value: "" })
                    }
                  >
                    <HugeiconsIcon
                      icon={Add01Icon}
                      className="text-black size-3"
                    />{" "}
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <DialogFooter className="border-t px-6 py-3 justify-end">
            <DialogClose asChild>
              <ConfirmationModal
                functionToBeExecuted={() => {
                  onDelete?.();
                  setOpen(false);
                }}
                type="failure"
                title="Are you sure?"
                description="Deleting this path"
                successBtnText="Delete"
              >
                <Button
                  type="button"
                  className="flex w-fit gap-2 items-center text-[13px] text-red-500"
                  variant="outlineTwo"
                >
                  <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                  Delete Path
                </Button>
              </ConfirmationModal>
            </DialogClose>
            <LoadingButton
              type="submit"
              form="set-condition-form"
              variant="primary"
              className="text-[13px] w-fit"
              onClick={(e) => e.stopPropagation()}
              loading={mutation?.isPending}
            >
              Continue
            </LoadingButton>
          </DialogFooter>
        </SideDialogContent>
      </Dialog>
    </>
  );
}

export default SetConditionDialog;
