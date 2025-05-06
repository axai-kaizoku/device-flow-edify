"use client";

import { Team, TeamsResponse } from "@/server/teamActions";
import { TeamCard } from "./team-card";

interface PaginatedListProps {
  teams: TeamsResponse;
  itemsPerPage?: number;
  renderButtons: (team: Team) => JSX.Element;
  tab?: "active_teams" | "inactive_teams";
  setTeams: any;
}

export default function PaginatedList({
  teams,
  renderButtons,
  tab,
  setTeams,
}: PaginatedListProps) {
  return (
    <div className=" py-2 w-full ">
      <div className="flex gap-x-4 gap-y-4  flex-wrap w-full ">
        {teams?.teams?.map(
          (team) =>
            team && (
              <TeamCard
                key={team?._id}
                {...team}
                buttons={renderButtons(team)}
              />
            )
        )}
      </div>
    </div>
  );
}
