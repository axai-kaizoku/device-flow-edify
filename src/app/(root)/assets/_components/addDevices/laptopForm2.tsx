"use client";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import React, { useRef, useState } from "react";
import { DevicePage2, FormErrors } from "./_components/types";
import { Icons } from "@/components/icons";

interface KeyboardDetailsProps {
  data: DevicePage2;
  setData: (data: Partial<DevicePage2>) => void;
  errors: FormErrors;
}

const LaptopForm2: React.FC<KeyboardDetailsProps> = ({
  data,
  setData,
  errors,
}) => {
  const [formData, setFormData] = useState<DevicePage2>(data);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file?.name }));
    }
  };

  // const [errors, setErrors] = useState<Record<string, string>>({});
  return (
    <div className="w-full flex flex-col justify-start">
      <div className="font-gilroySemiBold 2xl:text-2xl text-[22px] mb-2">
        Laptop Details
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <div className="flex flex-col gap-1">
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

          <div className="font-gilroyMedium text-sm text-[#8B8B8B]">
            Need help finding serial Number?{" "}
            <span className="text-[#005DFF] underline cursor-pointer">
              Click here
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-7">
        <label className="font-gilroyMedium text-black text-base">
          Upload device invoice
        </label>
        <div
          className="flex flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
          onClick={() => fileInputRef?.current?.click()}
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
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {errors.invoiceFile && (
          <p className="text-destructive text-sm">{errors?.invoiceFile}</p>
        )}
      </div>

      <div className="flex w-full flex-wrap items-center gap-4 mt-12">
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

      <form className="flex items-center gap-2 my-5">
        <input
          type="checkbox"
          id="chargerProvided"
          className="h-4 w-4 rounded-[49px]"
        />
        <label
          for="chargerProvided"
          className="text-base font-gilroyMedium text-black"
        >
          Charger provided with the device?
        </label>
      </form>
    </div>
  );
};

export default LaptopForm2;
