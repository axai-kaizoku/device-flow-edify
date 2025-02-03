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
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import AssetsIconWhite from "@/icons/AssetsIconWhite";

export default function ReAssign({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
  const [device, setDevice] = useState<Device | null>();
  const [user, setUser] = useState<User | null>();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setUser(null);
    setDevice(null);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!device?._id) {
      setError("Device required");
      return;
    }

    setLoading(true);
    try {
      await updateDevice(device?._id ?? "", { userId: user?._id });
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
                  <AssetsIconWhite/>
                </div>
                <h1 className="font-gilroySemiBold text-xl 2xl:text-3xl">
                  Assign Asset
                </h1>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="h-[1px] bg-[#E7E7E7] w-full my-3"></div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              <div className="z-10 pt-3">
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
                      _id: data._id,
                      device_name: data.device_name,
                      custom_model: data.custom_model,
                      ram: data.ram,
                      storage: data?.storage,
                      image: data?.image,
                      serial_no: data?.serial_no,
                    });
                  }}
                  optionValue={{ firstV: "custom_model", secondV: "serial_no" }}
                  label="Device assigned*"
                  className={cn(
                    error.length > 0 ? "border-destructive/80 border" : ""
                  )}
                />
                {error.length > 0 && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>

              {device ? (
                <>
                  <div className=" w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4 ">
                    <img
                      src={
                        device?.image![0]?.url ??
                        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                      }
                      alt="team-image"
                      className="w-20 h-20 p-1 object-cover rounded-full "
                    />
                    <div className=" w-full flex flex-col justify-center ">
                      <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                        {device?.custom_model ?? "-"}
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
                </>
              ) : (
                ""
              )}

              <div className="pt-3 w-full z-0">
                <SelectInput
                  fetchOptions={searchUsers}
                  initialOptions={fetchUsers}
                  optionValue={{ firstV: "first_name", secondV: "email" }}
                  key={"assign-assets-form"}
                  placeholder="Search by name, email, etc."
                  // logic yet to be implemented
                  onSelect={(data: User) => {
                    setUser({
                      email: data.email,
                      _id: data._id,
                      designation: data.designation,
                      first_name: data.first_name,
                      employment_type: data.employment_type,
                      image: data.image,
                    });
                  }}
                  label="Assigning To*"
                  value={user?.email ?? ""}
                />
              </div>

              {user ? (
                <>
                  <div className=" w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4 ">
                    <img
                      src={
                        user?.image && user.image.length > 0
                          ? user?.image
                          : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                      }
                      alt="user-image"
                      className="w-20 h-20 p-1  object-cover rounded-full "
                    />
                    <div className=" w-full flex flex-col justify-center ">
                      <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                        {user?.first_name ?? "-"}
                      </h1>

                      <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                        {user?.designation ?? "designation"}
                      </h1>
                      <p className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                        Active
                      </p>
                    </div>
                  </div>
                </>
              ) : null}

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
