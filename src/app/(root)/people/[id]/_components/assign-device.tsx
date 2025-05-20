"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { Button, LoadingButton } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import { AsyncSelect } from "@/components/ui/async-select";
import {
  Device,
  fetchUnassignedDevices,
  updateDevice,
} from "@/server/deviceActions";
import { User } from "@/server/userActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AssignDevice({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: User;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const [device, setDevice] = useState<Device>();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!device?._id) {
      setError("Device required");
      return;
    }

    setLoading(true);
    try {
      await updateDevice(device?._id ?? "", { userId: userData?._id });
      queryClient.invalidateQueries({
        queryKey: ["fetch-user-by-id"],
        exact: false,
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: ["user-timeline"],
        exact: false,
        refetchType: "all",
      });
      setOpen(false);
      toast.success("Assigned asset to user !");
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to assign to user !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[97%] gap-4 h-full justify-start items-center">
            <div className="flex flex-col  w-full">
              <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
                <h1 className="font-gilroySemiBold text-xl text-center">
                  Assign Asset
                </h1>
              </div>

              <div className="h-[1px] bg-[#E7E7E7] w-full -mx-1"></div>
            </div>

            <div className=" w-full bg-[#f5f5f5]  rounded-md p-2.5 flex items-center gap-4 ">
              <GetAvatar name={userData?.first_name ?? ""} size={56} />

              <div className=" w-full flex flex-col justify-center ">
                <h1 className="text-black font-gilroySemiBold text-base ">
                  {userData?.first_name ?? ""}
                </h1>
                <h1 className="text-[#7C7C7C] font-gilroyMedium text-sm ">
                  {userData?.email ?? ""}
                </h1>

                <h1 className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                  {userData?.employment_type ?? ""}
                  <span className="flex text-2xl mx-1 -mt-3"> </span>
                  {userData?.designation ?? ""}
                </h1>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              <div className="flex flex-col gap-2 pt-3">
                <AsyncSelect<Device>
                  fetcher={fetchUnassignedDevices}
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
                          {device?.custom_model ?? ""}
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
                  value={device?.custom_model || "null"}
                  onChange={(selected) =>
                    setDevice({
                      _id: selected?._id,
                      device_name: selected?.device_name,
                      custom_model: selected?.custom_model,
                      ram: selected?.ram,
                      storage: selected?.storage,
                      image: selected?.image,
                      serial_no: selected?.serial_no,
                    })
                  }
                  width="100%"
                />
                {error.length > 0 && (
                  <p className="text-destructive/80 text-xs ml-1 font-gilroyMedium">
                    {error}
                  </p>
                )}
              </div>
              {device?.custom_model && (
                <div className=" w-full bg-[#f5f5f5]  rounded-lg p-3 flex items-center gap-4 ">
                  <img
                    src={
                      device?.image?.[0]?.url ??
                      "https://static.vecteezy.com/system/resources/thumbnails/012/807/215/small/silhouette-of-the-laptop-for-sign-icon-symbol-apps-website-pictogram-logo-art-illustration-or-graphic-design-element-format-png.png"
                    }
                    alt="team-image"
                    className="w-16 h-16 p-1 border object-contain rounded-full "
                  />
                  <div className="w-full flex flex-col justify-center ">
                    <h1 className="text-black font-gilroySemiBold text-xl">
                      {device?.custom_model ?? "Device"}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-base  font-gilroyMedium">
                      {device?.ram ?? "RAM"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {device?.storage ?? "Storage"}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {device?.serial_no ?? "Serial number"}
                    </h1>
                  </div>
                </div>
              )}
              <div className="flex gap-2 absolute bottom-0 w-full ">
                <Button
                  variant="outlineTwo"
                  className="w-full"
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
                  Assign
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
