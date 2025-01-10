import React, { useState, useEffect } from "react";
import { issueFields } from "@/server/filterActions";

const numericFields = ["updatedAt", "createdAt"];
const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

const Filter = () => {
  const [filterInputs, setFilterInputs] = useState([
    { field: "", operator: "", value: "" },
  ]);
  const [filters, setFilters] = useState([]);
  const [searchTerm, set];
  const [availableOperators, setAvailableOperators] =
    useState(generalOperators);

  const addFilter = () => {
    setFilterInputs([...filterInputs, { field: "", operator: "", value: "" }]);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = [...filterInputs];
    updatedFilters.splice(index, 1);
    setFilterInputs(updatedFilters);
  };

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
    const updatedFilters = [...filterInputs];
    updatedFilters[index][key] = value;
    setFilterInputs(updatedFilters);
  };

  const handleApplyFilters = () => {
    const newFilters = filterInputs
      .filter((f) => f.field && f.operator && f.value)
      .map((f) => {
        let finalValue = f.value.trim();
        if (f.operator === "Like") finalValue = `%${finalValue}%`;
        return [f.field, f.operator, finalValue];
      });

    if (newFilters.length === 0) {
      alert("Please fill in all filter fields.");
      return;
    }

    onApplyFilters(newFilters);
  };

  return (
    <div className="flex-col w-fit border border-gray-300 bg-white shadow-lg rounded-lg p-4 flex gap-3">
      <div className="flex flex-col gap-4">
        {filterInputs.map((filter, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={filter.field}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              className="w-28 focus:outline-none bg-[#F4F5F6] px-3 h-6  text-xs rounded-md"
            >
              <option value="">Select Field</option>
              {issueFields.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <select
              value={filter.operator}
              onChange={(e) =>
                handleInputChange(index, "operator", e.target.value)
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
                handleInputChange(index, "value", e.target.value)
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
  );
};

export default Filter;
