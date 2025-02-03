"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useEffect, useState } from "react";
import {
  fetchUsers,
  getUsersByTeamId,
  searchUsers,
  updateUser,
  User,
} from "@/server/userActions";
import { Icons } from "@/components/icons";
import { SelectInput } from "@/components/dropdown/select-input";
import { Team } from "@/server/teamActions";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/Button";
import Spinner from "@/components/Spinner";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import UserFormProfileIcon from "@/icons/UserFormProfileIcon";

export default function AddTeamMember({
  children,
  teamData,
}: {
  children: React.ReactNode;
  teamData: Team;
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
      await updateUser(user?._id ?? "", { teamId: teamData._id });
      setOpen(false);
      openToast("success", "Added member to team !");

      setLoading(false);
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to add member to team !");
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
                  <UserFormProfileIcon className="size-6 2xl:size-8" />
                </div>
                <span className="font-gilroySemiBold text-xl 2xl:text-3xl">
                  {"Add Employee"}
                </span>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="font-gilroySemiBold text-base mt-2 2xl:text-xl text-gray-400">
                  {"Step 1 of 1"}
                </div>
                <div className="h-[1px] bg-[#E7E7E7] w-full mb-1"></div>
              </div>
            </div>

            <div className="w-full bg-[#f5f5f5]  rounded-3xl p-3 flex items-center gap-4">
              <img
                src={
                  teamData?.image && teamData.image.length > 0
                    ? teamData.image
                    : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
                }
                alt="team-image"
                className="w-20 h-20 p-1  object-cover rounded-full "
              />
              <div className="w-full flex flex-col justify-center">
                <div className="flex gap-3 items-center">
                  <div className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                    {teamData?.title ?? "-"}
                  </div>
                  <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                    Active
                  </div>
                </div>
                <div className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                  {teamData?.description ?? ""}
                </div>

                <div className="flex gap-2 items-center">
                  <div className="text-[#ADADAC] text-sm 2xl:text-base font-gilroySemiBold">
                    Reporting Manger:
                  </div>
                  <div className="text-black font-gilroySemiBold">
                    {`${teamData?.manager![0]?.first_name ?? "-"} ${
                      teamData?.manager![0]?.last_name ?? ""
                    }`}
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              <div className="z-0 pt-3">
                <SelectInput
                  optionValue={{ firstV: "first_name", secondV: "email" }}
                  key={"add-team-member-user-field"}
                  value={user?.first_name ?? ""}
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
                  label="Add member*"
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
                      <span>Add</span>
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
