"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";

import { Button, LoadingButton } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import {
  AsyncMultiSelectCombobox,
  BaseOption,
} from "@/components/ui/async-multi-select-combobox";
import { fetchNotInTeamPeople, Team } from "@/server/teamActions";
import { bulkMoveUsers, User } from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { cache, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Types and helper functions for Async Multi Select Combobox
 */
type UserOption = BaseOption & User;

const fetchUserOptions = cache(async (): Promise<UserOption[]> => {
  const users = await fetchNotInTeamPeople();

  return users?.map((u) => ({
    ...u,
    label: u?.email,
    value: u?._id,
  }));
});

export default function AddTeamMember({
  children,
  teamData,
}: {
  children: React.ReactNode;
  teamData: Team;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setError("");
    setSelectedEmails([]);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEmails?.length) {
      setError("Add atleast one user");
      return;
    }

    setLoading(true);
    try {
      // await bulkMoveUsers(user?._id ?? "", { teamId: teamData?._id });
      await bulkMoveUsers({
        newTeamId: teamData?._id,
        userIds: selectedEmails,
      });

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
      setLoading(false);
      setOpen(false);

      toast.success("Added member to team !");
    } catch (error) {
      toast.error("Failed to add member to team !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-full max-w-md">
        <div className="flex justify-center w-full h-full items-start">
          <div className="flex flex-col w-[99%] gap-4 h-full justify-start items-center">
            <h1 className="font-gilroySemiBold text-lg text-center w-full">
              {"Add Members"}
            </h1>

            <div className="h-[1px] bg-[#E7E7E7] w-full mb-1"></div>

            <div className="w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4">
              {teamData?.image && teamData?.image?.length > 0 ? (
                <img
                  src={teamData?.image}
                  alt={teamData?.title}
                  className="size-14 object-cover rounded-full flex-shrink-0"
                />
              ) : (
                <GetAvatar name={teamData?.title ?? ""} size={56} />
              )}
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
              <div className="flex flex-col gap-2 pt-3">
                <AsyncMultiSelectCombobox<UserOption>
                  fetcher={fetchUserOptions}
                  preload
                  // when preloaded, apply client‑side filtering too
                  filterFn={(opt, q) =>
                    opt?.first_name
                      ?.toLowerCase()
                      ?.includes(q?.toLowerCase()) ||
                    opt?.email?.toLowerCase()?.includes(q?.toLowerCase())
                  }
                  // how each option is rendered
                  renderItem={(opt) => (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <div className="font-gilroyMedium">
                          {opt?.first_name}
                        </div>
                        <div className="text-xs font-gilroyRegular text-muted-foreground">
                          {opt?.email}
                        </div>
                      </div>
                    </div>
                  )}
                  // how the trigger shows selected items
                  renderSelectedItem={(opts) => {
                    const firstThree = opts?.slice(0, 3) ?? [];
                    const remaining = opts?.length > 3 ? opts.length - 3 : 0;
                    return (
                      <div className="flex flex-wrap items-center gap-1">
                        {firstThree?.map((o) => (
                          <span
                            key={o?.value}
                            className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 rounded"
                          >
                            {o?.first_name}
                          </span>
                        ))}
                        {remaining > 0 && (
                          <span className="font-gilroyMedium text-xs">
                            + {remaining} More
                          </span>
                        )}
                      </div>
                    );
                  }}
                  value={selectedEmails}
                  onChange={setSelectedEmails}
                  label="Members"
                  placeholder="Add team members…"
                  notFound={
                    <div className="py-6 text-center font-gilroyMedium text-sm">
                      No users found
                    </div>
                  }
                  width="100%"
                  clearable
                />
                {error?.length ? (
                  <p className="text-xs text-destructive font-gilroyMedium">
                    {error}{" "}
                  </p>
                ) : null}
              </div>

              <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                <Button
                  type="button"
                  variant="outlineTwo"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="primary"
                  type="submit"
                >
                  Add
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
