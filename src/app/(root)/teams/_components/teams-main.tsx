"use client";

import { buttonVariants } from "@/components/buttons/Button";
import { Skeleton } from "@/components/ui/skeleton";
import EditPencilIcon from "@/icons/EditPencilIcon";
import RestoreIcon from "@/icons/RestoreIcon";
import { TeamsResponse } from "@/server/teamActions";
import { Trash2 } from "lucide-react";
import { DeleteTeam } from "../[id]/_components/delete-team";
import EditTeam from "../[id]/_components/edit-team";
import CreateTeam from "./create-team";
import PaginatedList from "./paginated-list";
import { PermanentTeamDelete } from "./permanent-team";
import { RestoreTeam } from "./restore-team";

interface TeamsMainProps {
  teams: TeamsResponse | null;
  setTeams?: React.Dispatch<React.SetStateAction<TeamsResponse | null>>;
  onRefresh?: () => Promise<void>;
  status?: string;
  value?: string;
}

export default function TeamsMain({
  teams,
  setTeams,
  status,
  onRefresh,
  value,
}: TeamsMainProps) {
  if (status === "pending") {
    return (
      <>
        <TeamsGridSkeleton />
      </>
    );
  }
  return (
    <>
      {teams?.teams?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <div className="flex  font-gilroySemiBold flex-col   justify-center items-center ">
            <img src="/media/no_data/team.svg" alt="No-Teams Logo" />
          </div>
          <CreateTeam onRefresh={onRefresh}>
            <button
              className={buttonVariants({
                variant: "primary",
                className: "w-full",
              })}
            >
              Add Team
            </button>
          </CreateTeam>
        </div>
      ) : (
        <PaginatedList
          setTeams={setTeams}
          key="teams-main"
          tab="active_teams"
          teams={teams!}
          renderButtons={(team) => (
            <>
              {/* if (value === "inactive-teams") ? ( */}
              {value === "inactive-teams" ? (
                <>
                  <PermanentTeamDelete id={team?._id!} onRefresh={onRefresh}>
                    <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-10 border-gray-300 rounded-full justify-center items-center flex border">
                      <Trash2 className="size-4 cursor-pointer" />
                    </div>
                  </PermanentTeamDelete>

                  <RestoreTeam id={team?._id!}>
                    <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-10 border-gray-300 rounded-full justify-center items-center flex border">
                      {/* <Trash2 className="size-4 cursor-pointer" /> */}
                      <RestoreIcon className="size-4 cursor-pointer" />
                    </div>
                  </RestoreTeam>
                </>
              ) : (
                <>
                  <DeleteTeam id={team._id!} onRefresh={onRefresh}>
                    <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-10 border-gray-300 rounded-full justify-center items-center flex border">
                      <Trash2 className="size-4 cursor-pointer" />
                    </div>
                  </DeleteTeam>
                  <EditTeam {...team} onRefresh={onRefresh}>
                    <div className="group duration-300 hover:border-black transition-all ease-in-out size-10 border-gray-300 rounded-full justify-center items-center flex border">
                      <EditPencilIcon className="size-4 text-gray-600 group-hover:text-black cursor-pointer" />
                    </div>
                  </EditTeam>
                </>
              )}
            </>
          )}
        />
      )}
    </>
  );
}

function TeamsGridSkeleton() {
  return (
    <div className="py-2 w-full">
      <div className="flex gap-x-4 gap-y-4 flex-wrap w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-[rgba(171,171,171,0.19)] bg-[#FCFCFC] backdrop-blur-[14.1px]
            rounded-lg max-lg:w-[calc(50%-16px)] max-2xl:w-[calc(33.33%-16px)] p-4 flex flex-col"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="-mt-1 flex flex-col gap-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>

            {/* Members Section */}
            <div className="flex items-center justify-between mt-auto">
              <Skeleton className="h-4 w-32" />
              <div className="flex -space-x-5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="w-8 h-8 rounded-full border border-white"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
