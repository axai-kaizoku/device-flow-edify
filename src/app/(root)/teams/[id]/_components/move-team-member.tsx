"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { Button, buttonVariants } from "@/components/buttons/Button";
import { SelectInput } from "@/components/dropdown/select-input";
import Spinner from "@/components/Spinner";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { fetchTeams, Team } from "@/server/teamActions";
import { updateUser, User } from "@/server/userActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function MoveTeamMember({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: User;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();
  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setTeam({});
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!team?._id) {
      setError("Team required");
      return;
    }

    setLoading(true);
    try {
      await updateUser(userData?._id ?? "", { teamId: team._id });
      setOpen(false);
      openToast("success", "Moved member to team !");
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
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to move member to team !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[99%] h-full justify-start items-center">
            <span className="font-gilroySemiBold text-lg ">Move member</span>

            <div className="h-[1px] bg-[#E7E7E7] w-full my-3 -mx-4"></div>

            <div className=" w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4 mb-8">
              <img
                src={
                  userData?.image && userData.image.length > 0
                    ? userData?.image
                    : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                }
                alt="userData-image"
                className="w-20 h-20 p-1  object-cover rounded-full "
              />
              <div className=" w-full flex flex-col justify-center ">
                <h1 className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                  {userData?.first_name ?? ""}
                </h1>
                <h1 className="text-[#7C7C7C] font-gilroyMedium text-base 2xl:text-2xl">
                  {userData?.email ?? ""}
                </h1>

                <h1 className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                  {userData?.employment_type ?? ""}
                  <span className="flex text-2xl mx-1 -mt-3">.</span>
                  {userData?.designation ?? ""}
                </h1>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 justify-start relative h-full"
            >
              <div className="z-0 ">
                <SelectInput
                  optionValue={{ firstV: "title", secondV: "description" }}
                  key={"move-team-member-team-field"}
                  value={team?.title ?? ""}
                  placeholder="Search by team name, etc"
                  fetchOptions={async (query) => {
                    const data = await fetchTeams();
                    const filtered = data.filter((obj: any) =>
                      obj.title.toLowerCase().includes(query.toLowerCase())
                    );
                    return filtered;
                  }}
                  initialOptions={fetchTeams}
                  onSelect={(data: any) => {
                    setTeam({
                      _id: data._id,
                      title: data.title,
                      description: data.description,
                      image: data.image,
                    });
                  }}
                  label="Team"
                  className={cn(
                    error.length > 0 ? "border-destructive/80 border" : ""
                  )}
                />
                {error.length > 0 && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>

              {team?.title ? (
                <div className="w-full bg-[#f5f5f5] rounded-md p-3 flex items-center gap-4">
                  <img
                    src={
                      team?.image && team.image.length > 0
                        ? team.image
                        : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
                    }
                    alt="team-image"
                    className="w-20 h-20 p-1  object-cover rounded-full "
                  />
                  <div className="w-full flex flex-col justify-center">
                    <div className="flex gap-3 items-center">
                      <div className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                        {team?.title ?? "-"}
                      </div>
                      <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                        Active
                      </div>
                    </div>
                    <div className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                      {team?.description ?? ""}
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="text-[#ADADAC] text-sm 2xl:text-base font-gilroySemiBold">
                        Reporting Manger:
                      </div>
                      <div className="text-black font-gilroySemiBold">
                        {`${team?.manager?.[0]?.first_name ?? "-"}`}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                <Button
                  className={buttonVariants({
                    variant: "outlineTwo",
                    className: "w-1/2",
                  })}
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className={buttonVariants({
                    variant: "primary",
                    className: "w-1/2",
                  })}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Move</span>
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
