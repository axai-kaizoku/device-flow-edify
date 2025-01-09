"use client";

import PaginatedList from "./paginated-list";
import { DeleteTeam } from "../[id]/_components/delete-team";
import EditTeam from "../[id]/_components/edit-team";
import { Icons } from "@/components/icons";
import { teamIcons } from "../icons";
import { TeamsResponse } from "@/server/teamActions";
import CreateTeam from "./create-team";

interface TeamsMainProps {
  teams: TeamsResponse | null;
  setTeams: React.Dispatch<React.SetStateAction<TeamsResponse | null>>;
}

export default function TeamsMain({ teams, setTeams }: TeamsMainProps) {
  return (
    <>
      {teams?.teams?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <teamIcons.no_team_display />
          <CreateTeam>
            <div className="py-1.5 px-8 text-sm rounded-full text-white font-gilroySemiBold bg-black">
              Add Team
            </div>
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
              <DeleteTeam id={team._id!}>
                <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
                  <Icons.trashUpper />
                  <Icons.trash className="size-4 cursor-pointer" />
                </div>
              </DeleteTeam>
              <EditTeam {...team}>
                <div className="group duration-300 hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
                  <Icons.edit className="w-5 h-5 text-gray-600 group-hover:text-black cursor-pointer" />
                </div>
              </EditTeam>
            </>
          )}
        />
      )}
    </>
  );
}
