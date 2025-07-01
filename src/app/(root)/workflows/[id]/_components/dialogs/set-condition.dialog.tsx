import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowLeft02Icon, CheckmarkCircle02Icon, Delete01Icon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  SideDialogContent
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, LoadingButton } from "@/components/buttons/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Define schema for a single condition item
const conditionItemSchema = z.object({
  field: z.string().min(1, "Field is required"),
  condition: z.string().min(1, "Condition is required"),
  value: z.string().min(1, "Value is required")
});

// Define the main form schema
const conditionSchema = z.object({
  description: z.string().optional(),
  conditions: z
    .array(conditionItemSchema)
    .min(1, "At least one condition is required")
});

type ConditionFormValues = z.infer<typeof conditionSchema>;

function SetConditionDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const form = useForm<ConditionFormValues>({
    defaultValues: {
      description: "",
      conditions: [
        {
          field: "",
          condition: "",
          value: ""
        }
      ]
    },
    resolver: zodResolver(conditionSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "conditions"
  });

  const handleSubmit = (data: ConditionFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Conditions saved successfully");
    setOpen(false);
  };

  // Options for the select fields
  const fieldOptions = [
    { value: "status", label: "Status" },
    { value: "priority", label: "Priority" },
    { value: "due_date", label: "Due Date" }
  ];

  const conditionOptions = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "contains", label: "Contains" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" }
  ];

  // Options for the value select field (Text/Data)
  const valueOptions = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "this_week", label: "This Week" }
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      form.reset();
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <SideDialogContent
        className="flex flex-col gap-0 overflow-y-visible rounded-xl p-0 max-w-md [&>button:last-child]:top-8">
        <DialogTitle className="border-b px-6 py-3 text-sm font-gilroySemiBold flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              className="size-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            Set Condition
          </div>
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="text-[#0C941C] size-4"
          />
        </DialogTitle>

        <div className="p-6 h-[28.6rem] w-full overflow-y-auto hide-scrollbar">

          <Form {...form}>
            <form
              id="set-condition-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full overflow-y-auto hide-scrollbar"
            >
              <div className="flex gap-2 items-center">
                <img src="/media/path-form.svg" alt="path" className="size-10" />
                <div className="flex flex-col">
                  <p className="font-gilroySemiBold text-sm text-[#222222]">
                    Path A
                  </p>
                  <p className="text-xs font-gilroyMedium text-black border border-gray-100 py-0.5 px-2 rounded-md">
                    Condition
                  </p>
                </div>
              </div>

              <div className=" mt-4">
                {/* Description field */}
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

                  {/* Dynamic conditions fields */}
                  <div className="flex flex-col gap-2.5">
                    {fields.map((field, index) => (
                      <div key={field.id}>
                        {index > 0 && (
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-gilroyMedium text-sm">And</div>

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
                          {/* Field select */}
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
                                      className={cn("flex justify-between font-gilroyMedium placeholder:text-[#cccccc]", fieldState.error && "border-red-400")}>
                                      <SelectValue placeholder="Field" className={"text-[#ccc]"} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="font-gilroyMedium">
                                    {fieldOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className={"invisible"} />
                              </FormItem>
                            )}
                          />

                          {/* Condition select */}
                          <FormField
                            control={form.control}
                            name={`conditions.${index}.condition`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      className={cn("flex justify-between font-gilroyMedium placeholder:text-[#cccccc]", fieldState.error && "border-red-400")}>
                                      <SelectValue placeholder="Condition" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="font-gilroyMedium">
                                    {conditionOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className={"invisible"} />
                              </FormItem>
                            )}
                          />

                          {/* Value select (Text/Data) */}
                          <FormField
                            control={form.control}
                            name={`conditions.${index}.value`}
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      className={cn("flex justify-between font-gilroyMedium placeholder:text-[#cccccc]", fieldState.error && "border-red-400")}>
                                      <SelectValue
                                        placeholder="Text/Data"
                                        className="placeholder:text-gray-100 font-gilroyMedium"
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="font-gilroyMedium">
                                    {valueOptions.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className={"invisible"} />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add condition button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-fit font-gilroyMedium text-xs items-center flex py-1"
                  onClick={() => append({ field: "", condition: "", value: "" })}
                >
                  <HugeiconsIcon icon={Add01Icon} className="text-black size-3" />{" "}
                  Add
                </Button>
              </div>


            </form>
          </Form>
        </div>

        <DialogFooter className="border-t px-6 py-3 justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="flex gap-2 items-center text-[13px] text-red-500"
              variant="outlineTwo"
            >
              <HugeiconsIcon icon={Delete01Icon} className="size-4" />
              Delete Node
            </Button>
          </DialogClose>
          <LoadingButton
            type="submit"
            form="set-condition-form"
            variant="primary"
            className="text-[13px] w-fit"
          >
            Continue
          </LoadingButton>
        </DialogFooter>
      </SideDialogContent>
    </Dialog>
  );
}

export default SetConditionDialog;
