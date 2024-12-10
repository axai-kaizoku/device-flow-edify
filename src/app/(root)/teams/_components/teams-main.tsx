"use client";

import { useState } from "react";
import { Team } from "@/server/teamActions";

import Pagination from "./pagination";
import { DeleteTeam } from "../[id]/_components/delete-team";
import EditTeam from "../[id]/_components/edit-team";
import { TeamCard } from "./team-card";
import { Icons } from "@/components/icons";

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
    <div className="bg-white p-[29px] rounded-[65px] w-full my-10">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {currentTeams.map((team) => (
          <TeamCard
            key={team._id}
            {...team}
            buttons={
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
            }
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          totalItems={totalTeams}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
