"use client";

import { useState, Suspense, useEffect } from "react";
import { useQueryState } from "nuqs";
import { Search, Download } from "lucide-react"; // Importing icons from lucide-react

import Spinner from "@/components/Spinner";
import AssignedAssets from "./_components/assigned-assets";
import UnAssignedAssets from "./_components/un-assigned-assets";
import InActiveAssets from "./_components/in-active-assets";
import { Tab } from "../teams/_components/Tab";
import CreateDevice from "./_components/addDevices/_components/create-device";
import { Icons } from "@/components/icons";
import { DeviceResponse } from "@/server/deviceActions";
import {
  assignedAssets,
  devicesFields,
  filterDevice,
  inActiveAssets,
  unAssignedAssets,
} from "@/server/filterActions";
import useAlert from "@/hooks/useAlert";
import { GlobalAlert } from "@/components/global-alert";
const numericFields = ["updatedAt", "createdAt"];
const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

function TabDisplay({ data }: { data?: DeviceResponse }) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "assigned_assets",
  });
  const { hideAlert, isOpen, showAlert } = useAlert();

  const [assets, setAssets] = useState<DeviceResponse | null>(null);
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<any[]>([]); // Store applied filters
  const [filterInputs, setFilterInputs] = useState([
    { field: "", operator: "", value: "" },
  ]); // Store dynamic filter fields
  const [availableOperators, setAvailableOperators] =
    useState(generalOperators);

  const handleSearchAndFilter = async () => {
    // Combine search term and filters
    const query = {
      searchQuery: searchTerm || "",
      filters: filters.length > 0 ? filters : [],
    };

    try {
      const res = await filterDevice(query);
      setAssets(res);
    } catch (error) {
      console.error("Error fetching issues:", error);
      showAlert();
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

  const handleApplyFilters = () => {
    // Validate and create filters
    const newFilters = filterInputs
      .filter((f) => f.field && f.operator && f.value)
      .map((f) => {
        let finalValue = f.value.trim();
        if (f.operator === "Like") finalValue = `%${finalValue}%`;
        return [f.field, f.operator, finalValue];
      });

    if (newFilters.length === 0) {
      showAlert();

      return;
    }

    setFilters(newFilters); // Set the new filters
    setOpenFilter(false); // Close filter modal
  };

  const handleResetFilters = () => {
    setFilters([]); // Clear all filters
    setSearchTerm("");
    setFilterInputs([{ field: "", operator: "", value: "" }]); // Reset filters
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchTabData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching tab data:", error);
        showAlert();
      }
    };

    fetchTabData();
  }, [activeTab]); // Dependency on activeTab to trigger the effect

  const renderContent = () => {
    switch (activeTab) {
      case "assigned_assets":
        return (
          <Suspense fallback={<Spinner />}>
            <AssignedAssets data={assets} />
          </Suspense>
        );
      case "un_assigned_assets":
        return (
          <Suspense fallback={<Spinner />}>
            <UnAssignedAssets data={assets} />
          </Suspense>
        );
      case "inactive_assets":
        return (
          <Suspense fallback={<Spinner />}>
            <InActiveAssets data={assets} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  const tabs = [
    {
      key: "assigned_assets",
      label: "Assigned Assets",
      component: <AssignedAssets data={assets} />,
    },
    {
      key: "un_assigned_assets",
      label: "Unassigned Assets",
      component: <UnAssignedAssets data={assets} />,
    },
    {
      key: "inactive_assets",
      label: "Inactive Assets",
      component: <InActiveAssets data={assets} />,
    },
  ];

  return (
    <>
      <GlobalAlert
        isOpen={isOpen}
        onClose={hideAlert}
        title={"Failed to fetch data. Please try again."}
        description="Something went wrong !!"
        isFailure={true}
      />

      <div className="flex flex-col ">
        <h1 className="text-gray-400 font-gilroySemiBold text-lg">Assets</h1>
        <h2 className="text-3xl font-gilroyBold py-4">Manage Assets</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full -mb-8 gap-12">
            {tabs?.map((tab) => (
              <Tab
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>

          <div className="flex gap-2 relative">
            {/* Search */}
            <div className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />

              <input
                className="text-base bg-transparent font-gilroyMedium whitespace-nowrap focus:outline-none"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search issues..."
              />
            </div>

            {/* Add Device */}
            <div className="flex items-center relative gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Icons.tab_add_device />
              <span className="text-sm font-gilroyMedium whitespace-nowrap">
                <CreateDevice button={"Add Device"} />
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300"
              >
                <Icons.tab_filter />
                <span className="text-base font-gilroyMedium">Filter</span>
              </button>

              {openFilter && (
                <div className="absolute top-16 right-0 z-50">
                  <>
                    <div className="flex-col w-fit border border-gray-300 bg-white shadow-lg rounded-lg p-4 flex gap-3">
                      <div className="flex flex-col gap-4">
                        {filterInputs.map((filter, index) => (
                          <div key={index} className="flex gap-2">
                            <select
                              value={filter.field}
                              onChange={(e) =>
                                handleFieldChange(index, e.target.value)
                              }
                              className="w-28 focus:outline-none bg-[#F4F5F6] px-3 h-6  text-xs rounded-md"
                            >
                              <option value="">Select Field</option>
                              {devicesFields.map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </select>
                            <select
                              value={filter.operator}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "operator",
                                  e.target.value
                                )
                              }
                              className="w-[72px] focus:outline-none bg-[#F4F5F6] px-3 h-6  text-xs rounded-md"
                            >
                              <option value="">Select Operator</option>
                              {availableOperators.map((operator) => (
                                <option key={operator} value={operator}>
                                  {operator}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={filter.value}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                              className="w-28 focus:outline-none bg-[#F4F5F6] px-3 h-6  text-xs rounded-md"
                              placeholder="Enter filter value"
                            />
                            {index > 0 && (
                              <svg
                                onClick={() => removeFilter(index)}
                                className="size-3 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                              >
                                <path
                                  d="M1.81787 1.2684L14.4117 13.1024"
                                  stroke="#AEAEAE"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M13.8442 1.19273L2.30198 13.5789"
                                  stroke="#AEAEAE"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        ))}
                        <div className="h-[1px] bg-gray-200"></div>
                        <div className="flex justify-between">
                          <div
                            onClick={addFilter}
                            className="cursor-pointer flex justify-center items-center gap-1.5"
                          >
                            <svg
                              className="size-3 -mt-0.5 "
                              width="19"
                              height="18"
                              viewBox="0 0 19 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.80566 8.98486H17.4177"
                                stroke="#7F7F7F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M9.61182 16.7909L9.61182 1.17883"
                                stroke="#7F7F7F"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            <h1 className="text-[#7F7F7F] text-sm font-gilroyRegular">
                              Add Filter
                            </h1>
                          </div>
                          <div className="flex gap-2">
                            <div
                              className="py-0.5 flex justify-center bg-[#F4F5F6] hover:bg-[#C0C6CB]/50 items-center px-4  rounded-md text-sm font-gilroyRegular  cursor-pointer"
                              onClick={handleResetFilters}
                            >
                              Clear
                            </div>
                            <div
                              className="py-0.5 flex justify-center items-center bg-black cursor-pointer px-4 rounded-md text-sm font-gilroyRegular text-white"
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

            {/* Download */}
            <button className="flex items-center gap-1  p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Download size={20} className="text-[#7F7F7F]" />
              <span className="text-sm font-gilroyMedium">Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>
      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
