"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import { TeamCard } from "./team-card";
import {
  fetchActiveTeams,
  fetchInactiveTeams,
  fetchTeams,
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
    let res: TeamsResponse;
    if (tab === "active_teams") {
      res = await fetchActiveTeams({ page });
    } else if (tab === "inactive_teams") {
      res = await fetchInactiveTeams({ page });
    }
    setTeams(res);
    setCurrentPage(page);
  };

  return (
    <div className="bg-white pl-[29px]  pr-[22px] pt-[22px] rounded-[33px] pb-4 w-full">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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

      {/* Pagination */}
      <div className="mt-4 ">
        <Pagination
          total_pages={teams?.total_pages}
          current_page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
