"use client";

import { useState } from "react";
import { Team } from "@/server/teamActions";

import { TeamCard } from "./team-card";
import Pagination from "./pagination";
import { RestoreTeam } from "./restore-team";
import { PermanentTeamDelete } from "./permanent-team";
import { Icons } from "@/components/icons";

interface DeletedTeamsProps {
  teams: Team[];
}

const ITEMS_PER_PAGE = 6;

export default function DeletedTeams({ teams }: DeletedTeamsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalTeams = teams.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTeams = teams.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Team Cards */}
      <div className="bg-white p-[29px] rounded-[65px] w-full my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {currentTeams.map((team) => (
            <TeamCard
              key={team._id!}
              {...team}
              buttons={
                <>
                  <PermanentTeamDelete id={team?._id!}>
                    <div className="group duration-300 flex-col hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
                      <Icons.trashUpper />
                      <Icons.trash className="size-4   cursor-pointer" />
                    </div>
                  </PermanentTeamDelete>

                  <RestoreTeam id={team?._id!}>
                    <div className="group duration-300  hover:border-black transition-all ease-in-out size-11 border-gray-300 rounded-full justify-center items-center flex border">
                      <Icons.restore className="size-5 cursor-pointer" />
                    </div>
                  </RestoreTeam>
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
    </>
  );
}
