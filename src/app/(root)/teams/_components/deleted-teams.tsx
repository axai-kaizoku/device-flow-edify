"use client";

import PaginatedList from "./paginated-list";
import { RestoreTeam } from "./restore-team";
import { PermanentTeamDelete } from "./permanent-team";
import { Icons } from "@/components/icons";
import { Team } from "@/server/teamActions";

interface DeletedTeamsProps {
  teams: Team[];
}

const ITEMS_PER_PAGE = 6;

export default function DeletedTeams({ teams }: DeletedTeamsProps) {
  return (
    <PaginatedList
      teams={teams}
      itemsPerPage={ITEMS_PER_PAGE}
      renderButtons={(team) => (
        <>
          <PermanentTeamDelete id={team?._id!}>
            <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
              <Icons.trashUpper />
              <Icons.trash className="size-4 cursor-pointer" />
            </div>
          </PermanentTeamDelete>

          <RestoreTeam id={team?._id!}>
            <div className="group duration-300 hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
              <Icons.restore className="size-5 cursor-pointer" />
            </div>
          </RestoreTeam>
        </>
      )}
    />
  );
}
