"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { SelectInput } from "@/components/dropdown/select-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Button,
  buttonVariants,
  LoadingButton,
} from "@/components/buttons/Button";
import { Device, fetchDevices, updateDevice } from "@/server/deviceActions";
import { fetchUsers, User } from "@/server/userActions";
import AssetsIconWhite from "@/icons/AssetsIconWhite";
import { AsyncSelect } from "@/components/ui/async-select";
import { GetAvatar } from "@/components/get-avatar";

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
      toast.success("Assigned asset to user!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to assign to user!");
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
              <div className="flex flex-col gap-2 pt-3">
                <AsyncSelect<Device>
                  fetcher={fetchDevices}
                  preload
                  // fixInputClear={false}
                  renderOption={(device) => (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <div className="font-gilroyMedium">
                          {device?.custom_model}
                        </div>
                        <div className="text-xs font-gilroyRegular text-muted-foreground">
                          {device?.device_name}
                        </div>
                      </div>
                    </div>
                  )}
                  filterFn={(device, query) =>
                    device?.custom_model
                      ?.toLowerCase()
                      ?.includes(query?.toLowerCase()) ||
                    device?.device_name
                      ?.toLowerCase()
                      ?.includes(query?.toLowerCase())
                  }
                  getOptionValue={(device) => device?.custom_model}
                  getDisplayValue={() => (
                    <div className="flex items-center gap-2 text-left w-full">
                      <div className="flex flex-col leading-tight">
                        <div className="font-gilroyMedium">
                          {formData?.device?.custom_model ?? ""}
                        </div>
                      </div>
                    </div>
                  )}
                  notFound={
                    <div className="py-6 text-center font-gilroyMedium text-sm">
                      No devices found
                    </div>
                  }
                  label="Device"
                  placeholder="Assign Device"
                  value={formData?.device?.custom_model || "null"}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      device: {
                        _id: selected?._id,
                        device_name: selected?.device_name,
                        custom_model: selected?.custom_model,
                        ram: selected?.ram,
                        storage: selected?.storage,
                        image: selected?.image,
                        serial_no: selected?.serial_no,
                      },
                    }))
                  }
                  width="100%"
                />
                {formErrors?.device?.length > 0 && (
                  <p className="text-destructive/80 text-xs ml-1 font-gilroyMedium">
                    {formErrors?.device}
                  </p>
                )}
              </div>

              {formData?.device?.custom_model && (
                <div className=" w-full bg-[#f5f5f5]  rounded-lg p-3 flex items-center gap-4 ">
                  {/* <img
                    src={
                      formData?.device?.image?.[0]?.url ??
                      "https://static.vecteezy.com/system/resources/thumbnails/012/807/215/small/silhouette-of-the-laptop-for-sign-icon-symbol-apps-website-pictogram-logo-art-illustration-or-graphic-design-element-format-png.png"
                    }
                    alt="team-image"
                    className="w-16 h-16 p-1 border object-contain rounded-full "
                  /> */}
                  <GetAvatar
                    name={formData?.device?.custom_model}
                    isDeviceAvatar
                    size={64}
                  />
                  <div className="w-full flex flex-col justify-center ">
                    <h1 className="text-black font-gilroySemiBold text-xl">
                      {formData?.device?.custom_model ?? "Device"}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-base  font-gilroyMedium">
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
              {/* <div className="pt-3 w-full z-0">
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
              </div> */}

              <div className="flex flex-col gap-2 pt-3">
                <AsyncSelect<User>
                  fetcher={fetchUsers}
                  preload
                  fixInputClear={false}
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
                          {formData?.user?.email ?? ""}
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
                  placeholder="Assigning To"
                  value={formData?.user?.email || "null"}
                  onChange={(selected: User | null) =>
                    // setUser({
                    //   _id: selected?._id,
                    //   first_name: selected?.first_name,
                    //   email: selected?.email,
                    //   employment_type: selected?.employment_type,
                    //   designation: selected?.designation,
                    // })
                    setFormData((prev) => ({
                      ...prev,
                      user: {
                        email: selected?.email,
                        _id: selected?._id,
                        designation: selected?.designation,
                        first_name: selected?.first_name,
                        employment_type: selected?.employment_type,
                        image: selected?.image,
                      },
                    }))
                  }
                  width="100%"
                />
                {formErrors?.user?.length > 0 && (
                  <p className="text-destructive/80 text-xs ml-1 font-gilroyMedium">
                    {formErrors?.user}
                  </p>
                )}
              </div>

              {formData?.user && (
                <div className=" w-full bg-[#f5f5f5]  rounded-md p-2.5 flex items-center gap-4 ">
                  <GetAvatar
                    name={formData?.user?.first_name ?? ""}
                    size={56}
                  />

                  <div className=" w-full flex flex-col justify-center ">
                    <h1 className="text-black font-gilroySemiBold text-base ">
                      {formData?.user?.first_name ?? ""}
                    </h1>
                    <h1 className="text-[#7C7C7C] font-gilroyMedium text-sm ">
                      {formData?.user?.email ?? ""}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                      {formData?.user?.employment_type ?? ""}
                      <span className="flex text-2xl mx-1 -mt-3"> </span>
                      {formData?.user?.designation ?? ""}
                    </h1>
                  </div>
                </div>
              )}

              <div className="flex gap-2 absolute bottom-0 w-full">
                <Button
                  variant="outlineTwo"
                  className="w-full"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <LoadingButton
                  variant="primary"
                  className="w-full"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Reassign
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
