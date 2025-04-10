"use client";

import { useQueryState } from "nuqs";
import { Search, Plus, Send, X } from "lucide-react";
import UserMain from "./_components/user-main";
import { UserResponse } from "@/server/userActions";
import DeletedUser from "./_components/deleted-user";
import { useEffect, useRef, useState } from "react";
import { Tab } from "../teams/_components/Tab";
import {
  activeUsers,
  inActiveUsers,
  userFilterFields,
} from "@/server/filterActions";
import { useAlert } from "@/hooks/useAlert";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import InvitePeople from "./[id]/_components/invite-people";
import FilterTabIcon from "@/icons/FilterTabIcon";
import { useSearchParams } from "next/navigation";
import { callAPIWithToken } from "@/server/helper";

const numericFields = ["updatedAt", "createdAt"];
const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

function TabDisplay() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "active_people",
  });

  const { showAlert } = useAlert();
  const [assets, setAssets] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
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

  const handleSearchAndFilter = async () => {
    // Combine search term and filters
    const query = {
      searchQuery: searchTerm || "",
      filters: filters.length > 0 ? filters : [],
    };

    try {
      setLoading(true);
      let res: UserResponse | null = null;
      if (activeTab === "active_people") {
        res = await activeUsers(query);
      } else if (activeTab === "inactive_people") {
        res = await inActiveUsers(query);
      }
      setAssets(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching issues:", error);
      showAlert({
        title: "Something went wrong",
        description: "Failed to fetch data",
        isFailure: true,
        key: "fetch-error-users",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    try {
      setLoading(true);
      const query = { searchQuery: searchTerm || "", filters: filters || [] };
      let res = null;
      if (activeTab === "active_people") {
        res = await activeUsers(query);
      } else if (activeTab === "inactive_people") {
        res = await inActiveUsers(query);
      }
      setAssets(res); // Update the state with fresh data
    } catch (error) {
      console.error("Error refreshing data:", error);
      showAlert({
        title: "Something went wrong",
        description: "Failed to refresh data",
        isFailure: true,
        key: "refresh-error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Trigger search and filter on searchTerm, filters, or pageLength change
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filters]);

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

  // Add this to your `TabDisplay` component

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

  const appliedFiltersCount = filters.length; // Count of applied filters

  const handleResetFilters = () => {
    // setFilters([]); // Clear all filters
    // setSearchTerm("");
    setFilterInputs([{ field: "", operator: "", value: "" }]); // Reset filters
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenFilter(false); // Close the filter modal
    handleResetFilters(); // Reset the filters
  };

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchTabData = async () => {
    try {
      setLoading(true);
      let response;
      switch (activeTab) {
        case "active_people":
          response = await activeUsers();
          break;
        case "inactive_people":
          response = await inActiveUsers();
          break;

        default:
          response = [];
      }
      setAssets(response); // Update state with the fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tab data:", error);
      showAlert({
        title: "Something went wrong",
        description: "Failed to fetch data",
        isFailure: true,
        key: "fetch-error-users-2",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "active_people":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <UserMain
                data={assets}
                setUsers={setAssets}
                onRefresh={refreshUserData}
              />
            )}
          </>
        );
      case "inactive_people":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <DeletedUser
                data={assets}
                setUsers={setAssets}
                onRefresh={refreshUserData}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "active_people",
      label: "Active People",
    },
    {
      key: "inactive_people",
      label: "Inactive People",
    },
  ];
  return (
    <>
      <div className="flex flex-col  mt-[88px]">
        <div className="flex items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
          <div className="flex items-center w-full -mb-9 -mt-1 gap-12">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-lg px-2 ">
              <div className="flex gap-2 justify-center items-center">
                <Search className=" size-[1.16rem]" />
                <input
                  type="text"
                  value={searchTerm || ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search People..."
                  className={`flex-grow bg-transparent outline-none text-black placeholder-black placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 `}
                />
              </div>
            </div>
            <InvitePeople>
              <div className="flex  cursor-pointer items-center rounded-[10px] border border-[rgba(0,0,0,0.2)]  p-[6px] gap-1 hover:bg-black hover:text-white hover:border-white group">
                <Send className="  size-4 -mt-0.5" />
                <span className="text-[15px]  pr-1 whitespace-nowrap group-hover:text-white font-gilroyMedium rounded-lg ">
                  Invite People
                </span>
              </div>
            </InvitePeople>
            <div className="relative">
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex  cursor-pointer items-center rounded-[10px] border border-[rgba(0,0,0,0.2)]  p-[6px] gap-1 hover:bg-black hover:text-white hover:border-white group"
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
              </button>

              {openFilter && (
                <div
                  ref={filterModalRef}
                  className="absolute top-16 right-0 z-50"
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
        </div>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
