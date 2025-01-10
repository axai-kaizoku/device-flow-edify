// advanceDeviceDetails.tsx

import { Icon } from "@/components/wind/Icons";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AdvanceDeviceDetails as AdvanceDeviceDetailsInterface,
  FormErrors,
} from "./_components/types";

interface AdvanceDeviceDetailsProps {
  data: AdvanceDeviceDetailsInterface;
  setData: (data: Partial<AdvanceDeviceDetailsInterface>) => void;
  errors?: FormErrors;
}

const AdvanceDeviceDetails: React.FC<AdvanceDeviceDetailsProps> = ({
  data,
  setData,
  errors,
}) => {
  const [formData, setFormData] = useState<AdvanceDeviceDetailsInterface>(data);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle clicking on the upload area
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  // Handle input changes for text and date fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        invoiceFile: file,
      }));
      setData({
        ...formData,
        invoiceFile: file,
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-gilroyBold py-5">Device Details</h1>

      {/* Serial Number Input */}
      <div className="mb-6">
        <label className="block text-lg font-gilroyMedium mb-2">
          Serial Number
        </label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="EDIFY-1234"
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
        />
        {errors?.serialNumber && (
          <p className="text-red-500 text-sm">{errors.serialNumber}</p>
        )}
        <p className="text-sm text-gray-500 py-2">
          Need help finding the serial number?{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Click here
          </Link>
        </p>
      </div>

      {/* Device Invoice and File Input */}
      <div className="mb-6">
        <h2 className="text-lg text-gray-600 font-gilroyMedium mb-3">
          Device Invoice
        </h2>

        {/* Clickable Upload Section */}
        <div
          className="flex px-4 py-6 items-center gap-2 justify-between mb-4 bg-[#dddbdb] rounded cursor-pointer"
          onClick={handleFileUploadClick}
        >
          <div className="flex justify-center items-center gap-3">
            <Icon type="OutlinedUpload" color="black" size="lg" />
            <div className="flex flex-col">
              <h1>Upload Documents</h1>
              <p className="text-xs">
                Click here to upload any image or documents
              </p>
            </div>
          </div>
          <h1 className="py-4 px-6 bg-black text-white rounded duration-300 hover:opacity-95">
            Select files
          </h1>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          name="invoiceFile"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {errors?.invoiceFile && (
          <p className="text-red-500 text-sm">{errors.invoiceFile}</p>
        )}

        {/* Date Inputs for Purchase and Warranty */}
        <div className="flex flex-wrap gap-6 py-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Device Purchase Date</p>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="py-3 px-4 border border-gray-300 rounded-lg w-80 focus:outline-none"
            />
            {errors?.purchaseDate && (
              <p className="text-red-500 text-sm">{errors.purchaseDate}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Warranty Expiry Date</p>
            <input
              type="date"
              name="warrantyExpiryDate"
              value={formData.warrantyExpiryDate}
              onChange={handleChange}
              className="w-80 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none"
            />
            {errors?.warrantyExpiryDate && (
              <p className="text-red-500 text-sm">
                {errors.warrantyExpiryDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceDeviceDetails;
