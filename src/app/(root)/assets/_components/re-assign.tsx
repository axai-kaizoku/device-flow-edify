"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { SelectInput } from "@/components/dropdown/select-input";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/buttons/Button";
import Spinner from "@/components/Spinner";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Device,
  fetchDevices,
  searchDevices,
  updateDevice,
} from "@/server/deviceActions";
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import AssetsIconWhite from "@/icons/AssetsIconWhite";

type FormData = {
  device: Device | null;
  user: User | null;
};

type FormErrors = {
  device: string;
  user: string;
};

export default function ReAssign({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { openToast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    device: null,
    user: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    device: "",
    user: "",
  });

  useEffect(() => {
    // Reset form data and error messages when the sheet opens/closes
    setFormErrors({ device: "", user: "" });
    setFormData({ device: null, user: null });
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const errors: FormErrors = { device: "", user: "" };

    if (!formData?.device?._id) {
      errors.device = "Device required";
      hasError = true;
    }
    if (!formData?.user?._id) {
      errors.user = "User required";
      hasError = true;
    }
    setFormErrors(errors);
    if (hasError) return;

    setLoading(true);
    try {
      await updateDevice(formData?.device!._id, {
        userId: formData?.user!._id,
      });
      setOpen(false);
      openToast("success", "Assigned asset to user!");
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to assign to user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[97%] gap-6 h-full justify-start items-center">
            <div className="flex flex-col w-full">
              <h1 className="font-gilroySemiBold w-full text-center text-xl">
                Reassign Asset
              </h1>
              <div className="w-full flex flex-col gap-1">
                <div className="h-[1px] bg-[#E7E7E7] w-full my-3"></div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              {/* Device select input */}
              <div className="z-10 pt-3">
                <SelectInput
                  key={"assign-device"}
                  value={formData?.device?.custom_model ?? ""}
                  placeholder="Search by name, serial no, etc"
                  fetchOptions={searchDevices}
                  initialOptions={fetchDevices}
                  onSelect={(data: Device) =>
                    setFormData((prev) => ({
                      ...prev,
                      device: {
                        _id: data?._id,
                        device_name: data?.device_name,
                        custom_model: data?.custom_model,
                        ram: data?.ram,
                        storage: data?.storage,
                        image: data?.image,
                        serial_no: data?.serial_no,
                      },
                    }))
                  }
                  optionValue={{ firstV: "custom_model", secondV: "serial_no" }}
                  label="Device assigned*"
                  className={cn(
                    formErrors.device.length > 0
                      ? "border-destructive/80 border"
                      : ""
                  )}
                />
                {formErrors.device && (
                  <p className="text-destructive text-xs font-gilroySemiBold">
                    {formErrors.device}
                  </p>
                )}
              </div>

              {formData?.device && (
                <div className="w-full bg-[#f5f5f5] rounded-md p-3 flex items-center gap-4">
                  <img
                    src={
                      formData?.device?.image?.[0]?.url ??
                      "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                    }
                    alt="device-image"
                    className="size-16 p-1 object-cover rounded-full"
                  />
                  <div className="w-full flex flex-col justify-center">
                    <h1 className="text-black font-gilroySemiBold text-base">
                      {formData?.device?.custom_model ?? "-"}
                    </h1>
                    <h1 className="text-[#7C7C7C] flex items-center text-sm font-gilroyMedium">
                      {formData?.device?.ram ?? "RAM"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {formData?.device?.storage ?? "Storage"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {formData?.device?.serial_no ?? "Serial number"}
                    </h1>
                  </div>
                </div>
              )}

              {/* User select input */}
              <div className="pt-3 w-full z-0">
                <SelectInput
                  key={"assign-assets-form"}
                  value={formData?.user?.email ?? ""}
                  placeholder="Search by name, email, etc."
                  fetchOptions={searchUsers}
                  initialOptions={fetchUsers}
                  optionValue={{ firstV: "first_name", secondV: "email" }}
                  onSelect={(data: User) =>
                    setFormData((prev) => ({
                      ...prev,
                      user: {
                        email: data?.email,
                        _id: data?._id,
                        designation: data?.designation,
                        first_name: data?.first_name,
                        employment_type: data?.employment_type,
                        image: data?.image,
                      },
                    }))
                  }
                  label="Assigning To*"
                  className={cn(
                    formErrors.user.length > 0
                      ? "border-destructive/80 border"
                      : ""
                  )}
                />
                {formErrors.user && (
                  <p className="text-destructive text-xs font-gilroySemiBold">
                    {formErrors.user}
                  </p>
                )}
              </div>

              {formData?.user && (
                <div className="w-full bg-[#f5f5f5] rounded-md p-3 flex items-center gap-4">
                  <img
                    src={
                      formData?.user?.image && formData?.user.image.length > 0
                        ? formData?.user?.image
                        : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                    }
                    alt="user-image"
                    className="size-16 p-1 object-cover rounded-full"
                  />
                  <div className="w-full flex flex-col justify-center">
                    <h1 className="text-black font-gilroySemiBold text-base">
                      {formData?.user?.first_name ?? "-"}
                    </h1>
                    <h1 className="text-[#7C7C7C] flex items-center text-sm font-gilroyMedium">
                      {formData?.user?.designation ?? "designation"}
                    </h1>
                    <p className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-xs font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                      Active
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 absolute bottom-0 w-full">
                <button
                  className={buttonVariants({
                    variant: "outlineTwo",
                    className: "w-full",
                  })}
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  className={buttonVariants({
                    variant: "primary",
                    className: "w-full",
                  })}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner className="size-4" />
                  ) : (
                    <span> Reassign</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
