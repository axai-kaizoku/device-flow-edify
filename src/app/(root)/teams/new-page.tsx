"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useMemo, useState } from "react";

import { ActionBar } from "@/components/action-bar/action-bar";
import { ActionSearchBar } from "@/components/action-bar/action-search-bar";
import { buttonVariants } from "@/components/buttons/Button";
import { MoreFilters } from "@/components/filters/more-filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterTeams } from "@/server/newFilterActions";
import {
  type FilterSelection,
  type FilterTeamsArgs,
} from "@/server/types/newFilterTypes";
import { useQueryState } from "nuqs";
import InvitePeople from "../people/[id]/_components/invite-people";
import CreateTeam from "./_components/create-team";
import TeamsMain from "./_components/teams-main";

export const NewPageTeams = () => {
  // const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active-teams",
  });

  const [rawSearch, setRawSearch] = useQueryState("searchQuery", {
    defaultValue: "",
  });
  const [filters, setFilters] = useState<FilterSelection>({});

  const tupleFilters = useMemo(
    () =>
      Object.entries(filters).flatMap(([k, vals]) =>
        vals.map((v) => [k, "Equals", v])
      ),
    [filters]
  );
  // Filters
  // const [filtersActive, setFiltersActive] = useState(false);
  // const filterKey = activeTab;

  // const { data, status } = useQuery({
  //   queryKey: ["teams", activeTab],
  //   queryFn: async () => {
  //     const query = {
  //       searchQuery: searchTerm ?? "",
  //       isDeleted: activeTab === "active-teams" ? false : true,
  //     };

  //     return fetchActiveTeams(query);
  //   },
  //   staleTime: 1000 * 60 * 5,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  const searchTerm = useDeferredValue(rawSearch);

  // const teamsQuery = useQuery({
  //   queryKey: ["teams", activeTab, searchTerm, filtersActive],
  //   queryFn: async () => {
  //     const args: FilterTeamsArgs = {
  //       type: activeTab.replace("-teams", "") as FilterTeamsArgs["type"],
  //       searchQuery: searchTerm,
  //       filters: [],
  //     };
  //     return filterTeams(args);
  //   },
  //   staleTime: 5 * 60 * 1000,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  // });

  const { data, status } = useQuery({
    queryKey: [
      "teams",
      {
        tab: activeTab,
        search: searchTerm,
        filters: tupleFilters,
      },
    ],
    queryFn: () =>
      filterTeams({
        type: activeTab.replace("-teams", "") as FilterTeamsArgs["type"],
        searchQuery: searchTerm,
        filters: tupleFilters,
      }),
    refetchOnWindowFocus: false,
  });

  const handleFilterChange = (newFilter: FilterSelection) => {
    setFilters(newFilter);
  };

  // const filterMutation = useMutation({
  //   mutationFn: filterTeams,
  //   onSuccess: () => teamsQuery.refetch(),
  // });

  // useEffect(() => {
  //   // reset controls
  //   setRawSearch("");
  //   setFiltersActive(false);

  //   // invalidate queries to ensure fresh data
  //   queryClient.invalidateQueries({ queryKey: ["teams"] });
  //   teamsQuery.refetch();
  // }, [activeTab]);

  // const handleFilterChange = (filters: FilterSelection) => {
  //   // transform to tuple list
  //   const tupleFilters: FilterTeamsArgs["filters"] = Object.entries(
  //     filters
  //   ).flatMap(([key, vals]) => vals.map((val) => [key, "Equals", val]));
  //   setFiltersActive(true);

  //   const args: FilterTeamsArgs = {
  //     type: activeTab.replace("-assets", "") as FilterTeamsArgs["type"],
  //     searchQuery: searchTerm,
  //     filters: tupleFilters,
  //   };
  //   filterMutation.mutate(args);
  // };

  // const data = filtersActive ? filterMutation.data : teamsQuery.data;
  // const status = filtersActive ? filterMutation.status : teamsQuery.status;

  return (
    <section className="w-full h-fit relative  overflow-y-auto hide-scrollbar">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="active-teams"
        className="w-full"
      >
        <ActionBar>
          <div className="flex gap-2">
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="active-teams"
            >
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-md">
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
            <MoreFilters
              key={`${activeTab}teams-more`}
              filterOptions={data?.filterOptions}
              onFilterChange={handleFilterChange}
              loading={status === "pending"}
              isRadio
            />
          </div>

          <div className="flex gap-2 items-center">
            <ActionSearchBar
              type="text"
              value={rawSearch || ""}
              onChange={(e) => setRawSearch(e.target.value)}
              placeholder="Search Teams..."
            />
            {activeTab === "active-teams" && (
              <>
                <InvitePeople>
                  <div className={buttonVariants({ variant: "outlineTwo" })}>
                    <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                      Invite People
                    </div>
                  </div>
                </InvitePeople>

                <CreateTeam>
                  <div className={buttonVariants({ variant: "primary" })}>
                    <span className="text-sm  whitespace-nowrap group-hover:text-white font-gilroyMedium">
                      Create Team
                    </span>
                  </div>
                </CreateTeam>
              </>
            )}
          </div>
        </ActionBar>
        <TabsContent value="active-teams">
          <TeamsMain teams={data} status={status} value="active-teams" />
        </TabsContent>
        <TabsContent value="inactive-teams">
          <TeamsMain teams={data} status={status} value="inactive-teams" />
        </TabsContent>
      </Tabs>
    </section>
  );
};
