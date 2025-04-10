"use client";

import { useState, useEffect, useRef } from "react";
import { useQueryState } from "nuqs";
import { Plus, Search, X } from "lucide-react"; // Importing icons from lucide-react

import AssignedAssets from "./_components/assigned-assets";
import UnAssignedAssets from "./_components/un-assigned-assets";
import InActiveAssets from "./_components/in-active-assets";
import { Tab } from "../teams/_components/Tab";
import CreateDevice from "./_components/addDevices/_components/create-device";
import { DeviceResponse } from "@/server/deviceActions";
import {
  assignedAssets,
  devicesFilterFields,
  filterDevice,
  inActiveAssets,
  unAssignedAssets,
} from "@/server/filterActions";
import { useAlert } from "@/hooks/useAlert";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import AssetsTabIcon from "@/icons/AssetsTabIcon";
import FilterTabIcon from "@/icons/FilterTabIcon";

const numericFields = ["updatedAt", "createdAt"];
const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

function TabDisplay() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "assigned_assets",
  });
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<DeviceResponse | null>(null);
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
      let res: any;
      if (activeTab === "inactive_assets") {
        res = await inActiveAssets(query);
      } else if (activeTab === "un_assigned_assets") {
        res = await unAssignedAssets(query);
      } else{
        res = await assignedAssets(query);
      }
      setAssets(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching issues:", error);
      showAlert({
        title: "Something went wrong !!",
        description: "Failed to fetch data. Please try again.",
        isFailure: true,
        key: "fetch-error-device",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshAssetsData = async () => {
    try {
      setLoading(true);
      const query = { searchQuery: searchTerm || "", filters: filters || [] };
      let res = null;
      if (activeTab === "assigned_assets") {
        res = await assignedAssets(query);
      } else if (activeTab === "un_assigned_assets") {
        res = await unAssignedAssets(query);
      }
      else if (activeTab === "inactive_assets") {
        res = await inActiveAssets(query);
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
  };

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        setLoading(true);
        let response;
        switch (activeTab) {
          case "assigned_assets":
            response = await assignedAssets();
            break;
          case "un_assigned_assets":
            response = await unAssignedAssets();
            break;
          case "inactive_assets":
            response = await inActiveAssets();
            break;
          default:
            response = [];
        }
        setAssets(response); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tab data:", error);
        showAlert({
          title: "Something went wrong !!",
          description: "Failed to fetch data. Please try again.",
          isFailure: true,
          key: "fetch-error-device-tab",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab]); // Dependency on activeTab to trigger the effect

  const renderContent = () => {
    switch (activeTab) {
      case "assigned_assets":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px] ">
                <DeviceFlowLoader />
              </div>
            ) : (
              <AssignedAssets data={assets} setAssets={setAssets} onRefresh={refreshAssetsData}/>
            )}
          </>
        );
      case "un_assigned_assets":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <UnAssignedAssets data={assets} setAssets={setAssets} onRefresh={refreshAssetsData}/>
            )}
          </>
        );
      case "inactive_assets":
        return (
          <>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px]">
                <DeviceFlowLoader />
              </div>
            ) : (
              <InActiveAssets data={assets} setAssets={setAssets} onRefresh={refreshAssetsData}/>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const tabs = [
    {
      key: "assigned_assets",
      label: "Assigned Assets",
      component: <AssignedAssets data={assets} setAssets={setAssets} />,
    },
    {
      key: "un_assigned_assets",
      label: "Unassigned Assets",
      component: <UnAssignedAssets data={assets} setAssets={setAssets} />,
    },
    {
      key: "inactive_assets",
      label: "Inactive Assets",
      component: <InActiveAssets data={assets} setAssets={setAssets} />,
    },
  ];

  return (
    <>
      <div className="flex flex-col  pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Assets
        </h1>
        <h2 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Manage Assets
        </h2>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full -mb-9 gap-12 -mt-1">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
                className="after:left-[-30%]  after:w-[160%]"
              />
            ))}
          </div>

          <div className="flex gap-2 relative">
            {/* Search */}
            <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />

              <input
                className=" bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assets..."
              />
            </div>

            <CreateDevice>
              <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <AssetsTabIcon className="text-black size-5" />
                <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Add Device
                </span>
              </div>
            </CreateDevice>

            <div className="relative">
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex items-center py-1.5 gap-1 px-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300"
              >
                <FilterTabIcon className="size-5" />
                <span className="text-base font-gilroyMedium pr-1">Filter</span>
                {appliedFiltersCount > 0 && (
                  <span className="font-gilroySemiBold text-xs  bg-red-500 text-white rounded-full size-5 flex justify-center items-center">
                    <h1> {appliedFiltersCount}</h1>
                  </span>
                )}
              </button>

              {openFilter && (
                <div
                  ref={filterModalRef}
                  className="absolute top-16 right-0 z-50"
                >
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
                                  //@ts-ignore
                                  svgIcon.classList.toggle(
                                    "text-black",
                                    selectElement.value !== "Select Field"
                                  );
                                  //@ts-ignore
                                  svgIcon.classList.toggle(
                                    "text-gray-400",
                                    selectElement.value === "Select Field"
                                  );
                                }
                              }}
                              className="w-full font-gilroyMedium text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] appearance-none pr-10 relative"
                            >
                              <option value="">Select Field</option>
                              {devicesFilterFields?.map((key) => (
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
                                  //@ts-ignore
                                  svgIcon.classList.toggle(
                                    "text-black",
                                    selectElement.value !== "Select Field"
                                  );
                                  //@ts-ignore
                                  svgIcon.classList.toggle(
                                    "text-gray-400",
                                    selectElement.value === "Select Field"
                                  );
                                }
                              }}
                              className="w-full font-gilroyMedium text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] appearance-none pr-10"
                            >
                              <option value=""> Operator</option>
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
                            value={filter?.value}
                            onChange={(e) =>
                              handleInputChange(index, "value", e.target.value)
                            }
                            className="w-32 font-gilroyMedium placeholder:text-gray-400 focus:outline-none bg-[#F4F5F6] px-4 py-2 text-xs rounded-md transition-all duration-300 hover:bg-[#E3E5E8] "
                            placeholder="Enter filter value"
                          />

                          {index > 0 && (
                            <X className="size-3 cursor-pointer w-4 h-4 text-gray-500 hover:text-gray-700 transition-all duration-200" onClick={() => removeFilter(index)}/>
                          )}
                        </div>
                      ))}
                      <div className="h-[1px] bg-gray-200"></div>
                      <div className="flex justify-between items-center">
                        <div
                          onClick={addFilter}
                          className="cursor-pointer flex items-center gap-2 py-2  text-[#4A4A4A] hover:text-black rounded-md transition-all duration-300"
                        >
                          <Plus className="size-4 -mt-0.5 text-gray-500"/>
                          <h1 className="text-sm font-gilroyRegular">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>
      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
