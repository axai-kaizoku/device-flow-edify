"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useEffect, useState } from "react";
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
import { User } from "@/server/userActions";
import AssetsIconWhite from "@/icons/AssetsIconWhite";

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
  const { openToast } = useToast();
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
      setOpen(false);
      openToast("success", "Assigned asset to user !");
      setLoading(false);
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to assign to user !");
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
            <div className="flex flex-col  w-full">
              <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
                <div className="size-9 2xl:size-11 flex justify-center items-center bg-black rounded-full p-1.5">
                  <AssetsIconWhite />
                </div>
                <h1 className="font-gilroySemiBold text-xl 2xl:text-3xl">
                  Assign Asset
                </h1>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="font-gilroySemiBold text-base mt-2 2xl:text-xl text-gray-400">
                  {"Step 1 of 1"}
                </div>
                <div className="h-[1px] bg-[#E7E7E7] w-full mb-1"></div>
              </div>
            </div>

            <div className=" w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4 ">
              <img
                src={
                  userData?.image && userData.image.length > 0
                    ? userData?.image
                    : userData.gender === "Male"
                    ? "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                    : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                }
                alt="user-image"
                className="w-20 h-20 p-1 object-cover rounded-full"
              />
              <div className=" w-full flex flex-col justify-center ">
                <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                  {userData?.first_name ?? "-"}
                </h1>

                <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                  {userData?.designation ?? "designation"}
                </h1>
                <p className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                  Active
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              <div className="z-0 pt-3">
                <SelectInput
                  key={"assign-device"}
                  value={device?.custom_model ?? ""}
                  placeholder="Search by name, serial no, etc"
                  //@ts-ignore
                  fetchOptions={searchDevices}
                  //@ts-ignore
                  initialOptions={fetchDevices}
                  onSelect={(data: Device) => {
                    setDevice({
                      _id: data?._id,
                      device_name: data?.device_name,
                      custom_model: data?.custom_model,
                      ram: data?.ram,
                      storage: data?.storage,
                      image: data?.image,
                      serial_no: data?.serial_no,
                    });
                  }}
                  optionValue={{ firstV: "custom_model", secondV: "serial_no" }}
                  label="Assigned to*"
                  className={cn(
                    error.length > 0 ? "border-destructive/80 border" : ""
                  )}
                />
                {error.length > 0 && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>
              <div className=" w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4 ">
                <img
                  src={
                    device?.image?.[0]?.url ??
                    "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                  }
                  alt="team-image"
                  className="w-20 h-20 p-1 border object-contain rounded-full "
                />
                <div className=" w-full flex flex-col justify-center ">
                  <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                    {device?.custom_model ?? "Device"}
                  </h1>

                  <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                    {device?.ram ?? "RAM"}
                    <span className="flex text-2xl mx-1 -mt-3">.</span>
                    {device?.storage ?? "Storage"}
                    <span className="flex text-2xl mx-1 -mt-3">.</span>
                    {device?.serial_no ?? "Serial number"}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2 absolute bottom-0 w-full ">
                <button
                  className={buttonVariants({
                    variant: "outlineTwo",
                    className: "w-full",
                  })}
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
                    <Spinner />
                  ) : (
                    <>
                      <span>Assign</span>
                    </>
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
