"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import { TeamCard } from "./team-card";
import { Team } from "@/server/teamActions";

interface PaginatedListProps {
  teams: Team[];
  itemsPerPage: number;
  renderButtons: (team: Team) => JSX.Element;
}

export default function PaginatedList({
  teams,
  itemsPerPage,
  renderButtons,
}: PaginatedListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalTeams = teams?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeams = teams
    ? teams?.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="bg-white pl-[29px]  pr-[22px] pt-[22px] rounded-[33px] pb-4 w-full">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {currentTeams?.map(
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
          totalItems={totalTeams}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
