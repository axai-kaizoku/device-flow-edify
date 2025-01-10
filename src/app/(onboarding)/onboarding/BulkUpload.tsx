"use client";
import { bulkUploadDevices } from "@/server/deviceActions";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";
import { checkForDuplicates, parseCSV } from "@/components/bulk-upload/CSVHelper";
import { Button } from "@/components/buttons/Button";
type dataProps = {
  closeBtn: () => void;
  requiredKeys: string[];
  bulkApi: (formData: any) => Promise<any>;
};
function BulkUpload({ closeBtn, requiredKeys, bulkApi }: dataProps) {
  const [csvError, setCsvError] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showAlert } = useAlert();
  const { openToast } = useToast();

  const validateCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      if (!csvText) {
        setCsvError("The file is empty or not formatted correctly.");
        return;
      }

      try {
        const { headers, data } = parseCSV(csvText);

        if (headers.length !== requiredKeys.length) {
          setCsvError(
            `Invalid number of fields. Expected ${requiredKeys.length} fields but got ${headers.length}.`
          );
          return;
        }

        const missingKeys = requiredKeys.filter(
          (key) => !headers.includes(key)
        );
        if (missingKeys.length > 0) {
          setCsvError(`Missing fields: ${missingKeys.join(", ")}`);
          return;
        }

        // Check for empty values in required fields
        const emptyRows = data.filter((row) => {
          return requiredKeys.some((key) => !row[key]);
        });

        if (emptyRows.length > 0) {
          setCsvError(`Some rows are empty`);
          return;
        }

        const duplicateCheck = checkForDuplicates(data);
        if (duplicateCheck.hasDuplicates) {
          setCsvError(
            `Duplicate records found. Row(s): ${duplicateCheck.duplicateRows.join(
              ", "
            )}`
          );
          return;
        }

        // Clear errors and proceed with uploading
        setCsvError(null);
        handleBulkUpload(file);
      } catch (err) {
        setCsvError("Error parsing the file. Please ensure it is a valid CSV.");
      }
    };

    reader.onerror = () => {
      setCsvError("Error reading the file.");
    };

    reader.readAsText(file);

    // Reset file input value after parsing
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset value after file change
    }
  };

  const handleBulkUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await bulkApi(formData); // Call the API
      showAlert({
        title: "WOHOOO!! 🎉",
        description: "Bulk Upload successfully !",
        isFailure: false,
        key: "create-team-success",
      });
      router.refresh();
      closeBtn();
    } catch (error: any) {
      if (error.message.includes("E11000 duplicate key error")) {
        const duplicateField = error.message.match(/index: (\w+)_1 dup key: \{ (\w+): "(.*?)"/);
        if (duplicateField && duplicateField[3]) {
          // openToast(
          //   "error",
          //   `Duplicate entry detected: ${duplicateField[1]} with value "${duplicateField[3]}" already exists.`
          // );

          setCsvError(`Duplicate entry detected: ${duplicateField[1]} with value "${duplicateField[3]}" already exists.`);
        } else {
          openToast("error", "A duplicate entry error occurred. Please check your data.");
        }
      } else {
        // Generic error handling
        openToast("error", `${"An error occurred during bulk upload."}`);
      }
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger hidden file input click
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = requiredKeys.join(",");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample.csv";
    link.click();
  };
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between gap-4">
          <Button
              className="rounded-[9px] font-gilroySemiBold text-[16px] w-[50%] h-[54px] bg-primary text-primary-foreground"
              type="button"
              onClick={handleFileUploadClick}
            >
              Bulk Upload
            </Button>

            <Button
              className="rounded-[9px] font-gilroySemiBold text-[16px] w-[50%] h-[54px]  "
              style={{
                backgroundColor: "#EDEDED",
              }}
              onClick={downloadSampleCSV}
            >
              Sample csv
            </Button>
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
