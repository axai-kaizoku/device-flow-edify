"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { EmailTextEditor } from "./text-editor/email-text-editor";
import { getImageUrl } from "@/components/utils/upload";
import { HugeiconsIcon } from "@hugeicons/react";
import { FileEmpty02Icon } from "@hugeicons/core-free-icons";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setConfigInstruction } from "@/server/workflowActions/workflowById/workflowNodes";
import IfConditionDialog from "./if-condition-dialog";

const schema = z.object({
  to: z.union([z.string().optional(), z.array(z.string().optional())]),
  subject: z.string().optional(),

  cc: z.union([z.string().optional(), z.array(z.string().optional())]),
  body: z.string().optional(),
  attachment: z.string().optional(),
});
type InstructionValues = z.infer<typeof schema>;

export const EditConditionForm = ({
  formData,
  currentNodeData,
  isEdit,
  isNew,
  setNext,
}: {
  formData?: {
    description: "";
    action: "";
    to: "";
    cc: "";
    subject: "";
    body: "";
    attachment: "";
  };
  isEdit?: boolean;
  isNew?: boolean;
  currentNodeData: any;
  setNext?: (next: number) => void;
}) => {
  // const form = useForm<InstructionValues>({
  //   defaultValues: {
  //     to: isNew ? "" : isEdit ? currentNodeData.configData.to : "",
  //     cc: isNew ? "" : isEdit ? currentNodeData.configData.cc : "",
  //     subject: isNew ? "" : isEdit ? currentNodeData.configData.subject : "",
  //     body: isNew ? "" : isEdit ? currentNodeData.configData.html : "",
  //     attachment: "",
  //   },
  //   resolver: zodResolver(schema),
  // });
  const form = useForm<InstructionValues>({
    defaultValues: {
      to: isNew ? "" : isEdit ? currentNodeData?.configData?.to : "",
      cc: isNew ? "" : isEdit ? currentNodeData?.configData?.cc : "",
      subject: isNew ? "" : isEdit ? currentNodeData?.configData?.subject : "",
      body: isNew ? "" : isEdit ? currentNodeData?.configData?.html : "",
      attachment: "",
    },
    resolver: zodResolver(schema),
  });

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const attachmentFile = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
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
      console.log(result);
      form.setValue("attachment", result.fileUrl);
    } catch (error) {
      // console.error(error);
      toast.error("File failed to upload");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveFile = () => {
    form.setValue("attachment", "");
  };
  const mutation = useMutation({
    mutationFn: setConfigInstruction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflow-by-id", currentNodeData?.workflowId],
        exact: false,
      });
      toast.success("Conditions saved successfully");
    },
    onError: () => {
      toast.error("Failed to add configuration");
    },
  });
  const handleSubmit = (data: InstructionValues) => {
    const attachmentUrl = data.attachment;

    let htmlWithAttachment = data.body || "";

    if (attachmentUrl) {
      const urlParts = attachmentUrl.split("/");
      const rawFileName = urlParts[urlParts.length - 1] || "";
      const decodedFileName = decodeURIComponent(rawFileName);

      // Remove leading numbers with optional dash (e.g., "1751885660332-")
      const cleanedFileName = decodedFileName.replace(/^\d+-/, "");

      htmlWithAttachment += `
        
       
         
          <a href="${attachmentUrl}" target="_blank">File Name: ${cleanedFileName}</a>
        `;
    }

    console.log("Submitting with html:", htmlWithAttachment);

    mutation.mutate({
      currentNodeId: currentNodeData._id,
      cc: Array.isArray(data?.cc) ? data.cc : data.cc ? [data.cc] : [],
      html: htmlWithAttachment,
      subject: data?.subject,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        id="edit-condition-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full overflow-y-auto h-full hide-scrollbar"
      >
        <div className="space-y-2">
          <FormLabel className="font-gilroyMedium text-sm">
            To<span className="text-red-500">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled
                    {...field}
                    placeholder="{Add email}"
                    className="placeholder:text-[13px] placeholder:text-[#CCCCCC] placeholder:font-gilroyMedium font-gilroyMedium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 relative">
          <FormLabel className="font-gilroyMedium text-sm">
            Subject<span className="text-red-500">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      ref={inputRef}
                      placeholder="e.g. Onboarding {First Name} {Last Name} on {Team}"
                      className="placeholder:text-[13px] placeholder:text-[#CCCCCC] placeholder:font-gilroyMedium font-gilroyMedium pr-10"
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "{" || (e.shiftKey && e.key === "[")) {
                          e.preventDefault();
                          setDropdownOpen(true);
                        }
                      }}
                    />

                    <IfConditionDialog
                      data={currentNodeData.ifCondition}
                      open={dropdownOpen}
                      onOpenChange={setDropdownOpen}
                      onSelect={(val) => {
                        const current = field.value || "";
                        const updated = `${current} {${val}}`;
                        field.onChange(updated);
                        setDropdownOpen(false);

                        // ✅ Refocus the input after a small delay
                        setTimeout(() => {
                          inputRef.current?.focus();
                        }, 0);
                      }}
                    >
                      <img
                        src="/media/curly-braces.svg"
                        className="absolute top-1/2 -translate-y-1/2 right-3  cursor-pointer"
                        alt="Curly-braces"
                      />
                    </IfConditionDialog>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel className="font-gilroyMedium text-sm">
            CC<span className="text-red-500">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="{Add email}"
                    className="placeholder:text-[13px] placeholder:text-[#CCCCCC] placeholder:font-gilroyMedium font-gilroyMedium"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel className="font-gilroyMedium text-sm">Body</FormLabel>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <div className="rounded-md overflow-hidden border border-[#CCCCCC]">
                  <EmailTextEditor onChange={(text) => field.onChange(text)} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <>
                  <div className="flex flex-wrap gap-4">
                    <div
                      className="flex flex-wrap gap-2 items-center justify-start bg-[#E9F3FF] rounded-md border-dashed min-h-14 w-full border-[1px] px-2 py-2 border-[#52ABFF] cursor-pointer"
                      onClick={() => attachmentFile.current?.click()}
                    >
                      {isUploading ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
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
                        <div className="relative w-full h-14 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 group">
                          <div className="flex items-center justify-center gap-2 py-2">
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                              <HugeiconsIcon icon={FileEmpty02Icon} />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm font-medium text-center">
                                {(() => {
                                  const url = field.value;
                                  if (!url) return "No file selected";

                                  const rawFileName =
                                    url.split("/").pop() || "";
                                  const decodedFileName =
                                    decodeURIComponent(rawFileName);

                                  // Remove initial numbers with optional dash (e.g., "1751885660332-")
                                  const cleanedFileName =
                                    decodedFileName.replace(/^\d+-/, "");

                                  const maxLength = 30;
                                  return cleanedFileName.length > maxLength
                                    ? `${cleanedFileName.substring(
                                        0,
                                        maxLength
                                      )}…`
                                    : cleanedFileName;
                                })()}
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
                        <div className="flex flex-col h-14 justify-center items-center w-full mx-auto">
                          <div className="font-gilroySemiBold text-xs gap-1 flex items-center">
                            <span className="text-[#0EA5E9]">
                              Click to upload
                            </span>
                            <span className="text-[#525252]">
                              or drag and drop
                            </span>
                          </div>
                          <p className="text-[10px] text-[#A3A3A3] font-gilroyRegular">
                            JPG, JPEG, PNG less than 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={attachmentFile}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept="image/jpeg, image/png, image/jpg, application/pdf"
                  />
                </>
              </FormControl>
              <FormMessage className="invisible" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
