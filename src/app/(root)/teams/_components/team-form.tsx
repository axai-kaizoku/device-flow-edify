"use client";

import { Button, LoadingButton } from "@/components/buttons/Button";
import { SelectInput } from "@/components/dropdown/select-input";
import { GetAvatar } from "@/components/get-avatar";
import { Input } from "@/components/inputs/Input";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import { AsyncSelect } from "@/components/ui/async-select";
import { useAlert } from "@/hooks/useAlert";
import UploadImageIcon from "@/icons/UploadImageIcon";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/components/utils/upload";
import { createTeam, updateTeam } from "@/server/teamActions";
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const TeamForm = ({
  closeBtn,
  isBack = false,
  isEditForm,
  id,
  setBack,
  title,
  description,
  image,
  manager,
}: {
  closeBtn: (value: boolean) => void;
  manager?: string;
  isBack?: boolean;
  setBack?: () => void;
  isEditForm?: boolean;
  id?: string;
  title?: string;
  description?: string;
  image?: string;
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ email: manager?.email });

  const { showAlert } = useAlert();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const queryClient = useQueryClient();

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
    user: manager?._id || "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    user: "",
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    // Manual validation
    const newErrors = {
      title: formData.title ? "" : "Team name is required",
      description: formData.description ? "" : "Department is required",
      // image: formData.image ? "" : "Team image is required",
      image: "",
      user: user?._id || manager?._id ? "" : "Reporting manager is required",
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
          userId: user?._id,
        });

        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: ["teams"],
          exact: false,
          type: "all",
          refetchType: "all",
        });
        toast.success("Team updated successfully !");
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
          formData?.image,
          user?._id
        );
        showAlert({
          title: "WOHOOO!! 🎉",
          description: "Team created successfully !",
          isFailure: false,
          key: "create-team-success",
        });
        setLoading(false);
        setBack && setBack();
        closeBtn(false);
        queryClient.invalidateQueries({
          queryKey: ["teams"],
          exact: false,
          type: "all",
          refetchType: "all",
        });
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
          toast.error("Image upload failed");
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
      <div className="flex justify-center items-center gap-6 w-full h-full overflow-y-auto ">
        <div className="flex flex-col h-full w-full justify-start items-start gap-6">
          <h3 className="text-lg font-gilroyMedium w-full text-center">
            {isEditForm ? "Edit Team" : "Create new team"}
          </h3>
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
                className="absolute start-4 top-0 z-10 block -translate-y-1/2 bg-background px-1 text-sm font-gilroyMedium text-foreground"
              >
                Team Name
              </label>
              <Input
                id="team-name"
                className={cn(
                  errors.title
                    ? "border-destructive/80 font-gilroyMedium  focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-10"
                    : "h-10"
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
                className="absolute start-4 top-0 z-10 block -translate-y-1/2 bg-background px-1 text-sm font-gilroyMedium text-foreground"
              >
                Department
              </label>
              <Input
                id="team-department"
                className={cn(
                  errors.description
                    ? "border-destructive/80  focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-10"
                    : "h-10"
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

            {/* <div className="z-0 pt-3">
              <SelectInput
                optionValue={{ firstV: "first_name", secondV: "email" }}
                key={"add-team-member-user-field"}
                value={user?.first_name ?? manager?.first_name ?? ""}
                placeholder="Search by name, email, etc"
                // @ts-ignore
                fetchOptions={searchUsers}
                // @ts-ignore
                initialOptions={fetchUsers}
                onSelect={(data: any) => {
                  setUser({
                    _id: data._id,
                    first_name: data.first_name,
                    email: data.email,
                    employment_type: data.employment_type,
                    designation: data.designation,
                  });
                }}
                label="Add Manager*"
                className={cn(
                  !user?._id || !manager?._id
                    ? ""
                    : "border-destructive/80 border"
                )}
              />
              {errors.user && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.user}
                </p>
              )}
            </div> */}
            <div className="w-full pt-3">
              <AsyncSelect<User>
                fetcher={fetchUsers}
                preload
                renderOption={(user) => (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <div className="font-gilroyMedium">
                        {user?.first_name}
                      </div>
                      <div className="text-xs font-gilroyRegular text-muted-foreground">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                )}
                filterFn={(user, query) =>
                  user?.first_name
                    ?.toLowerCase()
                    ?.includes(query?.toLowerCase()) ||
                  user?.email?.toLowerCase()?.includes(query?.toLowerCase())
                }
                getOptionValue={(user) => user?.email}
                getDisplayValue={() => (
                  <div className="flex items-center gap-2 text-left w-full">
                    <div className="flex flex-col leading-tight">
                      <div className="font-gilroyMedium">
                        {user?.email ?? manager?.email ?? ""}
                      </div>
                    </div>
                  </div>
                )}
                notFound={
                  <div className="py-6 text-center font-gilroyMedium text-sm">
                    No users found
                  </div>
                }
                label="User"
                placeholder="Choose a Manager.."
                value={user?.email || "null"}
                onChange={(selected: User | null) => {
                  setUser({
                    _id: selected?._id,
                    first_name: selected?.first_name,
                    email: selected?.email,
                    employment_type: selected?.employment_type,
                    designation: selected?.designation,
                  });
                }}
                width="100%"
                triggerClassName="border border-black "
              />
            </div>

            {user?.first_name ? (
              <div className=" w-full bg-[#f5f5f5]  rounded-md p-2.5 flex items-center gap-4 ">
                {user?.image && user?.image?.length > 0 ? (
                  <img
                    src={user?.image}
                    alt={user?.first_name}
                    className="size-14 object-cover rounded-full flex-shrink-0"
                  />
                ) : (
                  <GetAvatar name={user?.first_name ?? ""} size={56} />
                )}
                <div className=" w-full flex flex-col justify-center ">
                  <h1 className="text-black font-gilroySemiBold text-base ">
                    {user?.first_name ?? ""}
                  </h1>
                  <h1 className="text-[#7C7C7C] font-gilroyMedium text-sm ">
                    {user?.email ?? ""}
                  </h1>

                  <h1 className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                    {user?.employment_type ?? ""}
                    <span className="flex text-2xl mx-1 -mt-3"> </span>
                    {user?.designation ?? ""}
                  </h1>
                </div>
              </div>
            ) : null}

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
                  <span className="text-sm text-blue-500 font-gilroySemiBold">
                    {progress}%
                  </span>
                </div>
              ) : formData.image ? (
                <div className="bg-[#E9F3FF] rounded-md border-dashed  border p-3 border-[#52ABFF]">
                  <div className="relative rounded-md size-12 overflow-hidden group">
                    <img
                      src={formData.image}
                      alt={formData.image}
                      className="w-full h-full  object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-[25%] left-[28%]  bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleRemoveImage}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex cursor-pointer flex-col items-center justify-center bg-[#E9F3FF] rounded-md border-dashed h-20 w-full border p-3 border-[#52ABFF]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col justify-center items-center">
                    <UploadImageIcon className="size-5" />
                    <div className="flex gap-1 font-gilroySemiBold">
                      {" "}
                      <span className="text-[#0EA5E9] text-[10px]">
                        Click to upload
                      </span>
                      <span className="text-[10px]">or drag and drop</span>
                    </div>
                    <p className="text-xs font-gilroyMedium text-neutral-400 text-[9px]">
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
                className="w-1/2"
                variant="outlineTwo"
                onClick={() => {
                  setBack ? setBack() : closeBtn(false);
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                loading={loading}
                variant="primary"
                className="w-1/2"
                type="submit"
              >
                {isEditForm ? "Save" : "Submit"}
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
