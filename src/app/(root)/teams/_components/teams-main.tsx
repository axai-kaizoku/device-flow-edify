"use client";

import PaginatedList from "./paginated-list";
import { DeleteTeam } from "../[id]/_components/delete-team";
import EditTeam from "../[id]/_components/edit-team";
import { Icons } from "@/components/icons";
import { teamIcons } from "../icons";
import { TeamsResponse } from "@/server/teamActions";
import CreateTeam from "./create-team";
import { Trash2 } from "lucide-react";
import EditPencilIcon from "@/icons/EditPencilIcon";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

interface TeamsMainProps {
  teams: TeamsResponse | null;
  setTeams?: React.Dispatch<React.SetStateAction<TeamsResponse | null>>;
  onRefresh?: () => Promise<void>;
}

export default function TeamsMain({
  teams,
  setTeams,
  onRefresh,
}: TeamsMainProps) {
  if (teams === undefined) {
    return (
      <div className="flex w-full h-[60vh] justify-center items-center">
        <DeviceFlowLoader />
      </div>
    );
  }
  return (
    <>
      {teams?.teams?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-10">
          <teamIcons.no_team_display />
          <CreateTeam onRefresh={onRefresh}>
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
        />
      )}
    </>
  );
}
