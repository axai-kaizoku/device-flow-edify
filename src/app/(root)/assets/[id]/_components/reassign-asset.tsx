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
import { Device, updateDevice } from "@/server/deviceActions";
import { fetchUsers, searchUsers, User } from "@/server/userActions";

export default function ReassignAsset({
  children,
  deviceData,
}: {
  children: React.ReactNode;
  deviceData: Device;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setUser({});
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) {
      setError("User required");
      return;
    }

    setLoading(true);
    try {
      // @ts-ignore
      await updateDevice(deviceData?._id ?? "", { userId: user?._id });
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
                <Icons.user_form_icon className="size-9 2xl:size-11 bg-black rounded-full p-1" />

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
                  deviceData?.image?.[0]?.url ??
                  "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                }
                alt="device-image"
                className="w-20 h-20 p-1 object-contain border rounded-full "
              />
              <div className=" w-full flex flex-col justify-center ">
                <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                  {deviceData?.custom_model ?? "-"}
                </h1>

                <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                  {deviceData?.ram ?? "RAM"}
                  <span className="flex text-2xl mx-1 -mt-3">.</span>
                  {deviceData?.storage ?? "Storage"}
                  <span className="flex text-2xl mx-1 -mt-3">.</span>
                  {deviceData?.serial_no ?? "Serial number"}
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
                  key={"reassign-assign"}
                  value={user?.first_name ?? ""}
                  placeholder="Search by name, email, etc"
                  // @ts-ignore
                  fetchOptions={searchUsers}
                  // @ts-ignore
                  initialOptions={fetchUsers}
                  onSelect={(data: User) => {
                    setUser({
                      _id: data._id,
                      first_name: data.first_name,
                      email: data.email,
                      designation: data.designation,
                      image: data.image,
                      employment_type: data?.employment_type,
                    });
                  }}
                  optionValue={{ firstV: "first_name", secondV: "email" }}
                  label="Assigning to*"
                  className={cn(
                    error.length > 0 ? "border-destructive/80 border" : ""
                  )}
                />
                {error.length > 0 && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>

              {user?.first_name ? (
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
                      {user?.first_name ?? ""}
                    </h1>
                    <h1 className="text-[#7C7C7C] font-gilroyMedium text-base 2xl:text-2xl">
                      {user?.email ?? ""}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                      {user?.employment_type ?? ""}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {user?.designation ?? ""}
                    </h1>
                  </div>
                </div>
              ) : null}
              <div className="flex gap-2 absolute bottom-0 w-full mt-4">
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
