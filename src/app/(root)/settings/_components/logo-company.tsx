"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";
import { ErrorButton, GreyButton } from "@/components/wind/Buttons";
import { updateOrg } from "@/server/orgActions";
import { Icons } from "@/components/icons";
import NotFound from "@/app/not-found";

// Add open and setOpen props
export const LogoCompanyModal = ({
  id,
  children,
  onLogoUpdate,
}: {
  id: string;
  children: React.ReactNode;
  onLogoUpdate: (newLogo: string | null) => void;
}) => {
  const [image, setImage] = useState<string | File | null>(null); // Track image file
  const [open, setOpen] = useState(false); // Modal open state
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Save the selected file
    }
  };

  // Handle upload logic
  const handleUploadLogo = async () => {
    if (image instanceof File) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        await updateOrg(id, undefined, undefined, formData); // Send the image in the form data
        onLogoUpdate(URL.createObjectURL(image)); // Update the parent with the new logo
        setOpen(false); // Close the modal after successful upload
      } catch (error) {
        <NotFound />;
      }
    }
  };

  // Handle remove logic
  const handleRemoveLogo = async () => {
    try {
      await updateOrg(id, undefined, undefined, ""); // Send empty string to remove logo
      onLogoUpdate(null); // Update the parent to remove the logo
      setOpen(false); // Close the modal after removal
    } catch (error) {
      <NotFound />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New profile picture</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Upload team image</label>
              <div
                className="flex flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                onClick={() => fileInputRef.current?.click()}
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
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <GreyButton onClick={handleRemoveLogo}>Remove</GreyButton>
          <ErrorButton onClick={handleUploadLogo}>Upload</ErrorButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
