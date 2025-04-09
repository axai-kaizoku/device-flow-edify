"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchActiveTeams } from "@/server/teamActions";
import { useQueryState } from "nuqs";
import InvitePeople from "../people/[id]/_components/invite-people";
import CreateTeam from "./_components/create-team";
import TeamsMain from "./_components/teams-main";

export const NewPageTeams = () => {
  const [activeTab, setActiveTab] = useState("active-teams");

  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const actualSearchTerm = useDeferredValue(searchTerm);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["teams", activeTab],
    queryFn: async () => {
      const query = {
        searchQuery: actualSearchTerm ?? "",
        isDeleted: activeTab === "active-teams" ? false : true,
      };

      return fetchActiveTeams(query);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full h-fit relative  overflow-y-auto hide-scrollbar">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
          <div className="flex gap-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-lg">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem
                  value="active-teams"
                  className="w-full py-2.5 rounded-lg"
                >
                  Active Teams
                </SelectItem>
                <SelectItem
                  value="inactive-teams"
                  className="w-full py-2.5 rounded-lg"
                >
                  Inactive Teams
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="relative h-full"></div>
          </div>
          <div className="flex gap-2">
            {/* <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg px-2 py-2 h-full">
              <div className="flex gap-2 justify-center items-center h-full">
                <Search className=" size-[1.16rem]" />
                <input
                  type="text"
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Teams..."
                  className={`flex-grow h-full bg-transparent outline-none text-black placeholder-black placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 `}
                />
              </div>
            </div> */}

            <InvitePeople>
              <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
                <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                  Invite People
                </div>
              </div>
            </InvitePeople>
            <CreateTeam>
              <div className="flex cursor-pointer items-center rounded-lg  border-[rgba(0,0,0,0.2)] px-4 py-2 gap-1 bg-black text-white group">
                <span className="text-sm  whitespace-nowrap group-hover:text-white font-gilroyMedium">
                  Create Team
                </span>
              </div>
            </CreateTeam>
          </div>
        </div>
        <TabsContent value="active-teams">
          <TeamsMain teams={data} />
        </TabsContent>
        <TabsContent value="inactive-teams">
          <TeamsMain teams={data} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
