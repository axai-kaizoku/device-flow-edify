"use client";

import { useState } from "react";
import { Team } from "@/server/teamActions";

import Pagination from "./pagination";
import { DeleteTeam } from "../[id]/_components/delete-team";
import { PencilLine, Trash2 } from "lucide-react";
import EditTeam from "../[id]/_components/edit-team";
import { TeamCard } from "./team-card";

interface TeamsMainProps {
  teams: Team[];
  sess: any;
}

const ITEMS_PER_PAGE = 6;

export default function TeamsMain({ teams, sess }: TeamsMainProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalTeams = teams.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTeams = teams.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid bg-white  p-[22px] rounded-[48px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {currentTeams.map((team) => (
          <TeamCard
            key={team._id}
            {...team}
            buttons={
              <>
                <EditTeam {...team}>
                  <div className="group hover:border-blue-400 size-10 border-gray-300 rounded-full justify-center items-center flex border">
                    <PencilLine className="size-5 text-black group-hover:text-blue-400 cursor-pointer" />
                  </div>
                </EditTeam>
                <DeleteTeam id={team._id!}>
                  <div className="group size-10 border-gray-300 hover:border-red-500 rounded-full justify-center items-center flex border">
                    <Trash2 className="size-5 text-black group-hover:text-red-400 cursor-pointer" />
                  </div>
                </DeleteTeam>
              </>
            }
          />
        ))}
      </div>

      <Pagination
        totalItems={totalTeams}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
