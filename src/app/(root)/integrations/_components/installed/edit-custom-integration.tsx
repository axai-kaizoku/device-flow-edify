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
import { getImageUrl } from "@/components/utils/upload";
import {
  customIntegrationEdit,
  CustomIntegrationType,
} from "@/server/customIntegrationActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileEmpty02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  platform: z.string().min(1, "Label is Required"),
  logo: z.string(),
  price: z.string().min(1, "Pricing is Required"),
});

type IntegrationForm = z.infer<typeof schema>;

function EditingCustomIntegration({
  data,
  children,
}: {
  data: any;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const integrationImage = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<IntegrationForm>({
    defaultValues: {
      platform: data?.platform || "",
      logo: data?.image || "",
      price: data?.price ? data?.price.toString() : "",
    },
    resolver: zodResolver(schema),
  });

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
  const updateCustomIntegartionMutation = useMutation({
    mutationFn: (data: { id: string; payload: CustomIntegrationType }) =>
      customIntegrationEdit(data),
    onSuccess: () => {
      toast.success("Integration Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["all-integrations", "installed"],
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: ["user-by-integrations"],
        refetchType: "all",
      });

      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Failed to update integration");
    },
  });

  const handleSubmit = (formData: IntegrationForm) => {
    setLoading(true);
    try {
      const intData = {
        id: data.id,
        payload: {
          platform: formData.platform,
          logo: formData.logo,
          price: parseInt(formData.price), // Ensure it's a number
        },
      };
      updateCustomIntegartionMutation.mutate(intData);
      setOpen(false);
      router.replace(`/integrations/installed/${intData?.payload?.platform}`);
    } catch (error) {
      toast.error("Failed to update integration");
    } finally {
      setLoading(false);
    }
  };

  console.log("data", data);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        // form.reset();
        form.reset({
          platform: data?.platform || "",
          logo: data?.image || "",
          price: data?.price ? data?.price.toString() : "",
        });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg max-w-md p-4 min-h-[35vh]">
        <DialogTitle className="text-start">Edit</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                  <FormMessage />
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
                          className="flex flex-wrap gap-2 items-center justify-start bg-[#E9F3FF] rounded-md border-dashed h-20 w-full border-[1px] px-2 py-2 border-[#52ABFF] cursor-pointer"
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
                            <div className="relative w-full h-16 -mt-0.5 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 group">
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
                                  <p className="text-xs text-gray-500">Logo</p>
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
                              <div className="font-gilroySemiBold text-sm gap-1 flex items-center">
                                <span className="text-[#0EA5E9]">
                                  Click to upload
                                </span>
                                <span className="text-[#525252]">
                                  or drag and drop
                                </span>
                              </div>
                              <p className="text-[10px] text-[#A3A3A3]">
                                JPG, JPEG, PNG, PDF less than 5MB
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
                        accept="image/jpeg, image/png, image/jpg, application/pdf"
                      />
                    </>
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} placeholder="Enter" />
                  </FormControl>
                  <FormMessage className="invisible" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mt-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="w-1/2 text-[13px]"
                  variant="outlineTwo"
                >
                  Cancel
                </Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                variant="primary"
                className="w-1/2 text-[13px]"
                loading={loading}
                disabled={loading}
              >
                Save
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditingCustomIntegration;
