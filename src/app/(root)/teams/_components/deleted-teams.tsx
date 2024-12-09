"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Team } from "@/server/teamActions";

import { TeamCard } from "./team-card";
import Pagination from "./pagination";
import { ArchiveRestoreIcon, RefreshCw, Trash2 } from "lucide-react";
import { RestoreTeam } from "./restore-team";
import { PermanentTeamDelete } from "./permanent-team";

interface DeletedTeamsProps {
  teams: Team[];
}

const ITEMS_PER_PAGE = 6;

export default function DeletedTeams({ teams }: DeletedTeamsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalTeams = teams.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTeams = teams.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Team Cards */}
      <div className="grid bg-white  p-5 rounded-[48px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {currentTeams.map((team) => (
          <TeamCard
            key={team._id!}
            {...team}
            buttons={
              <>
                <PermanentTeamDelete id={team._id!}>
                  <div className="group size-10 border-gray-300 hover:border-red-500 rounded-full justify-center items-center flex border">
                    <Trash2 className="size-5 text-black group-hover:text-red-400 cursor-pointer" />
                  </div>
                </PermanentTeamDelete>

                <RestoreTeam id={team._id!}>
                  <div className="group size-10 border-gray-300 hover:border-green-500 rounded-full justify-center items-center flex border">
                    <RefreshCw className="size-5 text-black group-hover:text-green-400 cursor-pointer" />
                  </div>
                </RestoreTeam>
              </>
            }
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalTeams}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
