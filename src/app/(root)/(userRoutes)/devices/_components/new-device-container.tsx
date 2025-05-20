"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { act, useDeferredValue, useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { fetchActiveTeams } from "@/server/teamActions";
import InvitePeople from "@/app/(root)/people/[id]/_components/invite-people";
import CreateTeam from "@/app/(root)/teams/_components/create-team";
import TeamsMain from "@/app/(root)/teams/_components/teams-main";
import { getIssueByUserId } from "@/server/issueActions";
import { getDevicesByUserId } from "@/server/deviceActions";
import Devices from "./devicesPage";
import Issue from "./issuePage";
import { ActionBar } from "@/components/action-bar/action-bar";
import { getAllTicketsEmployee } from "@/server/ticketActions";

const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

export const DeviceIssueEmployee = () => {
  const [activeTab, setActiveTab] = useState("devices");

  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const actualSearchTerm = useDeferredValue(searchTerm);
  useState(generalOperators);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["teams-employee-side", activeTab],
    queryFn: async () => {
      if (activeTab === "devices") {
        return getDevicesByUserId();
      } else {
        return getAllTicketsEmployee();
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full h-fit relative  overflow-y-auto hide-scrollbar">
      {/* <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="devices"
        className="w-full"
      > */}
        {/* <ActionBar> */}
          {/* <div className="flex gap-2">
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="devices"
            >
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-lg">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem
                  value="devices"
                  className="w-full py-2.5 rounded-lg"
                >
                  Assets assigned
                </SelectItem>
                <SelectItem value="issues" className="w-full py-2.5 rounded-lg">
                  Tickets Raised
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="relative h-full"></div>
          </div> */}
          {/* <div className="flex gap-2"> */}
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
          {/* </div> */}
        {/* </ActionBar> */}
        {/* <TabsContent value="devices">
          <Devices devices={data} />
        </TabsContent> */}
        {/* <TabsContent value="issues">
          <Issue issues={data} />
        </TabsContent> */}
      {/* </Tabs> */}
      <Devices devices={data} />
    </section>
  );
};
