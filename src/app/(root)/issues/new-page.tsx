"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoreFilters } from "@/components/filters/more-filters";
import { Pagination, PaginationSkeleton } from "@/components/pagination";
import { filterIssues } from "@/server/newFilterActions";
import type {
  FilterIssuesArgs,
  FilterSelection,
} from "@/server/types/newFilterTypes";

import { Search } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { ActionBar } from "@/components/action-bar/action-bar";
import { ActionSearchBar } from "@/components/action-bar/action-search-bar";
import { useQueryState } from "nuqs";
import IssueTableDisplay from "./_components/IssueTableDisplay";
import { getAllTickets } from "@/server/ticketActions";
import { useDebounce } from "@/hooks/use-debounce";
import RaiseTicket from "../(userRoutes)/tickets/[id]/_components/raise-ticket";
import { buttonVariants } from "@/components/buttons/Button";

function NewPage() {
  const queryClient = useQueryClient();

  //Tabs and query state
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "open",
  });
  const [rawSearch, setRawSearch] = useQueryState("searchQuery", {
    defaultValue: "",
  });
  const searchTerm = useDeferredValue(rawSearch);

  // pagination
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);

  /**
   * Don't remove this commented code,new filter logic here
   */
  // Filters
  // const [filtersActive, setFiltersActive] = useState(false);
  // const filterKey = activeTab;

  // const issuesQuery = useQuery({
  //   queryKey: [
  //     "fetch-issues",
  //     activeTab,
  //     searchTerm,
  //     page,
  //     pageLimit,
  //     filtersActive,
  //   ],
  //   queryFn: async () => {
  //     const args: FilterIssuesArgs = {
  //       type: activeTab as FilterIssuesArgs["type"],
  //       searchQuery: searchTerm,
  //       filters: [],
  //       page,
  //       pageLimit,
  //     };
  //     return filterIssues(args);
  //   },
  //   staleTime: 5 * 60 * 1000,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  // });

  const { data, status } = useQuery({
    queryKey: ["fetch-all-tickets", activeTab, searchTerm],
    queryFn: async () => {
      const query = {
        searchQuery: searchTerm ?? "",
        status: activeTab,
      };

      return getAllTickets(query);
    },
  });

  /**
   * Don't remove this commented code,new filter logic here
   */
  // const filterMutation = useMutation({
  //   mutationFn: filterIssues,
  //   onSuccess: () => issuesQuery.refetch(),
  // });

  // useEffect(() => {
  //   // reset controls
  //   setRawSearch("");
  //   setPage(1);
  //   setPageLimit(20);
  //   setFiltersActive(false);

  //   // invalidate queries to ensure fresh data
  //   queryClient.invalidateQueries({ queryKey: ["fetch-issues"] });
  //   issuesQuery.refetch();
  // }, [activeTab]);

  // const handleFilterChange = (filters: FilterSelection) => {
  //   // transform to tuple list
  //   const tupleFilters: FilterIssuesArgs["filters"] = Object.entries(
  //     filters
  //   ).flatMap(([key, vals]) => vals.map((val) => [key, "Equals", val]));
  //   setFiltersActive(true);

  //   const args: FilterIssuesArgs = {
  //     type: activeTab.replace("-assets", "") as FilterIssuesArgs["type"],
  //     searchQuery: searchTerm,
  //     filters: tupleFilters,
  //     page,
  //     pageLimit,
  //   };
  //   filterMutation.mutate(args);
  // };

  // const data = filtersActive ? filterMutation.data : issuesQuery.data;
  // const status = filtersActive ? filterMutation.status : issuesQuery.status;

  // const invalidateAndRefetch = async (tabs: string[]) => {
  //   for (const t of tabs) {
  //     await queryClient.invalidateQueries({
  //       queryKey: ["fetch-assets", t, searchTerm],
  //     });
  //   }
  //   issuesQuery.refetch();
  // };

  return (
    <section className="w-full h-fit relative  overflow-hidden">
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
            {/* <MoreFilters
              key={filterKey}
              onFilterChange={handleFilterChange}
              mutationFn={filterIssues}
            /> */}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <ActionSearchBar
                placeholder="Search Tickets..."
                value={searchTerm}
                onChange={(e) => setRawSearch(e.target.value)}
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
          <IssueTableDisplay
            data={data}
            status={status}
            issuesText="open"
            countIssues={data}
          />
        </TabsContent>
        <TabsContent value="close">
          <IssueTableDisplay
            data={data}
            status={status}
            issuesText="close"
            countIssues={data}
          />
        </TabsContent>
      </Tabs>
      {status === "pending" ? (
        <PaginationSkeleton className="mt-3" />
      ) : (
        <Pagination
          page={page}
          pageLimit={pageLimit}
          total={data?.total || 0}
          totalPages={data?.total_pages || 1}
          items={data?.devices || []}
          onPageChange={setPage}
          onPageLimitChange={setPageLimit}
          className="mt-3"
        />
      )}
    </section>
  );
}

export default NewPage;
