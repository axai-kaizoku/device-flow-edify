"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ActionBar } from "@/components/action-bar/action-bar";
import { ActionSearchBar } from "@/components/action-bar/action-search-bar";
import { useQueryState } from "nuqs";
import TicketsDataTable from "./tickets-data.table";
import { getAllTickets } from "@/server/ticketActions";
import { useDebounce } from "@/hooks/use-debounce";
import { buttonVariants } from "@/components/buttons/Button";
import RaiseTicket from "./raise-ticket.dialog";

function Main({ isAdmin = false }: { isAdmin: boolean }) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "open",
  });
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const actualSearchTerm = useDebounce(searchTerm, 300);

  const { data, status } = useQuery({
    queryKey: ["fetch-all-tickets", activeTab, actualSearchTerm],
    queryFn: async () => {
      const query = {
        searchQuery: actualSearchTerm ?? "",
        status: activeTab,
      };

      return getAllTickets(query);
    },
  });

  return (
    <section className="w-full h-fit relative overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="open"
        className="w-full"
      >
        <ActionBar>
          <div className="flex gap-2">
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="open"
            >
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] ">
                <SelectValue placeholder="Tickets" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem value="open" className="w-full py-2.5 rounded-lg">
                  Open Tickets
                </SelectItem>
                <SelectItem value="close" className="w-full py-2.5 rounded-lg">
                  Closed Tickets
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <ActionSearchBar
                placeholder="Search Tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <RaiseTicket>
              <div
                className={buttonVariants({
                  variant: "primary",
                  className: "w-full",
                })}
              >
                Raise a Ticket
              </div>
            </RaiseTicket>
          </div>
        </ActionBar>
        <TabsContent value="open">
          <TicketsDataTable
            isAdmin={isAdmin}
            data={data}
            status={status}
            issuesText="open"
            countIssues={data}
          />
        </TabsContent>
        <TabsContent value="close">
          <TicketsDataTable
            isAdmin={isAdmin}
            data={data}
            status={status}
            issuesText="close"
            countIssues={data}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default Main;
