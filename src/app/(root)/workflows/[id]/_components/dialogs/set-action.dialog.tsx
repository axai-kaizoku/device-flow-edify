"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
import { Button, LoadingButton } from "@/components/buttons/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmationModal } from "../dropdowns/confirmation-popup";
import { AppTaskType } from "../types/task";
import { ChangeAppDialog } from "./change-app.dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  updateAppAction,
} from "@/server/workflowActions/workflowById/workflowNodes";
import ChangeAppDropdown from "../dropdowns/change-app-dropdown";

// Define schema for the action form
const actionSchema = z.object({
  description: z.string().optional(),
  action: z.string().min(1, "Action is required"),
  parameters: z.record(z.string()).optional(),
});

type ActionFormValues = z.infer<typeof actionSchema>;

function SetActionDialog({
  children,
  onChangeApp,
  data,
  onDelete,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  onChangeApp: (app: AppTaskType) => void;
  data?: any;
  onDelete: () => void;
  setOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { data: services, status: servicesStatus } = useQuery({
    queryKey: ["get-node-services", data?.backendData?.template?.name],
    queryFn: () => getServices(data?.backendData?.template?.name),
  });
  const [loading, setLoading] = useState(false);


  const setActionMutation = useMutation({
    mutationFn: updateAppAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", data?.backendData?.workflowId],
        exact: false,
      });
      toast.success("App Condition set Successfully");
    },
    onError: () => {
      toast.error("Failed to set App Condition");
    },
  });

  const form = useForm<ActionFormValues>({
    defaultValues: {
      description: data?.backendData?.template?.description || "",
      action: data?.backendData?.templateKey || "",
      parameters: {},
    },
    resolver: zodResolver(actionSchema),
  });

  const handleSubmit = (formData: ActionFormValues) => {
    setLoading(true);
    try{
      setActionMutation.mutate({
        nodeId: data.backendData.parentNodeId,
        templateKey: formData.action,
        workflowId: data.backendData.workflowId,
        description: formData.description
      });
      console.log("Form submitted:", data);
      setOpen(false);
    }
    catch(error){
      toast.error("Something went wrong");
    }
    finally{
      setLoading(false)
    }
  };

  // Options for the action select field
  const actionOptions =
    services?.map((service, index) => ({
      value: service?.key,
      label: service?.service,
    })) || [];

  return (
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
            Set Action
          </div>
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="text-[#0C941C] size-4"
          />
        </DialogTitle>
        <div className="p-6 h-[28.6rem] w-full overflow-y-auto hide-scrollbar">
          <Form {...form}>
            <form
              id="set-action-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full overflow-y-auto hide-scrollbar"
            >
              {/* App logo and labels section */}
              <div className="flex gap-2 items-center">
                <div className="rounded-lg p-1.5 border border-gray-100 flex-shrink-0">
                  <img
                    src="/media/integrations-companies/google.webp"
                    alt="Google Workspace"
                    className="size-10"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center w-full">
                    <p className="font-gilroySemiBold text-sm text-[#222222]">
                      {data.appType}
                    </p>
                    <ChangeAppDropdown data={data}>
                      <p className="text-xs font-gilroyMedium border rounded-[5px] border-[#CCCCCC] px-1 py-0.5 cursor-pointer">
                        Change
                      </p>
                    </ChangeAppDropdown>
                  </div>
                  <p className="text-xs font-gilroyMedium w-fit text-black border border-gray-100 py-0.5 px-2 rounded-md">
                    Action
                  </p>
                </div>
              </div>

              <div className=" mt-4 gap-5">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action select field */}
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
                              <SelectValue placeholder="Choose action" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-gilroyMedium">
                            {actionOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-left"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className="border-t px-6 py-3 justify-end">
          <div className="w-fit">
            <ConfirmationModal
              functionToBeExecuted={() => {
                onDelete();
                setOpen(false);
              }}
              type="failure"
              title="Are you sure?"
              description="Deleting this node"
              successBtnText="Delete"
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

          {/* </DialogClose> */}
          <LoadingButton
            form="set-action-form"
            type="submit"
            variant="primary"
            className="text-[13px] w-fit"
            loading={loading}
          >
            Continue
          </LoadingButton>
        </DialogFooter>
      </SideDialogContent>
    </Dialog>
  );
}

export default SetActionDialog;
