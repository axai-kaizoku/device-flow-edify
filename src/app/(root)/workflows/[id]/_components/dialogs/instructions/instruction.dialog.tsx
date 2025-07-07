import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button, LoadingButton } from "@/components/buttons/Button";
import {
  Dialog,
  DialogClose,
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
import {
  Add01Icon,
  AlertCircleIcon,
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Delete01Icon,
  Note02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { EditConditionForm } from "./edit-condition.form";
import { EmailTemplate } from "./email-templete";
import { ConfirmationModal } from "../../dropdowns/confirmation-popup";
import { AppTaskType } from "../../types/task";
import { ChangeAppDialog } from "../change-app.dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServices } from "@/server/workflowActions/workflowById/workflowNodes";

const schema = z.object({
  description: z.string().optional(),
  action: z.string().optional(),
});

export type InstructionValues = z.infer<typeof schema>;

export const InstructionDialog = ({
  children,
  onDelete,
  onChangeApp,
  data,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  onChangeApp: (app: AppTaskType) => void;
  data?: any;
  open: boolean;
  onDelete: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const [isEditScreen, setIsEditScreen] = useState(false);
  const queryClient = useQueryClient();
  const { data: services, status: servicesStatus } = useQuery({
    queryKey: ["get-node-services", data?.backendData?.template?.name],
    queryFn: () => getServices(data?.backendData?.template?.name),
  });
  console.log(data);
  const handleSubmit = (data: InstructionValues) => {
    console.log("Form submitted:", data);
    toast.success("Conditions saved successfully");
    setOpen(false);
  };
  const form = useForm<InstructionValues>({
    defaultValues: {
      description: services?.[0]?.description,
      action: services?.[0]?.service,
    },
    resolver: zodResolver(schema),
  });
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setIsEditScreen(false);
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
              onClick={() => {
                if (isEditScreen) {
                  setIsEditScreen(false);
                } else {
                  setOpen(false);
                }
              }}
            />
            Configure
          </div>
          {form?.formState?.errors?.root?.message ? (
            <HugeiconsIcon
              icon={AlertCircleIcon}
              className="text-[#F59E0B] size-4"
            />
          ) : (
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="text-[#0C941C] size-4"
            />
          )}
        </DialogTitle>
        <div className="px-6 py-5 h-[28.6rem] w-full overflow-y-auto hide-scrollbar">
          {!isEditScreen ? (
            <Form {...form}>
              <form
                id="set-condition-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full overflow-y-auto h-full hide-scrollbar"
              >
                <div className="flex gap-2 items-center">
                  {/*<img src="/media/path-form.svg" alt="path" className="size-10" />*/}
                  <div className="p-2 rounded-lg bg-[#0062FF0D] border border-[#0062FF] flex items-center justify-center">
                    <HugeiconsIcon
                      icon={Note02Icon}
                      className="text-[#0062FF] size-6"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center w-full">
                      <p className="font-gilroySemiBold text-sm text-[#222222]">
                        Send instructions
                      </p>
                      <ChangeAppDialog onChangeApp={onChangeApp}>
                        <p className="text-xs font-gilroyMedium border rounded-[5px] border-[#CCCCCC] px-1 py-0.5 cursor-pointer">
                          Change
                        </p>
                      </ChangeAppDialog>
                    </div>
                    <p className="text-xs font-gilroyMedium w-fit text-black border border-gray-100 py-0.5 px-2 rounded-md">
                      Action
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

                  <div className="space-y-2">
                    <FormLabel className="font-gilroyMedium text-sm">
                      Action
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="action"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="flex justify-between font-gilroyMedium placeholder:text-[#CCCCCC]">
                                <SelectValue
                                  placeholder="Choose action"
                                  className={"placeholder:text-[#CCCCCC]"}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-gilroyMedium">
                              {services?.map((option) => (
                                <SelectItem
                                  key={option.service}
                                  value={option.service}
                                  className="text-left"
                                >
                                  {option.service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.getValues("action") ? (
                    <EmailTemplate setIsEdit={setIsEditScreen} />
                  ) : null}

                  <div className="border-t border-dashed border-[#0000001A] w-full h-px mt-0 mb-5" />

                  <Button
                    type="button"
                    variant="outlineTwo"
                    onClick={() => setIsEditScreen(true)}
                    className="w-full font-gilroyMedium text-xs items-center flex py-1"
                  >
                    <HugeiconsIcon
                      icon={Add01Icon}
                      className="text-black size-3"
                    />{" "}
                    Add custom actions
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <EditConditionForm currentNodeData={data?.backendData} />
          )}
        </div>

        <DialogFooter className="border-t px-6 py-3 justify-end">
          {!isEditScreen ? (
            <>
              <div className="w-fit">
                <ConfirmationModal
                  functionToBeExecuted={() => {
                    onDelete();
                    setOpen(false);
                  }}
                  title="Are you sure?"
                  successBtnText="Delete"
                  type="failure"
                  description="Delete this node"
                >
                  <Button
                    type="button"
                    className="flex gap-2 items-center text-[13px] text-red-500"
                    variant="outlineTwo"
                  >
                    <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    Delete Node
                  </Button>
                </ConfirmationModal>
              </div>

              <LoadingButton
                type="submit"
                form="set-condition-form"
                variant="primary"
                className="text-[13px] w-fit"
              >
                Continue
              </LoadingButton>
            </>
          ) : (
            <LoadingButton
              type="submit"
              form="edit-condition-form"
              variant="primary"
              className="text-[13px] w-fit"
              onClick={() => {
                // setIsEditScreen(false);
                // form.reset();
              }}
            >
              Save & Continue
            </LoadingButton>
          )}
        </DialogFooter>
      </SideDialogContent>
    </Dialog>
  );
};
