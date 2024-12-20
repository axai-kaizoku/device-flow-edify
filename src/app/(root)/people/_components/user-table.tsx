"use client";

import { Table } from "@/components/wind/Table";
import { Icon } from "@/components/wind/Icons";
import { deleteUser, User } from "@/server/userActions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { filterUsers, usersFields } from "@/server/filterActions";

const numericFields = ["onboarding_date", "date_of_birth"];

const numericOperators = [">=", "<=", ">", "<", "Equals"];
const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

export default function UserTable({ users }: { users: User[] }) {
  const [user, setUser] = useState(users);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<any[]>([]); // Store applied filters
  const [pageLength, setPageLength] = useState(20); // Default is 20
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
      pageLength: pageLength,
    };

    try {
      const res = await filterUsers(query);
      setUser(res.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  // Trigger search and filter on searchTerm, filters, or pageLength change
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filters, pageLength]);

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
    setAvailableOperators(generalOperators);
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
      alert("Please fill in all filter fields.");
      return;
    }

    setFilters(newFilters); // Set the new filters
    setOpenFilter(false); // Close filter modal
  };

  const softDelete = async (data: any) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteUser(data._id);
      setUser((prevUsers) => prevUsers.filter((user) => user._id !== data._id));
      alert("User Deleted!");
    } catch (e: any) {
      // Check if the error has a message from the API response
      const errorMessage =
        e.response?.data?.message || e.message || "Failed to delete user.";
      alert(errorMessage);
    }
  };

  const handleResetFilters = () => {
    setFilters([]); // Clear all filters
    setSearchTerm("");
    setFilterInputs([{ field: "", operator: "", value: "" }]); // Reset filters
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border p-2"
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search People..."
      />
      <div className="flex gap-4 w-full">
        <button
          className="bg-gray-400 p-2 rounded text-black w-40"
          onClick={() => setOpenFilter(!openFilter)}
        >
          Filter
        </button>
        {filters.length > 0 && (
          <button
            className="bg-red-400 p-2 rounded text-white w-10"
            onClick={handleResetFilters}
          >
            X
          </button>
        )}
      </div>

      {openFilter && (
        <div className="py-4">
          <div className="flex flex-col gap-4">
            {/* Dynamically render filter inputs */}
            {filterInputs.map((filter, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={filter.field}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className="border w-60 rounded p-2 outline-none focus:ring-2"
                >
                  <option value="">Select Field</option>
                  {usersFields.map((key) => (
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
                  className="border w-60 rounded p-2 outline-none focus:ring-2"
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
                  className="border w-60 rounded p-2 outline-none focus:ring-2"
                  placeholder="Enter filter value"
                />
                {index > 0 && (
                  <button
                    className="bg-red-500 p-2 rounded text-white"
                    onClick={() => removeFilter(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-green-500 p-2 rounded text-white"
              onClick={addFilter}
            >
              Add Filter
            </button>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 p-2 rounded text-white"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
              <button
                className="bg-gray-400 p-2 rounded text-black"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Table
        data={user}
        className="w-full"
        columns={[
          { title: "User", dataIndex: "first_name" },
          { title: "Designation", dataIndex: "designation" },
          {
            title: "Joining Date",
            render: (data) => (
              <div className="w-full flex justify-start items-center">
                <div>
                  {data.onboarding_date
                    ? new Date(data.onboarding_date).toLocaleDateString()
                    : "NULL"}
                </div>
              </div>
            ),
          },
          {
            title: "Reporting Manager",
            render: (data) => (
              <div className="w-full flex justify-start items-center">
                <div>
                  {data.reporting_manager?.first_name
                    ? data.reporting_manager?.first_name
                    : "NULL"}
                </div>
              </div>
            ),
          },
          {
            title: "Actions",
            render: (data) => (
              <div className="w-full flex gap-4 justify-start items-center">
                <div className="border rounded-md p-2 cursor-pointer hover:bg-slate-100">
                  <Link href={`/people/${data._id}`}>
                    <Icon
                      type="OutlinedEye"
                      color="black"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </div>

                <div
                  className="border rounded-md p-2 cursor-pointer hover:bg-slate-100"
                  onClick={() => {
                    softDelete(data);
                  }}
                >
                  <Icon
                    type="OutlinedBin"
                    color="black"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* Pagination Control */}
      <div className="flex w-full justify-center items-center gap-4 mt-4">
        <button
          className="bg-gray-200 p-2"
          onClick={() => setPageLength((prev) => Math.max(prev - 10, 10))}
        >
          -
        </button>
        <p className="font-gilroyBold">{pageLength}</p>
        <button
          className="bg-gray-200 p-2"
          onClick={() => setPageLength((prev) => prev + 10)}
        >
          +
        </button>
      </div>
    </div>
  );
}
