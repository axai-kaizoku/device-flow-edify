"use client";

import { Button, LoadingButton } from "@/components/buttons/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
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
import { bulkUploadUsers, fetchUsers, User } from "@/server/userActions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AsyncMultiSelectCombobox,
  BaseOption,
} from "@/components/ui/async-multi-select-combobox";
import BulkUpload from "@/components/bulk-upload";
import { bulkUploadKeys } from "../../people/_components/helper/utils";
import {
  bulkUploadUsersIntegration,
  customIntegrationAdd,
} from "@/server/customIntegrationActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getImageUrl } from "@/components/utils/upload";
import { X } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileEmpty02Icon } from "@hugeicons/core-free-icons";
import axios, { AxiosError } from "axios";

const schema = z.object({
  platform: z.string().min(1, "Label is Required"),
  logo: z.string().min(1, "Logo is required"),
  price: z
    .string()
    .min(1, "Pricing is Required")
    .regex(/^\d+$/, "Only numeric values are allowed"),
  userIds: z.array(z.string()).min(1, "At least one member is required"),
  description: z.string().min(1, "Description is Required"),
});

type IntegrationForm = z.infer<typeof schema>;

function CustomIntegration({
  children,
  isEdit,
}: {
  children?: React.ReactNode;
  isEdit?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const integrationImage = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const form = useForm<IntegrationForm>({
    defaultValues: {
      platform: "",
      logo: "",
      price: "",
      userIds: [],
      description: "",
    },
    resolver: zodResolver(schema),
  });

  const selectedEmails = form.watch("userIds");

  type UserOption = BaseOption & User;

  const fetchUserOptions = async (): Promise<UserOption[]> => {
    const users = await fetchUsers();
    return users?.map((u) => ({
      ...u,
      label: u?.email,
      value: u?._id,
    }));
  };
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
    const isValidType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ].includes(file.type);

    if (!isValidSize || !isValidType) {
      toast.error(
        "Invalid file. Only JPG, JPEG, PNG, or PDF files under 5MB are allowed."
      );
      return;
    }

    setIsUploading(true);
    simulateProgress();

    try {
      const result = await getImageUrl({ file });
      form.setValue("logo", result.fileUrl);
    } catch (error) {
      // console.error(error);
      toast.error("File failed to upload");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveFile = () => {
    // setFormData((prev) => ({
    //   ...prev,
    //   invoiceUrl: null,
    // }));
    // form.reset({ logo: "" });
    form.setValue("logo", "");
  };
  const addCustomIntegartionMutation = useMutation({
    mutationFn: customIntegrationAdd,
    onSuccess: () => {
      toast.success("Integration Added");

      queryClient.invalidateQueries({
        queryKey: ["all-integrations", "installed"],
        refetchType: "all",
        exact: false,
      });

      setOpen(false); // ✅ Only close if success
      form.reset();
      setPage(1);
    },
    onError: () => {
      toast.error("Failed to add Integration");
    },
  });
  const handleSubmit = (data) => {
    const intData = { ...data, price: parseInt(data.price) };
    addCustomIntegartionMutation.mutate(intData);
  };

  const handleNext = () => {
    if (
      form.getValues("platform") === "" ||
      form.getValues("logo") === "" ||
      form.getValues("price") === "" ||
      form.getValues("description") === ""
    ) {
      form.setError("platform", {
        type: "manual",
        message: "Platform name is required",
      });
      form.setError("description", {
        type: "manual",
        message: "Platform name is required",
      });
      form.setError("logo", {
        type: "manual",
        message: "Logo is required",
      });
      form.setError("price", {
        type: "manual",
        message: "Pricing is required",
      });
      return;
    }
    setPage(2);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg max-w-md p-4 min-h-[35vh]">
        <DialogTitle className="text-start">
          {isEdit ? "Edit" : "Custom Integration"}
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {page === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Integration Name<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter" />
                      </FormControl>
                      <FormMessage className="invisible" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter description" />
                      </FormControl>
                      <FormMessage className="invisible" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Upload Logo<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <>
                          <div className="flex flex-wrap gap-4">
                            <div
                              className="flex flex-wrap gap-2 items-center justify-start bg-[#E9F3FF] rounded-md border-dashed min-h-16 w-full border-[1px] px-2 py-2 border-[#52ABFF] cursor-pointer"
                              onClick={() => integrationImage.current?.click()}
                            >
                              {isUploading ? (
                                <div className="w-full  flex flex-col items-center justify-center gap-2">
                                  <div className="w-3/4 h-2 bg-gray-200 rounded-full">
                                    <div
                                      className="h-2 bg-black rounded-full"
                                      style={{
                                        width: `${progress}%`,
                                        transition: "width 0.1s linear",
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-blue-500 font-gilroySemiBold">
                                    {progress}%
                                  </span>
                                </div>
                              ) : field?.value ? (
                                <div className="relative w-full h-20 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 group">
                                  <div className="flex items-center justify-center gap-2 py-2">
                                    <div className="bg-blue-500 text-white p-2 rounded-full">
                                      <HugeiconsIcon icon={FileEmpty02Icon} />
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-medium text-center">
                                        {field.value
                                          .split("/")
                                          .pop()
                                          .substring(0, 30)}
                                        ..
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Logo
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveFile();
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="text-white size-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col justify-center items-center w-full mx-auto">
                                  <div className="font-gilroySemiBold text-xs gap-1 flex items-center">
                                    <span className="text-[#0EA5E9]">
                                      Click to upload
                                    </span>
                                    <span className="text-[#525252]">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#A3A3A3]">
                                    JPG, JPEG, PNG less than 5MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <input
                            type="file"
                            ref={integrationImage}
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                            accept="image/jpeg, image/png, image/jpg"
                          />
                        </>
                      </FormControl>
                      <FormMessage className="invisible" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Pricing (₹/month)<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter"
                          onKeyDown={(e) => {
                            const allowedKeys = [
                              "Backspace",
                              "Tab",
                              "ArrowLeft",
                              "ArrowRight",
                              "Delete",
                            ];
                            if (
                              !/[0-9]/.test(e.key) &&
                              !allowedKeys.includes(e.key)
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="invisible" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {page === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="userIds"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Add Members<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2 pt-3">
                          <AsyncMultiSelectCombobox<UserOption>
                            fetcher={fetchUserOptions}
                            preload
                            filterFn={(opt, q) =>
                              opt?.first_name
                                ?.toLowerCase()
                                ?.includes(q?.toLowerCase()) ||
                              opt?.email
                                ?.toLowerCase()
                                ?.includes(q?.toLowerCase())
                            }
                            renderItem={(opt) => (
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col">
                                  <div className="font-gilroyMedium">
                                    {opt?.first_name}
                                  </div>
                                  <div className="text-xs font-gilroyRegular text-muted-foreground">
                                    {opt?.email}
                                  </div>
                                </div>
                              </div>
                            )}
                            renderSelectedItem={(opts) => {
                              const firstThree = opts?.slice(0, 3) ?? [];
                              const remaining =
                                opts?.length > 3 ? opts.length - 3 : 0;
                              return (
                                <div className="flex flex-wrap items-center gap-1">
                                  {firstThree?.map((o) => (
                                    <span
                                      key={o?.value}
                                      className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 rounded"
                                    >
                                      {o?.first_name}
                                    </span>
                                  ))}
                                  {remaining > 0 && (
                                    <span className="font-gilroyMedium text-xs">
                                      + {remaining} More
                                    </span>
                                  )}
                                </div>
                              );
                            }}
                            value={selectedEmails}
                            onChange={(val) => {
                              console.log(val);
                              form.setValue("userIds", val);
                            }}
                            label="Members"
                            placeholder="Select members"
                            notFound={
                              <div className="py-6 text-center font-gilroyMedium text-sm">
                                No users found
                              </div>
                            }
                            width="100%"
                            clearable
                          />
                          {error?.length ? (
                            <p className="text-xs text-destructive font-gilroyMedium">
                              {error}
                            </p>
                          ) : null}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full  mb-4 text-xs text-[#0000004D] flex gap-2 items-center justify-center font-gilroyMedium">
                  <div className="w-[10%] h-[0.5px] bg-[#0000001A] " />
                  OR
                  <div className="w-[10%] h-[0.5px] bg-[#0000001A] " />
                </div>

                <BulkUpload
                  bulkApi={bulkUploadUsersIntegration}
                  closeBtn={() => setOpen(true)}
                  requiredKeys={["email"]}
                  sampleData={{
                    email: "demo@exampledemo.com",
                  }}
                  getBulkResponse={(data) => {
                    console.log(data);
                    form.setValue("userIds", data.userIds);
                  }}
                />
              </>
            )}
            <div className="flex gap-2 mt-3">
              {page === 1 ? (
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-1/2 text-[13px] rounded-md"
                    variant="outlineTwo"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              ) : (
                <Button
                  type="button"
                  variant="outlineTwo"
                  className="w-1/2 text-[13px] rounded-md"
                  onClick={() => setPage(1)}
                >
                  Back
                </Button>
              )}
              {page === 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  className="w-1/2 text-[13px] rounded-md"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <LoadingButton
                  type="submit"
                  variant="primary"
                  className="w-1/2 text-[13px] rounded-md"
                >
                  {isEdit ? "Update" : "Done"}
                </LoadingButton>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CustomIntegration;
