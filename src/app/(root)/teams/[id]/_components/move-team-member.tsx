"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { useEffect, useState } from "react";
import { updateUser, User } from "@/server/userActions";
import { Icons } from "@/components/icons";
import { SelectInput } from "@/components/dropdown/select-input";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/Button";
import Spinner from "@/components/Spinner";
import { ChevronRight } from "lucide-react";
import { fetchTeams, Team } from "@/server/teamActions";
import { cn } from "@/lib/utils";

export default function MoveTeamMember({
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
  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
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
          <div className="flex flex-col w-[97%] h-full justify-start items-center">
            <div className="flex flex-col gap-1 pb-5 w-full">
              <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
                <div className="bg-black rounded-full size-12 2xl:size-16 p-2 flex justify-center items-center">
                  <Icons.user_form_icon className="size-8 2xl:size-11" />
                </div>
                <span className="font-gilroySemiBold text-2xl 2xl:text-3xl">
                  {"Move member"}
                </span>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="font-gilroySemiBold text-lg 2xl:text-xl text-black">
                  {"Step 1 of 1"}
                </div>
                <div className="h-[1px] bg-[#E7E7E7] w-full mb-3"></div>
              </div>
            </div>

            <div className="h-[28vh] w-full bg-[#F1F1F1] border rounded-3xl mb-8 flex items-center gap-6 pl-7">
              <img
                src={userData.image ?? ""}
                alt="team-image"
                className="w-24 h-24 object-contain rounded-full border"
              />
              <div className="h-full w-full flex flex-col justify-center gap-1">
                <div className="flex gap-3 items-center">
                  <div className="text-black font-gilroySemiBold text-xl 2xl:text-2xl">
                    {userData?.first_name ?? "-"}
                  </div>
                  <div className="text-[#027A48] h-fit rounded-3xl bg-[#ECFDF3] text-sm 2xl:text-base font-gilroySemiBold flex justify-center items-center px-2 py-0.5">
                    Active
                  </div>
                </div>
                <div className="text-[#7C7C7C] text-base 2xl:text-lg font-gilroyMedium">
                  {userData?.designation ?? ""}
                </div>

                {/* <div className="flex gap-2 items-end">
                  <div className="text-[#ADADAC] text-sm 2xl:text-base font-gilroySemiBold">
                    Reporting Manger:
                  </div>
                  <div className="text-black font-gilroySemiBold">
                    {`${teamData?.manager[0]?.first_name ?? "-"} ${
                      teamData?.manager[0]?.last_name ?? ""
                    }`}
                  </div>
                </div> */}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-7 relative h-full"
            >
              <div className="z-0 flex-1">
                <SelectInput
                  value={team?.title ?? ""}
                  placeholder="Search by name, etc"
                  fetchOptions={async (query) => {
                    const data = await fetchTeams();
                    const filtered = data.filter((obj: any) =>
                      obj.title.toLowerCase().includes(query.toLowerCase())
                    );
                    return filtered;
                  }}
                  initialOptions={fetchTeams}
                  onSelect={(data: any) => {
                    setTeam({ _id: data._id, title: data.title });
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

              <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                <Button
                  className="rounded-full w-1/2  text-xl font-gilroySemiBold border border-black"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Move</span>
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
