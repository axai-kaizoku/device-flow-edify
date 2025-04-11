"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { Button } from "@/components/buttons/Button";
import { SelectInput } from "@/components/dropdown/select-input";
import Spinner from "@/components/Spinner";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { Team } from "@/server/teamActions";
import {
  fetchUsers,
  searchUsers,
  updateUser,
  User,
} from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({
        queryKey: ["fetch-team-by-id"],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["get-users-by-team-id"],
        exact: false,
        refetchType: "all",
      });
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
            <h1 className="font-gilroySemiBold text-xl text-center w-full">
              {"Add Member"}
            </h1>

            <div className="h-[1px] bg-[#E7E7E7] w-full mb-1"></div>

            <div className="w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4">
              <img
                src={
                  teamData?.image && teamData.image.length > 0
                    ? teamData.image
                    : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
                }
                alt="team-image"
                className="w-20 h-16 p-1  object-cover rounded-full "
              />
              <div className="w-full flex flex-col justify-center">
                <div className="flex gap-3 items-center">
                  <div className="text-black font-gilroySemiBold text-base">
                    {teamData?.title ?? "-"}
                  </div>
                  <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm  font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                    Active
                  </div>
                </div>
                <div className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                  {teamData?.description ?? ""}
                </div>

                <div className="flex gap-2 items-center">
                  <div className="text-[#ADADAC] text-sm  font-gilroySemiBold">
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
                <div className=" w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4 ">
                  <img
                    src={
                      user?.image && user.image.length > 0
                        ? user?.image
                        : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                    }
                    alt="user-image"
                    className="w-20 h-16 p-1  object-cover rounded-full "
                  />
                  <div className=" w-full flex flex-col justify-center ">
                    <h1 className="text-black font-gilroySemiBold text-base ">
                      {user?.first_name ?? ""}
                    </h1>
                    <h1 className="text-[#7C7C7C] font-gilroyMedium text-sm ">
                      {user?.email ?? ""}
                    </h1>

                    <h1 className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                      {user?.employment_type ?? ""}
                      <span className="flex text-2xl mx-1 -mt-3">.</span>
                      {user?.designation ?? ""}
                    </h1>
                  </div>
                </div>
              ) : null}

              <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                <Button
                  type="button"
                  variant="outlineTwo"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Add</span>
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
