"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { buttonVariants } from "@/components/buttons/Button";
import { MoreFilters } from "@/components/filters/more-filters";
import { Pagination, PaginationSkeleton } from "@/components/pagination";

import { ActionBar } from "@/components/action-bar/action-bar";
import { ActionSearchBar } from "@/components/action-bar/action-search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterPeople } from "@/server/newFilterActions";
import type {
  FilterPeopleArgs,
  FilterSelection,
} from "@/server/types/newFilterTypes";
import { bulkDeleteUsers } from "@/server/userActions";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import BulkMove from "../teams/[id]/_components/new-bulk-move";
import InvitePeople from "./[id]/_components/invite-people";
import { DeleteModal } from "./_components/deleteUserModal";
import UserMain from "./_components/user-main";

export const NewPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active-users",
  });
  const [rawSearch, setRawSearch] = useQueryState("searchQuery", {
    defaultValue: "",
  });

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);

  const [filters, setFilters] = useState<FilterSelection>({});

  const searchTerm = useDeferredValue(rawSearch);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tupleFilters = useMemo(
    () =>
      Object.entries(filters).flatMap(([k, vals]) =>
        vals.map((v) => [k, "Equals", v])
      ),
    [filters]
  );

  const { data, status } = useQuery({
    queryKey: [
      "fetch-people",
      {
        tab: activeTab,
        search: searchTerm,
        page,
        pageLimit,
        filters: tupleFilters,
      },
    ],
    queryFn: () =>
      filterPeople({
        type: activeTab.replace("-users", "") as FilterPeopleArgs["type"],
        searchQuery: searchTerm,
        filters: tupleFilters,
        page,
        pageLimit,
      }),
    // staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setRawSearch("");
    setPage(1);
    setPageLimit(20);
    setFilters({});
  }, [activeTab]);

  const handleFilterChange = (newFilter: FilterSelection) => {
    setPage(1); // reset to first page
    setFilters(newFilter);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);

  const bulkDeleteMutation = useMutation({
    mutationFn: ({ selectedIds }: { selectedIds: string[] }) => {
      const deleteType = activeTab === "active-users" ? "soft" : "hard";
      return bulkDeleteUsers(selectedIds, deleteType);
    },
    onSuccess: () => {
      setDeleteOpen(false);
      toast.success(
        `Users ${
          activeTab === "active-users" ? "deactivated" : "permanently deleted"
        } successfully!`
      );
      setSelectedIds([]);

      queryClient.invalidateQueries({
        queryKey: ["fetch-people"],
      });
    },
    onError: (error) => {
      toast.error(`Failed to delete Users: ${error}`);
    },
  });

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error(`No user selected for deletion`);
      return;
    }

    bulkDeleteMutation.mutate({ selectedIds });
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <section className="w-full h-fit relative  overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(tab) => {
          setActiveTab(tab);
          setSelectedIds([]);
        }}
        defaultValue="active-users"
        className="w-full"
        key={`${activeTab}people tabs`}
      >
        <ActionBar key={`${activeTab}people-action-bar`}>
          <div className="flex gap-2">
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="active-users"
            >
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-lg">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem
                  value="active-users"
                  className="w-full py-2.5 rounded-lg"
                >
                  Active People
                </SelectItem>
                <SelectItem
                  value="inactive-users"
                  className="w-full py-2.5 rounded-lg"
                >
                  Inactive People
                </SelectItem>
              </SelectContent>
            </Select>{" "}
            <MoreFilters
              key={`${activeTab}people`}
              filterOptions={data?.filterOptions}
              loading={status === "pending"}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="flex gap-2">
            <ActionSearchBar
              value={rawSearch || ""}
              onChange={(e) => setRawSearch(e.target.value)}
              placeholder="Search People..."
            />
            {activeTab === "active-users" && (
              <InvitePeople>
                <div className={buttonVariants({ variant: "primary" })}>
                  Invite People
                </div>
              </InvitePeople>
            )}
            {selectedIds.length > 0 && (
              <>
                <DeleteModal
                  handleBulkAction={handleBulkDelete}
                  open={deleteOpen}
                  setOpen={setDeleteOpen}
                  type="Delete"
                  key={activeTab}
                >
                  <div className={buttonVariants({ variant: "primary" })}>
                    Delete
                  </div>
                </DeleteModal>

                {activeTab !== "inactive-users" && (
                  <BulkMove
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  >
                    <div className={buttonVariants({ variant: "primary" })}>
                      Bulk Move
                    </div>
                  </BulkMove>
                )}
              </>
            )}
          </div>
        </ActionBar>
        <TabsContent value="active-users" key={"active-users"}>
          <UserMain
            peopleText="Active People"
            key={"Active People"}
            data={data}
            status={status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleSelectionChange={handleSelectionChange}
          />
        </TabsContent>
        <TabsContent value="inactive-users">
          <UserMain
            key={"Inactive People"}
            status={status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleSelectionChange={handleSelectionChange}
            peopleText="Inactive People"
            data={data}
          />
        </TabsContent>
      </Tabs>
      {status === "pending" ? (
        <>
          <PaginationSkeleton className="mt-3" />
        </>
      ) : (
        <Pagination
          page={page}
          pageLimit={pageLimit}
          key={`${activeTab}people-pagination`}
          total={data?.total || 0}
          items={data?.users || []}
          totalPages={data?.total_pages || 1}
          onPageChange={setPage}
          onPageLimitChange={(l) => {
            setPageLimit(l);
            setPage(1);
          }}
          className="mt-4"
        />
      )}
    </section>
  );
};
