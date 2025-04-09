"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAlert } from "@/hooks/useAlert";
import { activeUsers, userFilterFields } from "@/server/filterActions";
import { Plus, Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import InvitePeople from "./[id]/_components/invite-people";
import UserMain from "./_components/user-main";
import DeletedUser from "./_components/deleted-user";

const numericFields = ["updatedAt", "createdAt"];
const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

export const NewPage = () => {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active-users",
  });
  const { showAlert } = useAlert();

  //  ---------------
  // const [assets, setAssets] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const actualSearchTerm = useDeferredValue(searchTerm);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<any[]>([]); // Store applied filters
  const [filterInputs, setFilterInputs] = useState([
    { field: "", operator: "", value: "" },
  ]); // Store dynamic filter fields
  const [availableOperators, setAvailableOperators] =
    useState(generalOperators);
  const filterModalRef = useRef<HTMLDivElement>(null);

  // Close filter modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterModalRef.current &&
        !filterModalRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fetch-people", activeTab, actualSearchTerm],
    queryFn: async () => {
      const query = {
        searchQuery: actualSearchTerm ?? "",
        // filters: filters ?? [],
        isDeleted: activeTab === "active-users" ? false : true,
      };

      return activeUsers(query);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleApplyFilters = () => {
    // Validate and create filters
    const newFilters = filterInputs
      .filter((f) => f.field && f.operator && f.value)
      .map((f) => {
        let finalValue = f.value.trim();
        if (f.operator === "Like") finalValue = `%${finalValue}%`;
        return [f.field, f.operator, finalValue];
      });

    setFilters(newFilters); // Set the new filters
    setOpenFilter(false); // Close filter modal
  };

  const handleResetFilters = () => {
    setFilters([]);
    setSearchTerm("");
    setFilterInputs([{ field: "", operator: "", value: "" }]);
  };

  // const handleSearchAndFilter = async () => {
  //   // Combine search term and filters
  //   const query = {
  //     searchQuery: searchTerm || "",
  //     filters: filters.length > 0 ? filters : [],
  //   };

  //   try {
  //     // setLoading(true);
  //     // let res: UserResponse | null = null;
  //     // if (activeTab === "active_people") {
  //     //   res = await activeUsers(query);
  //     // } else if (activeTab === "inactive_people") {
  //     //   res = await inActiveUsers(query);
  //     // }
  //     // setAssets(res);
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching issues:", error);
  //     showAlert({
  //       title: "Something went wrong",
  //       description: "Failed to fetch data",
  //       isFailure: true,
  //       key: "fetch-error-users",
  //     });
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  /**
   * sd
   */
  // const refreshUserData = async () => {
  //   try {
  //     // setLoading(true);
  //     // const query = { searchQuery: searchTerm || "", filters: filters || [] };
  //     // let res = null;
  //     // if (activeTab === "active_people") {
  //     //   res = await activeUsers(query);
  //     // } else if (activeTab === "inactive_people") {
  //     //   res = await inActiveUsers(query);
  //     // }
  //     // setAssets(res); // Update the state with fresh data
  //   } catch (error) {
  //     console.error("Error refreshing data:", error);
  //     showAlert({
  //       title: "Something went wrong",
  //       description: "Failed to refresh data",
  //       isFailure: true,
  //       key: "refresh-error",
  //     });
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  // Trigger search and filter on searchTerm, filters, or pageLength change
  // useEffect(() => {
  //   handleSearchAndFilter();
  // }, [searchTerm, filters]);

  // Add a new filter input row
  const addFilter = () => {
    setFilterInputs([...filterInputs, { field: "", operator: "", value: "" }]);
  };

  // Remove a specific filter input row
  const removeFilter = (index: number) => {
    const updatedFilters = [...filterInputs];
    updatedFilters.splice(index, 1);
    setFilterInputs(updatedFilters);
  };

  // Update available operators based on the selected field
  const handleFieldChange = (index: number, field: string) => {
    const updatedFilters = [...filterInputs];
    updatedFilters[index].field = field;
    setFilterInputs(updatedFilters);

    if (numericFields.includes(field)) {
      setAvailableOperators(numericOperators);
    } else {
      setAvailableOperators(generalOperators);
    }
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    const updatedFilters: any = [...filterInputs];
    updatedFilters[index][key] = value;
    setFilterInputs(updatedFilters);
  };

  const appliedFiltersCount = filters.length; // Count of applied filters

  // const handleResetFilters = () => {
  //   // setFilters([]); // Clear all filters
  //   // setSearchTerm("");
  //   setFilterInputs([{ field: "", operator: "", value: "" }]); // Reset filters
  // };

  return (
    <section className="w-full h-fit relative  overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
          <div className="flex gap-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
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
            </Select>
            <div className="relative h-full">
              {/* <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex  cursor-pointer items-center rounded-[10px] border border-[rgba(0,0,0,0.2)] p-2 gap-1 hover:bg-black hover:text-white hover:border-white group"
              >
                <span className="text-[15px]  pr-1 whitespace-nowrap group-hover:text-white text-center font-gilroyMedium rounded-lg">
                  More Filters
                </span>
                {appliedFiltersCount > 0 && (
                  <span className="font-gilroySemiBold text-xs absolute -right-1 -top-2  bg-red-500 text-white rounded-full size-4 flex justify-center items-center">
                    <h1 className="text-[8px] font-gilroySemiBold">
                      {" "}
                      {appliedFiltersCount}
                    </h1>
                  </span>
                )}
              </button> */}

              {openFilter && (
                <div
                  ref={filterModalRef}
                  className="absolute top-16 left-0 z-50"
                >
                  <>
                    <div className="flex-col w-fit border border-gray-300 bg-white shadow-xl rounded-lg p-3 flex gap-4">
                      <div className="flex flex-col gap-3">
                        {filterInputs?.map((filter, index) => (
                          <div key={index} className="flex gap-4 items-center">
                            <div className="relative w-40">
                              <select
                                value={filter?.field}
                                onChange={(e) => {
                                  handleFieldChange(index, e.target.value);
                                  const selectElement = e.target;
                                  selectElement.classList.toggle(
                                    "text-black",
                                    selectElement.value !== "Select Field"
                                  );
                                  selectElement.classList.toggle(
                                    "text-gray-400",
                                    selectElement.value === "Select Field"
                                  );

                                  const svgIcon = selectElement.nextSibling;
                                  if (svgIcon) {
                                    // @ts-ignore
                                    svgIcon.classList.toggle(
                                      "text-black",
                                      selectElement.value !== "Select Field"
                                    );
                                    // @ts-ignore
                                    svgIcon.classList.toggle(
                                      "text-gray-400",
                                      selectElement.value === "Select Field"
                                    );
                                  }
                                }}
                                className="w-full font-gilroyMedium text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] appearance-none pr-10 relative"
                              >
                                <option>Select Field</option>
                                {userFilterFields?.map((key) => (
                                  <option
                                    key={key?.value}
                                    value={key?.value}
                                    className="text-black"
                                  >
                                    {key?.label}
                                  </option>
                                ))}
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-400"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                              <style jsx>{`
                                select {
                                  position: relative;
                                }
                                select option {
                                  position: relative;
                                  z-index: 10;
                                }
                              `}</style>
                            </div>

                            <div className="relative w-32">
                              <select
                                value={filter?.operator}
                                onChange={(e) => {
                                  handleInputChange(
                                    index,
                                    "operator",
                                    e.target.value
                                  );
                                  const selectElement = e.target;
                                  selectElement.classList.toggle(
                                    "text-black",
                                    selectElement.value !== "Select Field"
                                  );
                                  selectElement.classList.toggle(
                                    "text-gray-400",
                                    selectElement.value === "Select Field"
                                  );

                                  const svgIcon = selectElement.nextSibling;
                                  if (svgIcon) {
                                    // @ts-ignore
                                    svgIcon.classList.toggle(
                                      "text-black",
                                      selectElement.value !== "Select Field"
                                    );
                                    // @ts-ignore

                                    svgIcon.classList.toggle(
                                      "text-gray-400",
                                      selectElement.value === "Select Field"
                                    );
                                  }
                                }}
                                className="w-full font-gilroyMedium text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] appearance-none pr-10"
                              >
                                <option value="">Operators</option>
                                {availableOperators?.map((operator) => (
                                  <option key={operator} value={operator}>
                                    {operator}
                                  </option>
                                ))}
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-400"
                              >
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter value"
                              value={filter?.value}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="w-32 font-gilroyMedium placeholder:text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] "
                            />
                            {index > 0 && (
                              <X
                                className="size-3 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-700 transition-all duration-200"
                                onClick={() => removeFilter(index)}
                              />
                            )}
                          </div>
                        ))}
                        <div className="h-[1px] bg-gray-200"></div>
                        <div className="flex justify-between items-center">
                          <div
                            onClick={addFilter}
                            className="cursor-pointer flex items-center gap-2 py-2  text-[#4A4A4A] hover:text-black rounded-md transition-all duration-300"
                          >
                            <Plus className="size-4 -mt-0.5 text-gray-500" />

                            <h1 className="text-[#7F7F7F] text-sm font-gilroyRegular">
                              Add Filter
                            </h1>
                          </div>
                          <div className="flex gap-3">
                            <div
                              className="py-2 px-6 bg-[#F4F5F6] hover:bg-[#D1D7DB] text-sm rounded-md cursor-pointer transition-all duration-300"
                              onClick={handleResetFilters}
                            >
                              Clear
                            </div>
                            <div
                              className="py-2 px-6 bg-black text-white text-sm rounded-md cursor-pointer transition-all duration-300 hover:bg-[#333333]"
                              onClick={handleApplyFilters}
                            >
                              Apply
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg px-2 py-2 h-full">
              <div className="flex gap-2 justify-center items-center h-full">
                <Search className=" size-[1.16rem]" />
                <input
                  type="text"
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search People..."
                  className={`flex-grow h-full bg-transparent outline-none text-black placeholder-black placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 `}
                />
              </div>
            </div>
            <InvitePeople>
              <div className="flex cursor-pointer items-center rounded-lg  border-[rgba(0,0,0,0.2)] px-4 py-2 gap-1 bg-black text-white group">
                {/* <Send className="  size-4 -mt-0.5" /> */}
                <span className="text-sm  whitespace-nowrap group-hover:text-white font-gilroyMedium">
                  Invite People
                </span>
              </div>
            </InvitePeople>
          </div>
        </div>
        <TabsContent value="active-users">
          {/* {error ? (
            <p className="text-red-500 font-gilroyMedium">
              Failed to fetch data
            </p>
          ) : null}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full p-1 overflow-x-hidden">
            {isLoading ? (
              Array(5)
                .fill("a")
                .map((_, i) => <OrderDetailsCardSkeleton key={i} />)
            ) : data?.length === 0 ? (
              <div className="flex flex-col justify-center items-center sm:w-screen w-full overflow-hidden">
                <img src="empty-cart.svg" className="sm:size-60 size-56" />
                <div
                  className={`font-gilroy h-12 w-full text-center font-semibold leading-[19px] tracking-[0px]`}
                >
                  <span>
                    <p className="text-center font-gilroySemiBold  sm:text-xl leading-[19px]">
                      {"No orders yet. "}
                    </p>
                  </span>
                </div>
              </div>
            ) : (
              data?.map((order, i) => (
                <OrderDetailsCard key={`${order.orderId}-${i}`} order={order} />
              ))
            )}
          </section> */}
          {/* {JSON.stringify(data)} */}
          <UserMain
            peopleText="Active People"
            data={data}
            // setUsers={setAssets}
            // onRefresh={refreshUserData}
          />
        </TabsContent>
        <TabsContent value="inactive-users">
          {/* <UserMain
            peopleText="Inactive People"
            data={data}
            // setUsers={setAssets}
            // onRefresh={refreshUserData}
          /> */}
          <DeletedUser
            data={data}
            // setUsers={setAssets}
            // onRefresh={refreshUserData}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};
