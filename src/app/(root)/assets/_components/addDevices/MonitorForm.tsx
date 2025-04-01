"use client";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import React, { useRef, useState } from "react";
import { FormErrors, KeyboardDetailsInterface } from "./_components/types";
import { Icons } from "@/components/icons";
import { X } from "lucide-react";
import { getImageUrl } from "@/server/orgActions";
import { useToast } from "@/hooks/useToast";

interface KeyboardDetailsProps {
  data: KeyboardDetailsInterface;
  setData: (data: Partial<KeyboardDetailsInterface>) => void;
  errors: FormErrors;
}

const MonitorForm: React.FC<KeyboardDetailsProps> = ({
  data,
  setData,
  errors,
}) => {
  const [formData, setFormData] = useState<KeyboardDetailsInterface>(data);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [displayFile, setDisplayFile] = useState("");
  const { openToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
    }, 100); // Simulates progress every 100ms
  };

  // Handle input changes for text and date fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidSize = file.size <= 1024 * 1024 * 5; // Max 5MB size
      const isValidType = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ].includes(file.type);

      if (isValidSize && isValidType) {
        setIsUploading(true);
        simulateProgress();
        try {
          const res = await getImageUrl({ file });
          setDisplayFile(URL.createObjectURL(file));
          setInvoiceFile(res?.fileUrl);
        } catch (error) {
          openToast("error", "Some Error while uploading the File");
        } finally {
          setIsUploading(false); // Stop showing the progress bar
          setProgress(0);
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          invoiceFile: "Only PDF files under 5MB are allowed.",
        }));
      }
    }
  };

  const handleRemoveFile = () => {
    setDisplayFile("");
    setInvoiceFile(null);
  };

  // const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <div className="w-full">
      <div className="font-gilroySemiBold 2xl:text-2xl text-[22px]">
        Monitor Details
      </div>

      <div className="flex flex-col gap-8 mt-5">
        <FormField
          label="Model Name"
          id="model"
          name="model"
          type="text"
          value={formData?.model}
          onChange={handleChange}
          error={errors?.model}
          placeholder="eg: Mouse, etc"
        />

        <FormField
          label="Brand"
          id="brand"
          name="brand"
          type="text"
          value={formData?.brand}
          onChange={handleChange}
          error={errors?.brand}
          placeholder="eg: Brand..., etc"
        />

        <div className="flex flex-col gap-2">
          <FormField
            label="Serial Number"
            id="serialNumber"
            name="serialNumber"
            type="text"
            value={formData?.serialNumber}
            onChange={handleChange}
            error={errors?.serialNumber}
            placeholder="eg: EDIFYXXXX, etc"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-5">
        <label className="font-gilroyMedium text-black text-base">
          Upload device invoice
        </label>
        {isUploading ? (
          <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <div className="w-3/4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-black rounded-full"
                style={{
                  width: `${progress}%`,
                  transition: "width 0.1s linear",
                }}
              ></div>
            </div>
            <span className="text-sm text-black">{progress}%</span>
          </div>
        ) : invoiceFile ? (
          <div className="relative w-20 h-20 bg-[#F5F5F5] rounded-xl p-1">
            <iframe
              src={displayFile}
              width="100%"
              height="100%"
              title="Invoice Preview"
              className="object-cover"
              onLoad={(e) => {
                const iframe = e.currentTarget;
                // Ensure it's viewable content
                if (
                  !iframe.contentDocument ||
                  iframe.contentDocument.title === ""
                ) {
                  // openToast(
                  //   "error",
                  //   "File preview failed. It may not be viewable."
                  // );
                }
              }}
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={handleRemoveFile}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className="flex cursor-pointer flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
            onClick={() => fileRef?.current?.click()}
          >
            <div className="flex flex-col justify-center items-center">
              <Icons.uploadImage className="size-5" />
              <span className="text-[#0EA5E9]">Click to upload</span>
              <p className="text-xs text-neutral-400">
                PDF/JPEG/PNG/JPG under 5MB
              </p>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {errors.invoiceFile && (
          <p className="text-destructive text-xs font-gilroyMedium">
            {errors?.invoiceFile}
          </p>
        )}
      </div>

      <div className="flex w-full flex-wrap items-center gap-4 mt-8">
        <div className="flex-1">
          <FormField
            label="Purchase Date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData?.purchaseDate}
            type="date"
            onChange={handleChange}
            error={errors?.purchaseDate}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="flex-1">
          <FormField
            label="Warranty Period"
            id="warrantyExpiryDate"
            name="warrantyExpiryDate"
            value={formData?.warrantyExpiryDate}
            type="date"
            onChange={handleChange}
            error={errors?.warrantyExpiryDate}
            placeholder="Select your birthdate"
          />
        </div>
      </div>
    </div>
  );
};

export default MonitorForm;
