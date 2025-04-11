"use client";
import React, { useRef, useState } from "react";
import { checkForDuplicates, parseCSV } from "./CSVHelper";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";
import { Icons } from "@/app/(root)/people/icons";

type dataProps = {
  closeBtn: () => void;
  requiredKeys: string[];
  bulkApi: (formData: any) => Promise<any>;
  sampleData: Record<string, string | number>;
};
function BulkUpload({
  closeBtn,
  requiredKeys,
  bulkApi,
  sampleData,
}: dataProps) {
  const [csvError, setCsvError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showAlert } = useAlert();
  const { openToast } = useToast();

  const validateCSV = (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        if (!csvText)
          throw new Error("The file is empty or not formatted correctly.");

        const { headers, data } = parseCSV(csvText);
        const missingKeys = requiredKeys.filter(
          (key) => !headers.includes(key)
        );
        if (missingKeys.length)
          throw new Error(`Missing fields: ${missingKeys.join(", ")}`);

        const emptyRows = data.filter((row) =>
          requiredKeys.some((key) => !row[key])
        );
        if (emptyRows.length) throw new Error("Some rows are empty");

        const duplicateCheck = checkForDuplicates(data);
        if (duplicateCheck.hasDuplicates)
          throw new Error(
            `Duplicate records found. Row(s): ${duplicateCheck.duplicateRows.join(
              ", "
            )}`
          );

        setCsvError(null);
        handleBulkUpload(file);
      } catch (err: any) {
        setCsvError(err.message || "Error parsing the file.");
      } finally {
        setLoading(false); // Always reset the loading state
      }
    };

    reader.onerror = () => {
      setCsvError("Error reading the file.");
      setLoading(false);
    };

    reader.readAsText(file);

    // Reset file input value after parsing
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset value after file change
    }
  };

  const handleBulkUpload = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      await bulkApi(formData); // Call the API
      showAlert({
        title: "WOHOOO!! 🎉",
        description: "Bulk Upload successfully!",
        isFailure: false,
        key: "create-team-success",
      });

      router.refresh();
      closeBtn();
    } catch (error: any) {
      if (error.message.includes("E11000 duplicate key error")) {
        const match = error.message.match(
          /index: (\w+)_1 dup key: \{ (\w+): "(.*?)"/
        );
        if (match) {
          setCsvError(
            `Duplicate entry detected: ${match[2]} with value "${match[3]}" already exists.`
          );
        } else {
          openToast(
            "error",
            "A duplicate entry error occurred. Please check your data."
          );
        }
      } else {
        openToast("error", "An error occurred during bulk upload.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const downloadSampleCSV = () => {
  //   const csvContent = requiredKeys.join(",");

  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "sample.csv";
  //   link.click();
  // };

  const downloadSampleCSV = () => {
    // Create the header row using required keys
    const csvHeader = requiredKeys.join(",");

    // Create a sample row by mapping keys to provided sample data or default empty values
    const csvRow = requiredKeys.map((key) => sampleData?.[key] || "").join(",");

    // Combine header and sample data rows
    const csvContent = `${csvHeader}\n${csvRow}`;

    // Create and trigger the download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample.csv";
    link.click();
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <img
              src="/media/bulk_Loader.gif"
              alt="Loading..."
              className="w-16 h-16"
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="font-gilroyMedium text-base text-black">
              Bulk Import
            </div>

            <div className="rounded-lg p-3  flex justify-between items-center border border-gray-200">
              <div className="flex gap-2">
                <Icons.file_csv />
                <div className="flex flex-col ">
                  <h1 className="text-base font-gilroySemiBold">Upload CSV</h1>
                  <p
                    className="text-[#007aff] text-xs cursor-pointer font-gilroyMedium hover:underline"
                    onClick={downloadSampleCSV}
                  >
                    Download sample CSV
                  </p>
                </div>
              </div>

              <button
                disabled={loading}
                className={` bg-black rounded-md text-white font-gilroyMedium  text-sm py-2 px-5 hover:bg-gray-800 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleFileUploadClick}
              >
                Upload
              </button>
            </div>

            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  validateCSV(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </div>
        )}

        {csvError && (
          <p className="text-red-500 text-xs font-gilroyMedium transition-all duration-300 mb-4">
            {csvError}
          </p>
        )}
      </div>
    </>
  );
}

export default BulkUpload;
