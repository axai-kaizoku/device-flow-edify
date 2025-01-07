"use client";

import React, { useRef, useState } from "react";

import { type Device } from "@/server/deviceActions";
import { ChevronRight, Plus, X } from "lucide-react";
import { createIssue } from "@/server/issueActions";
import { notFound, useRouter } from "next/navigation";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { type LoggedInUser } from "./devicesPage";
import { Button } from "@/components/buttons/Button";
import Spinner from "@/components/Spinner";
import { useAlert } from "@/hooks/useAlert";

interface IssueFormProps {
  device: Device;
  user: LoggedInUser;
  closeBtn: (value: boolean) => void;
}

export function IssueForm({ user, device, closeBtn }: IssueFormProps) {
  const router = useRouter();
  const [next, setNext] = useState(0);
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const fileIssueImages = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    images: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    priority: "",
    images: "",
  });

  const validateStepOne = () => {
    const newErrors = {
      title: formData.title ? "" : "Issue type is required",
      description: formData.description ? "" : "Issue description is required",
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return !Object.values(newErrors).some((err) => err);
  };

  const validateStepTwo = () => {
    const newErrors = {
      priority: formData.priority ? "" : "Priority is required",
      // images:
      //   formData.images.length > 0 ? "" : "At least one image is required",
    };

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return !Object.values(newErrors).some((err) => err);
  };

  const handleIssueImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        const isValidSize = file.size <= 1024 * 1024; // 1MB
        const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(
          file.type
        );
        return isValidSize && isValidType;
      });

      const imagePreviews = validFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file), // Generate a preview URL for each file
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imagePreviews],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const severityArray = [
    {
      icon: <Icons.low_issue_icon className="size-10" />,
      title: "Low",
      desc: `Small glitch, doesn't slow us down can wait a bit!`,
    },
    {
      icon: <Icons.medium_issue_icon className="size-10" />,
      title: "Medium",
      desc: `Noticeable issue, but nothing that'll break the flow fix soon!`,
    },
    {
      icon: <Icons.high_issue_icon className="size-10" />,
      title: "Critical",
      desc: `Major issue, needs immediate attention—fix now!`,
    },
  ];

  const handlePriority = (priority: string) => {
    setFormData((prev) => ({
      ...prev,
      priority: priority,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    setErrors({});

    const isStepOneValid = validateStepOne();
    const isStepTwoValid = validateStepTwo();

    if (!isStepOneValid || !isStepTwoValid) {
      return;
    }

    const issue = {
      deviceId: device._id,
      serial_no: device.serial_no,
      priority: formData.priority,
      status: "Open",
      title: formData.title,
      description: formData.description,
      email: user.email,
      userId: user.userId,
    };

    setLoading(true);
    try {
      const res = await createIssue(issue);
      router.refresh();
      closeBtn(false);
    } catch (error) {
      showAlert({
        title: "Error Creating Issue",
        description: "Failed to create an issue. Please try again.",
        isFailure: true,
        key: "create-issue",
      });
    }
    setLoading(false);

    setFormData({
      title: "",
      description: "",
      priority: "",
      images: [],
    });
  };

  return (
    <>
      <div className="flex justify-center items-start w-full h-full">
        <div className="flex flex-col w-[95%] h-[80%] justify-start items-start">
          <div className="flex flex-col gap-5 pb-5 w-full">
            <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
              <div className="bg-black rounded-full  size-12 p-2 flex justify-center items-center">
                <Icons.issue_form_icon />
              </div>
              <span className="font-gilroySemiBold text-2xl">
                Report an issue
              </span>
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="font-gilroySemiBold text-lg text-black">
                {next === 0 ? "Step 0 of 1" : "Step 1 of 1"}
              </div>
              <div className="h-[1px] bg-[#E7E7E7] w-full"></div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-normal h-full"
          >
            {next === 0 ? (
              <>
                <div className="flex w-full justify-start items-center gap-4 mb-10 py-4 px-5 bg-[#F1F1F1] rounded-[20px]">
                  <div className="">
                    <img src="/media/mac-2.png" alt="Asset-1" />
                  </div>
                  <div>
                    <div className="font-gilroySemiBold text-xl">
                      {device?.device_name ?? ""}
                    </div>
                    <div className="text-[#7C7C7C] font-gilroyRegular text-sm">
                      {device?.ram ?? "N/A"}. {device?.storage ?? "N/A"} .{" "}
                      {device?.serial_no ?? "N/A"}
                    </div>
                    <div className="bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-gilroyMedium text-[#027A48] mt-1 max-w-16 w-fit">
                      <div>{device?.device_type ?? "N/A"}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-7 h-full">
                  <div className="flex-1">
                    <FormField
                      label="Raised by"
                      id="raised_by"
                      value={user?.firstName ?? ""}
                      disabled
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between items-center">
                    <div className="w-[48%]">
                      <FormField
                        label="Email"
                        id="email"
                        value={user?.email ?? ""}
                        disabled
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="w-[48%]">
                      <FormField
                        label="Role"
                        id="role"
                        value={`${user?.role ?? "Frontend Developer"}`}
                        disabled
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="z-20 flex-1">
                      <SelectDropdown
                        options={[
                          { label: "Display Issue", value: "Display Issue" },
                          { label: "Battery Issue", value: "Battery Issue" },
                          {
                            label: "Perfomance Issue",
                            value: "Perfomance Issue",
                          },
                          { label: "Other", value: "Other" },
                        ]}
                        onSelect={(data) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: data?.value,
                          }))
                        }
                        label="Issue Type*"
                        value={formData?.title ?? "eg: Low"}
                        className={cn(
                          errors.title
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border"
                        )}
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex-1">
                    <div className="group relative">
                      <Label
                        htmlFor="issue-description"
                        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-gilroyMedium  text-black group-has-[:disabled]:opacity-50"
                      >
                        Issue description*
                      </Label>
                      <Textarea
                        id="issue-description"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        value={formData?.description ?? ""}
                        className={cn(
                          errors.description
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border h-24"
                        )}
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-10">
                  <Button
                    type="button"
                    className="rounded-full w-1/2 text-xl font-gilroySemiBold border border-black"
                    onClick={() => closeBtn(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                    onClick={() => {
                      if (validateStepOne()) {
                        setNext(1);
                      }
                    }}
                  >
                    Next
                    <ChevronRight color="white" />
                  </Button>
                </div>
              </>
            ) : next === 1 ? (
              <div className="w-full h-[80vh] flex flex-col justify-between">
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 ">
                    <label className="font-gilroyMedium mb-1.5 text-black text-base">
                      How sever is the issue?
                    </label>
                    <div className="flex flex-col gap-5">
                      {severityArray.map((v) => (
                        <div
                          key={v.title}
                          className={cn(
                            "flex w-full h-[5.5rem] justify-center items-center rounded-xl pb-1 border ",
                            formData.priority === v.title
                              ? "border-black  border-2"
                              : "border-[#6C6C6C]"
                          )}
                          onClick={() => handlePriority(v.title)}
                        >
                          <div className="w-[20%] justify-center items-center flex">
                            {v.icon ?? ""}
                          </div>
                          <div className="w-[75%] flex flex-col justify-center gap-1">
                            <div className="font-gilroySemiBold text-lg text-black">
                              {v.title ?? ""}
                            </div>
                            <div className="font-gilroyMedium text-[#7C7C7C] text-xs">
                              {v.desc ?? ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.priority && (
                      <p className="text-destructive text-sm">
                        {errors.priority}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-gilroyMedium text-black text-base">
                      Upload Images
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {/* Render uploaded images with a preview */}

                      {/* Add new upload button */}
                      <div
                        className="flex gap-2 items-center justify-start bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 px-2 py-6 border-[#52ABFF] cursor-pointer"
                        onClick={() => fileIssueImages?.current?.click()}
                      >
                        {formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-24 h-20 border-2 border-dashed rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 group"
                          >
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="text-white size-4"/>
                            </button>
                          </div>
                        ))}
                        {formData.images.length === 0 ? (
                          <div className="flex flex-col justify-center items-center w-full mx-auto">
                            <Icons.uploadImage className="text-blue-500 w-6 h-6" />
                            <span className="text-[#0EA5E9]">
                              Click to upload
                            </span>
                            <p className="text-xs text-neutral-400">
                              JPG, JPEG, PNG less than 1MB
                            </p>
                          </div>
                        ) : (
                          <div className="w-24 h-[75px] bg-gray-100 flex justify-center items-center rounded-xl border border-dashed border-gray-600">
                            <div className="bg-gray-400 text-white text-3xl rounded-full flex items-center justify-center w-8 h-8">
                              <Plus className="text-white"/>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={fileIssueImages}
                      style={{ display: "none" }}
                      onChange={handleIssueImages}
                      multiple
                    />
                    {errors.images && (
                      <p className="text-destructive text-sm">
                        {errors.images}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full mt-4">
                  <Button
                    className="rounded-full w-1/2  text-xl font-gilroySemiBold border border-black"
                    onClick={() => setNext(0)}
                  >
                    Previous
                  </Button>
                  <Button
                    className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        Submit
                        <ChevronRight color="white" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

{
  /* <div
                      className="flex flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                      onClick={() => fileIssueImages?.current?.click()}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <Icons.uploadImage className="size-5" />
                        <span className="text-[#0EA5E9]">Click to upload</span>
                        <p className="text-xs text-neutral-400">
                          JPG, JPEG, PNG less than 1MB
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileIssueImages}
                      style={{ display: "none" }}
                      onChange={handleIssueImages}
                      multiple
                    /> */
}
