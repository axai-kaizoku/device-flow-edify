"use client";

import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/inputs/Input";
import { cn } from "@/lib/utils";
import { createTeam, updateTeam } from "@/server/teamActions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner, { spinnerVariants } from "@/components/Spinner";

const DEPARTMENT_OPTIONS = [
  "Backend",
  "Frontend",
  "Quality Control",
  "Design",
  "Amazon Logistics",
  "Procurement",
  "HR",
  "Finance",
  "Management",
  "House Keeping",
  "Founder's Office",
  "Technology",
  "Tech",
  "Others",
];

export const TeamForm = ({
  closeBtn,
  isEditForm,
  id,
  title,
  description,
  image,
}: {
  closeBtn: (value: boolean) => void;
  isEditForm?: boolean;
  id?: string;
  title?: string;
  description?: string;
  image?: string;
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

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
      description: formData.description ? "" : "Team Label is required",
      image: formData.image ? "" : "Team image is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    if (isEditForm) {
      setLoading(true);
      await updateTeam(id!, {
        title: formData.title,
        description: formData.description,
        image: formData.image,
      });
      setLoading(false);
    } else {
      setLoading(true);
      await createTeam(formData.title, formData.description, formData.image);
      setLoading(false);
    }

    router.refresh();
    closeBtn(false);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
    }
  };

  // Handle department selection
  const handleDepartmentSelect = (department: string) => {
    setFormData((prev) => ({ ...prev, description: department }));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[98%] h-[80%] justify-start items-start">
        <Icons.teamMemberIcon className="size-10 border my-3 bg-black rounded-full" />
        <h3 className="text-3xl font-semibold mb-2">
          {isEditForm ? "Edit Team" : "Let's work together"}
        </h3>
        <p className="text-slate-500 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-8"
        >
          <div className="group relative">
            <label
              htmlFor="team-name"
              className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-medium text-foreground"
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
              <p className="mt-2 text-sm text-destructive">{errors.title}</p>
            )}
          </div>

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
            {errors.image && (
              <p className="text-destructive text-sm">{errors.image}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-medium my-1">Choose Department</label>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {DEPARTMENT_OPTIONS.map((preLabel) => (
                <button
                  key={preLabel}
                  type="button"
                  className={cn(
                    "w-fit h-fit flex px-3.5 text-secondary py-2.5 border border-secondary items-center justify-center text-base rounded-full",
                    formData.description === preLabel
                      ? "border-white bg-primary text-white"
                      : "hover:border-black hover:text-black"
                  )}
                  onClick={() => handleDepartmentSelect(preLabel)}
                >
                  {preLabel}
                </button>
              ))}
            </div>
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description}</p>
            )}
          </div>

          <div className="flex space-x-3 w-full pt-2 justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full w-1/2"
              onClick={() => closeBtn(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full border w-1/2 bg-primary text-primary-foreground"
              disabled={loading}
            >
              {loading ? (
                <Spinner className={spinnerVariants({ size: "sm" })} />
              ) : isEditForm ? (
                <>
                  Edit Team <Icons.arrowRight className="size-5" />
                </>
              ) : (
                <>
                  Submit
                  <Icons.arrowRight className="size-5" />
                </>
              )}
              {/* {isEditForm ? "Edit Team" : "Submit"}{" "} */}
              {/* <Spinner className={spinnerVariants({ size: "sm" })} /> */}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
