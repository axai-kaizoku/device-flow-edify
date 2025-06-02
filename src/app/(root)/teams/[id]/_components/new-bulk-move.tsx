"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import {
  Button,
  buttonVariants,
  LoadingButton,
} from "@/components/buttons/Button";
import { toast } from "sonner";
import { fetchTeams, Team } from "@/server/teamActions";
import { bulkMoveUsers } from "@/server/userActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CreateTeam from "../../_components/create-team";
import { AsyncSelect } from "@/components/ui/async-select";
import { GetAvatar } from "@/components/get-avatar";
import { TeamForm } from "../../_components/team-form";

export default function BulkMove({
  children,
  selectedIds,
  setSelectedIds,
}: {
  children: React.ReactNode;
  selectedIds: string[];
  setSelectedIds: (state: any) => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState("");

  const setBack = () => {
    setStep(0);
  }

  useEffect(() => {
    setError("");
    setTeam({});
  }, [open]);

  const handleBulkMove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!team?._id) {
      setError("Team required");
      return;
    }

    setLoading(true);
    try {
      await bulkMoveUsers({ newTeamId: team._id, userIds: selectedIds });
      setOpen(false);
      toast.success("Moved member to team !");
      setSelectedIds([]);
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["fetch-team-by-id"],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["teams"],
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
      toast.error("Failed to move member to team !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        {step===0 ? (<div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[99%] h-full justify-start items-center">
            <span className="font-gilroySemiBold text-lg ">
              Bulk Move Members
            </span>

            <div className="h-[1px] bg-[#E7E7E7] w-full my-3 -mx-4"></div>

            <form
              onSubmit={handleBulkMove}
              className="w-full flex flex-col gap-7 justify-start relative h-full"
            >
              <div className="flex flex-col gap-2 pt-3">
                <AsyncSelect<Team>
                  fetcher={fetchTeams}
                  preload
                  // fixInputClear={false}
                  renderOption={(team) => (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <div className="font-gilroyMedium">{team?.title}</div>
                        <div className="text-xs font-gilroyRegular text-muted-foreground">
                          {team?.description}
                        </div>
                      </div>
                    </div>
                  )}
                  filterFn={(team, query) =>
                    team?.title
                      ?.toLowerCase()
                      ?.includes(query?.toLowerCase()) ||
                    team?.description
                      ?.toLowerCase()
                      ?.includes(query?.toLowerCase())
                  }
                  getOptionValue={(team) => team?._id}
                  getDisplayValue={() => (
                    <div className="flex items-center gap-2 text-left w-full">
                      <div className="flex flex-col leading-tight">
                        <div className="font-gilroyMedium">
                          {team?.title ?? ""}
                        </div>
                      </div>
                    </div>
                  )}
                  notFound={
                    <div className="py-6 text-center font-gilroyMedium text-sm">
                      No teams found
                    </div>
                  }
                  label="Team"
                  placeholder="Search Teams"
                  value={team?.title || "null"}
                  onChange={(selected) =>
                    setTeam({
                      _id: selected?._id,
                      title: selected?.title,
                      description: selected?.description,
                      image: selected?.image,
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

              <CreateTeam>
                <div className="border-[1.5px] w-[32vw] border-dashed border-black/20 hover:border-black rounded-lg transition-colors duration-200" onClick={() => setStep(1)}>
                  <div className="w-full  cursor-pointer font-gilroyMedium py-3 flex justify-center items-center text-black">
                    <p>Add a new team</p>
                  </div>
                </div>
              </CreateTeam>

              {team?.title ? (
                <div className="w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4">
                  {team?.image && team?.image?.length > 0 ? (
                    <img
                      src={team?.image}
                      alt={team?.title}
                      className="size-14 object-cover rounded-full flex-shrink-0"
                    />
                  ) : (
                    <GetAvatar name={team?.title ?? ""} size={56} />
                  )}
                  <div className="w-full flex flex-col justify-center">
                    <div className="flex gap-3 items-center">
                      <div className="text-black font-gilroySemiBold text-base">
                        {team?.title ?? "-"}
                      </div>
                      <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm  font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                        Active
                      </div>
                    </div>
                    <div className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                      {team?.description ?? ""}
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="text-[#ADADAC] text-sm  font-gilroySemiBold">
                        Reporting Manger:
                      </div>
                      <div className="text-black font-gilroySemiBold">
                        {`${team?.manager?.[0]?.first_name ?? "-"} `}
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
                <LoadingButton
                  loading={loading}
                  variant="primary"
                  className="w-1/2"
                  type="submit"
                >
                  Move
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>):(
            <TeamForm setBack={setBack}/>
        )}
      </SheetContent>
    </Sheet>
  );
}
