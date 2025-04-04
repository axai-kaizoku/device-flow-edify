"use client";

import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/inputs/Input";
import { cn } from "@/lib/utils";
import { createTeam, updateTeam } from "@/server/teamActions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import { getImageUrl } from "@/server/orgActions";
import { useToast } from "@/hooks/useToast";
import { useAlert } from "@/hooks/useAlert";
import { ChevronRight, X } from "lucide-react";

export const TeamForm = ({
  closeBtn,
  isEditForm,
  id,
  title,
  description,
  image,
  onRefresh,
}: {
  closeBtn: (value: boolean) => void;
  isEditForm?: boolean;
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  onRefresh: () => Promise<void>;
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
  const { showAlert } = useAlert();
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

  // Local state for form data
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    image: image || "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    // Manual validation
    const newErrors = {
      title: formData.title ? "" : "Team name is required",
      description: formData.description ? "" : "Department is required",
      // image: formData.image ? "" : "Team image is required",
      image: "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    if (isEditForm) {
      setLoading(true);
      try {
        // @ts-ignore
        await updateTeam(id!, {
          title: formData.title!,
          description: formData.description!,
          image: formData.image!,
        });

        setLoading(false);
        openToast("success", "Team updated successfully !");
        onRefresh();
        // router.refresh();
        closeBtn(false);
      } catch (error: any) {
        closeBtn(false);
        showAlert({
          title: "Can't update team",
          description: "Error updating team !",
          isFailure: true,
          key: "update-team-failure",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await createTeam(
          formData?.title,
          formData?.description,
          formData?.image
        );
        showAlert({
          title: "WOHOOO!! 🎉",
          description: "Team created successfully !",
          isFailure: false,
          key: "create-team-success",
        });
        setLoading(false);
        onRefresh();
        closeBtn(false);
      } catch (error: any) {
        closeBtn(false);
        showAlert({
          title: "Can't create team",
          description: "Error creating team !",
          isFailure: true,
          key: "create-team-failure",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isValidSize = file.size <= 1024 * 1024; // 1MB
      const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(
        file.type
      );

      if (isValidSize && isValidType) {
        setIsUploading(true);
        simulateProgress();
        try {
          const res = await getImageUrl({ file });
          setFormData((prev) => ({
            ...prev,
            image: res.fileUrl, // Ensure `res.url` contains the S3 URL.
          }));

          setErrors((prev) => ({
            ...prev,
            image: "",
          }));
        } catch (error) {
          openToast("error", "Image upload failed");
          setErrors((prev) => ({
            ...prev,
            image: "Failed to upload the image. Please try again.",
          }));
        } finally {
          setIsUploading(false); // Stop showing the progress bar
          setProgress(0);
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPG, JPEG, or PNG files under 1MB are allowed.",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        image:
          "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png",
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleDepartmentSelect = (department: string) => {
    setFormData((prev) => ({ ...prev, description: department }));
  };

  return (
    <>
      <div className="flex justify-center items-center gap-6 w-full h-full overflow-y-auto">
        <div className="flex flex-col h-full w-full justify-start items-start gap-6">
          <div className="flex items-center  justify-center gap-4 ">
            <Icons.teamMemberIcon className="size-10 border  bg-black rounded-full" />
            <h3 className="text-xl font-gilroySemiBold">
              {isEditForm ? "Edit Team" : "Create new team"}
            </h3>
          </div>
          <div className="h-[1px] bg-[#E7E7E7] w-full mb-2"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col w-full gap-6"
          >
            <div className="group relative">
              <label
                htmlFor="team-name"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-gilroyMedium text-foreground"
              >
                Team Name
              </label>
              <Input
                id="team-name"
                className={cn(
                  errors.title
                    ? "border-destructive/80  focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
                    : "h-12"
                )}
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="eg: Alpha, Gamma"
                type="text"
              />
              {errors.title && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="group relative mt-2">
              <label
                htmlFor="team-department"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-gilroyMedium text-foreground"
              >
                Department
              </label>
              <Input
                id="team-department"
                className={cn(
                  errors.description
                    ? "border-destructive/80  focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
                    : "h-12"
                )}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="eg: Tech"
                type="text"
              />
              {errors.description && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-gilroyMedium">Upload team image</label>
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
              ) : formData.image ? (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden group">
                  <img
                    src={formData.image}
                    alt={formData.image}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-4 h-4" />
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
              {errors.image && (
                <p className="text-destructive text-xs font-gilroyMedium ">
                  {errors.image}
                </p>
              )}
            </div>

            <div className="flex w-[93%] gap-3 absolute bottom-6 pt-2 justify-between items-center">
              <Button
                type="button"
                variant="outline"
                className="rounded-full text-base flex-1 font-gilroySemiBold border border-black"
                onClick={() => closeBtn(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full flex-1 text-base font-gilroySemiBold bg-black text-white "
                disabled={loading}
              >
                {loading ? (
                  <Spinner className={spinnerVariants({ size: "sm" })} />
                ) : isEditForm ? (
                  <>
                    Edit Team <ChevronRight className="size-6" />
                  </>
                ) : (
                  <>
                    Submit <ChevronRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};









