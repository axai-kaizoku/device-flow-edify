"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import { TeamCard } from "./team-card";
import {
  fetchActiveTeams,
  fetchInactiveTeams,
  Team,
  TeamsResponse,
} from "@/server/teamActions";

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
  const [currentPage, setCurrentPage] = useState(1);

  // const totalTeams = teams?.total;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentTeams = teams
  //   ? teams?.slice(startIndex, startIndex + itemsPerPage)
  //   : [];

  const handlePageChange = async (page: number) => {
    let res: TeamsResponse | null = null;
    if (tab === "active_teams") {
      res = await fetchActiveTeams({ page });
    } else if (tab === "inactive_teams") {
      res = await fetchInactiveTeams({ page });
    }
    setTeams(res);
    setCurrentPage(page);
  };

  return (
    <div className=" py-2 w-full ">
      <div className="flex gap-x-4 gap-y-4 flex-wrap w-full ">
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
