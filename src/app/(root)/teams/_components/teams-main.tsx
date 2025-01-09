"use client";

import PaginatedList from "./paginated-list";
import { DeleteTeam } from "../[id]/_components/delete-team";
import EditTeam from "../[id]/_components/edit-team";
import { Icons } from "@/components/icons";
import { Team, TeamsResponse } from "@/server/teamActions";

interface TeamsMainProps {
  teams: TeamsResponse;
}

const ITEMS_PER_PAGE = 5;

export default function TeamsMain({ teams }: TeamsMainProps) {
  return (
    <PaginatedList
      key="teams-main"
      tab="active_teams"
      teams={teams}
      itemsPerPage={ITEMS_PER_PAGE}
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
  );
}
