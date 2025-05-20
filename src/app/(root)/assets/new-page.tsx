"use client";

import { MoreFilters } from "@/components/filters/more-filters";
import { Pagination, PaginationSkeleton } from "@/components/pagination";

import { ActionBar } from "@/components/action-bar/action-bar";
import { ActionSearchBar } from "@/components/action-bar/action-search-bar";
import { buttonVariants } from "@/components/buttons/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { bulkAssetsUnassign, bulkDeleteAssets } from "@/server/deviceActions";
import { filterAssets } from "@/server/newFilterActions";
import type {
  FilterAssetsArgs,
  FilterSelection,
} from "@/server/types/newFilterTypes";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DeleteModal } from "../people/_components/deleteUserModal";
import CreateDevice from "./_components/addDevices/_components/create-device";
import AssignedAssets from "./_components/assigned-assets";

function NewPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "assigned-assets",
  });
  const [rawSearch, setRawSearch] = useQueryState("searchQuery", {
    defaultValue: "",
  });
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);
  const [filters, setFilters] = useState<FilterSelection>({});

  const searchTerm = useDeferredValue(rawSearch);

  const tupleFilters = useMemo(
    () =>
      Object.entries(filters).flatMap(([k, vals]) =>
        vals.map((v) => [k, "Equals", v])
      ),
    [filters]
  );

  const { data, status } = useQuery({
    queryKey: [
      "fetch-assets",
      {
        tab: activeTab,
        search: searchTerm,
        page,
        pageLimit,
        filters: tupleFilters,
      },
    ],
    queryFn: () =>
      filterAssets({
        type: activeTab.replace("-assets", "") as FilterAssetsArgs["type"],
        searchQuery: searchTerm,
        filters: tupleFilters,
        page,
        pageLimit,
      }),
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
  const [unassignOpen, setUnassignOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // --

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => {
      const deleteType = activeTab === "inactive-assets" ? "hard" : "soft";
      return bulkDeleteAssets(ids, deleteType);
    },
    onSuccess: (_res, ids) => {
      const deleteType = activeTab === "inactive-assets" ? "hard" : "soft";
      toast.success(
        `Assets ${
          deleteType === "soft" ? "deactivated" : "permanently deleted"
        } successfully!`
      );
      setSelectedIds([]);
      setDeleteOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["fetch-assets"],
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete Assets: ${error.message || error}`);
    },
  });

  /**
   * Checkboxes Bulk logic
   */
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error(`No Asset selected for deletion`);
      return;
    }

    deleteMutation.mutate(selectedIds);
  };

  const unassignMutation = useMutation({
    mutationFn: (ids: string[]) => bulkAssetsUnassign(ids),
    onSuccess: (res) => {
      toast.success("Assets Unassigned successfully!");
      setSelectedIds([]);
      setUnassignOpen(false);

      // invalidate just this queryKey so it refetches
      queryClient.invalidateQueries({
        queryKey: ["fetch-assets"],
      });
    },
    onError: (err) => {
      toast.error(`Failed to Unassign Assets: ${err}`);
    },
  });

  const handleBulkUnassign = () => {
    if (selectedIds.length === 0) {
      toast.error(`No Asset selected for deletion`);
      return;
    }

    unassignMutation.mutate(selectedIds);
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
        defaultValue="assigned-assets"
        className="w-full"
      >
        <ActionBar>
          <div className="flex gap-2 justify-center items-center">
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="assigned-assets"
            >
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-md">
                <SelectValue placeholder="People" />
              </SelectTrigger>

              <SelectContent className="font-gilroyMedium">
                <SelectItem
                  value="assigned-assets"
                  className="w-full py-2.5 rounded-lg"
                >
                  Assigned Assets
                </SelectItem>
                <SelectItem
                  value="unassigned-assets"
                  className="w-full py-2.5 rounded-lg"
                >
                  Unassigned Assets
                </SelectItem>
                <SelectItem
                  value="inactive-assets"
                  className="w-full py-2.5 rounded-lg"
                >
                  Inactive Assets
                </SelectItem>
              </SelectContent>
            </Select>
            <MoreFilters
              filterOptions={data?.filterOptions}
              loading={status === "pending"}
              key={activeTab}
              // mutationFn={filterAssets}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="flex gap-2 items-center justify-center">
            <ActionSearchBar
              placeholder="Search Assets..."
              value={rawSearch ?? ""}
              onChange={(e) => {
                setRawSearch(e.target.value);
                setPage(1);
              }}
            />
            {activeTab !== "inactive-assets" && (
              <CreateDevice>
                <div
                  className={buttonVariants({
                    variant: "primary",
                    className: "w-full",
                  })}
                >
                  Add Device
                </div>
              </CreateDevice>
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
                    <span className="text-sm  whitespace-nowrap group-hover:text-white font-gilroyMedium">
                      Delete
                    </span>
                  </div>
                </DeleteModal>

                {activeTab === "assigned-assets" && (
                  <DeleteModal
                    handleBulkAction={handleBulkUnassign}
                    open={unassignOpen}
                    setOpen={setUnassignOpen}
                    type="Unassign"
                  >
                    <div className={buttonVariants({ variant: "primary" })}>
                      <div className="  text-nowrap text-sm font-gilroyMedium">
                        Bulk Unassign
                      </div>
                    </div>
                  </DeleteModal>
                )}
              </>
            )}
          </div>
        </ActionBar>
        <TabsContent value="assigned-assets">
          <AssignedAssets
            key={"Assigned Assets"}
            assetsText="Assigned Assets"
            data={data}
            status={status}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleSelectionChange={handleSelectionChange}
          />
        </TabsContent>
        <TabsContent value="unassigned-assets">
          <AssignedAssets
            key={"Unassigned Assets"}
            data={data}
            status={status}
            assetsText="Unassigned Assets"
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleSelectionChange={handleSelectionChange}
          />{" "}
        </TabsContent>
        <TabsContent value="inactive-assets">
          <AssignedAssets
            data={data}
            key={"Inactive Assets"}
            status={status}
            assetsText="Inactive Assets"
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            handleSelectionChange={handleSelectionChange}
          />{" "}
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
          total={data?.total || 0}
          totalPages={data?.total_pages || 1}
          items={data?.devices || []}
          onPageChange={setPage}
          onPageLimitChange={(l) => {
            setPageLimit(l);
            setPage(1);
          }}
          className="mt-3"
        />
      )}
    </section>
  );
}

export default NewPage;
