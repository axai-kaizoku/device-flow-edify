"use client";
import { Button, LoadingButton } from "@/components/buttons/Button";
import React, { useCallback, useState } from "react";
import {
  Dialog,
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
import {
  getChannelsFromKey,
  getServices,
  getSlackChannelMessage,
  setConfigApp,
  updateAppAction,
} from "@/server/workflowActions/workflowById/workflowNodes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ChangeAppDropdown from "../dropdowns/change-app-dropdown";
import { ConfirmationModal } from "../dropdowns/confirmation-popup";

// Define schema for the action form
const actionSchema = z.object({
  description: z.string().optional(),
  action: z.string().min(1, "Action is required"),
  channel: z.string(),
  parameters: z.record(z.string()).optional(),
});

type ActionFormValues = z.infer<typeof actionSchema>;

function SetActionDialog({
  children,
  data,
  onDelete,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  data?: any;
  onDelete: () => void;
  setOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [selectedActionKey, setSelectedActionKey] = useState<string | null>(
    null
  );
  const { data: services, status: servicesStatus } = useQuery({
    queryKey: ["get-node-services", data?.backendData?.template?.name],
    queryFn: () => getServices(data?.backendData?.template?.name),
    staleTime: Infinity,
    refetchOnMount: false,
  });

  // console.log(services);
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

  const setChannelMutation = useMutation({
    mutationFn: setConfigApp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", data?.backendData?.workflowId],
        exact: false,
      });
      // toast.success("App Condition set Successfully");
    },
    onError: () => {
      // toast.error("Failed to set App Condition");
    },
  });

  const form = useForm<ActionFormValues>({
    defaultValues: {
      description: data?.backendData?.template?.description || "",
      action: data?.backendData?.templateKey || "",
      parameters: {},
      channel: "",
    },
    resolver: zodResolver(actionSchema),
  });

  const handleSubmit = (formData: ActionFormValues) => {
    try {
      selectedActionKey?.toLowerCase().split("_").includes("message")
        ? setChannelMutation.mutate({
            channelId: formData.channel,
            currentNodeId: data?.backendData?.parentNodeId,
          })
        : selectedActionKey?.toLowerCase().split("_").includes("team")
        ? setChannelMutation.mutate({
            teamId: formData.channel,
            currentNodeId: data?.backendData?.parentNodeId,
          })
        : null;

      setActionMutation.mutate({
        nodeId: data.backendData.parentNodeId,
        templateKey: formData.action,
        workflowId: data.backendData.workflowId,
        description: formData.description,
      });
      // console.log("Form submitted:", data);
      setOpen(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const { data: channels, status: channelStatus } = useQuery({
    queryKey: ["get-channel-services", selectedActionKey],
    queryFn: () => getChannelsFromKey(selectedActionKey!),
    enabled: !!selectedActionKey,
  });

  const selectedChannel = form.watch("channel");

  const fetchSlackMessage = useCallback(() => {
    return getSlackChannelMessage({ channelId: selectedChannel });
  }, [selectedChannel]);

  const { data: message, status } = useQuery({
    queryKey: ["get-channel-message", selectedChannel],
    queryFn: fetchSlackMessage,
    enabled: !!selectedChannel,
  });

  // console.log(form.getValues("channel"));

  // console.log(message);

  // console.log(channels);
  // console.log(selectedActionKey);

  // Options for the action select field
  const actionOptions =
    services?.map((service, index) => ({
      value: service?.key,
      label: service?.service,
    })) || [];

  const channelOptions =
    channels?.data?.map((channel, index) => ({
      value: channel?.id,
      label: channel?.name,
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
        <DialogDescription className="sr-only">
          app description
        </DialogDescription>
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
                    src={data?.backendData?.template?.image}
                    alt={data?.backendData?.template?.name}
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
                          onValueChange={(val) => {
                            field.onChange(val);
                            setSelectedActionKey(val);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="flex justify-between font-gilroyMedium placeholder:text-[#CCCCCC]">
                              <SelectValue placeholder="Choose action" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-gilroyMedium">
                            {actionOptions?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-left capitalize"
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

                {(selectedActionKey
                  ?.toLowerCase()
                  .split("_")
                  .includes("message") ||
                  selectedActionKey
                    ?.toLowerCase()
                    .split("_")
                    .includes("team")) && (
                  <>
                    <div className="space-y-2">
                      <FormLabel className="font-gilroyMedium text-sm">
                        {selectedActionKey
                          ?.toLowerCase()
                          .split("_")
                          .includes("message")
                          ? "Channel"
                          : "Team"}
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="channel"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(val) => {
                                field.onChange(val);
                                form.setValue("channel", val);
                                // setSelectedActionKey(val);
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="flex justify-between font-gilroyMedium placeholder:text-[#CCCCCC]">
                                  <SelectValue placeholder={`Choose options`} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="font-gilroyMedium">
                                {channelOptions?.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="text-left capitalize"
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

                    {!message?.isMember && (
                      <p className="text-red-500 font-gilroyMedium text-xs">
                        {message?.message}
                      </p>
                    )}
                  </>
                )}
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
            loading={setActionMutation?.isPending}
            onClick={(e) => e.stopPropagation()}
          >
            Continue
          </LoadingButton>
        </DialogFooter>
      </SideDialogContent>
    </Dialog>
  );
}

export default SetActionDialog;
