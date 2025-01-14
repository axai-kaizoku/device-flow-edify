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
import { getImageUrl, updateOrg } from "@/server/orgActions";
import { Icons } from "@/components/icons";
import NotFound from "@/app/not-found";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";

// Add open and setOpen props
export const LogoCompanyModal = ({
  id,
  logo,
  children,
}: {
  id: string;
  logo: string | null;
  children: React.ReactNode;
}) => {
  const [image, setImage] = useState<string | null>(logo); // Track image file
  const [open, setOpen] = useState(false); // Modal open state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {openToast} = useToast();
  const router = useRouter();

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidSize = file.size <= 1024 * 1024; // 1MB
      const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
  
      if (isValidSize && isValidType) {
        try {
          const res = await getImageUrl({ file });
          setImage(res.fileUrl);
        } catch (error) {
          openToast("error","Image upload failed");
        }
      } else{
        openToast("error","Image Size too large");
      }
  
  };}

  // Handle upload logic
  const handleUploadLogo = async () => {
      try {
        await updateOrg({id:id,logo: image}); // Send the image in the form data
        setOpen(false); // Close the modal after successful upload
        router.refresh();
      } catch (error) {
        openToast("error","Image upload failed");
      }
    }
  

  // Handle remove logic
  const handleRemoveLogo = async () => {
    try {
      await updateOrg({id:id, logo:""}); // Send empty string to remove logo
      setOpen(false); // Close the modal after removal
      router.refresh();
      setImage('');
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
              <label className="font-gilroyMedium">Upload Organization Image</label>

              {image ? (
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden group">
                    <img
                      src={image}
                      alt={image}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleRemoveLogo}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
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
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />


              {/* <div
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
              /> */}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ErrorButton onClick={handleUploadLogo} disabled={image===''}>Upload</ErrorButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
