"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { SelectInput } from "@/components/dropdown/select-input";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/Button";
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M3.67163 10.3953C3.67163 7.24709 3.67163 5.67298 4.64966 4.69495C5.62769 3.71692 7.20181 3.71692 10.35 3.71692H17.0285C20.1767 3.71692 21.7508 3.71692 22.7288 4.69495C23.7069 5.67298 23.7069 7.24709 23.7069 10.3953V15.9607C23.7069 18.0595 23.7069 19.1089 23.0548 19.7609C22.4028 20.4129 21.3534 20.4129 19.2546 20.4129H8.1239C6.02508 20.4129 4.97567 20.4129 4.32366 19.7609C3.67163 19.1089 3.67163 18.0595 3.67163 15.9607V10.3953Z"
                      stroke="white"
                      strokeWidth="1.6696"
                    />
                    <path
                      d="M24.8202 23.7521H2.55884"
                      stroke="white"
                      strokeWidth="1.6696"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17.0285 17.0737H10.3501"
                      stroke="white"
                      strokeWidth="1.6696"
                      strokeLinecap="round"
                    />
                  </svg>
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
                src={userData?.image ?? ""}
                alt="user-image"
                className="w-24 h-20 p-1  object-cover rounded-full "
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
                  value={device?.device_name ?? ""}
                  placeholder="Search by name, serial no, etc"
                  //@ts-ignore
                  fetchOptions={searchDevices}
                  //@ts-ignore
                  initialOptions={fetchDevices}
                  onSelect={(data: Device) => {
                    setDevice({
                      _id: data?._id,
                      device_name: data?.device_name,
                      ram: data?.ram,
                      storage: data?.storage,
                      image: data?.image,
                      serial_no: data?.serial_no,
                    });
                  }}
                  optionValue={{ firstV: "device_name", secondV: "serial_no" }}
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
                  src={device?.image![0]?.url ?? ""}
                  alt="team-image"
                  className="w-24 h-20 p-1  object-cover rounded-full "
                />
                <div className=" w-full flex flex-col justify-center ">
                  <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                    {device?.device_name ?? "-"}
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
                <Button
                  className="rounded-full w-1/2  text-base font-gilroySemiBold border border-black"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-full w-1/2 text-base font-gilroySemiBold bg-black text-white "
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Assign</span>
                      <ChevronRight color="white" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
