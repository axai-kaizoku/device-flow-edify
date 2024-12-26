// "use client";

// import { Table } from "@/components/wind/Table";
// import { Icon } from "@/components/wind/Icons";
// import { CreateUserArgs, updateUser, User } from "@/server/userActions";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useQueryState } from "nuqs";
// import { deletedUsers, filterUsers, usersFields } from "@/server/filterActions";

// const numericFields = ["onboarding_date", "date_of_birth"];

// const numericOperators = [">=", "<=", ">", "<", "Equals"];
// const generalOperators = ["Equals", "Not Equals", "Like", "In", "Not In", "Is"];

// export default function DeletedUserTable({ users }: { users: User[] }) {
//   const [user, setUser] = useState(users);
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
//   const [openFilter, setOpenFilter] = useState(false);
//   const [filters, setFilters] = useState<any[]>([]); // Store applied filters
//   const [pageLength, setPageLength] = useState(20); // Default is 20
//   const [filterInputs, setFilterInputs] = useState([
//     { field: "", operator: "", value: "" },
//   ]); // Store dynamic filter fields
//   const [availableOperators, setAvailableOperators] =
//     useState(generalOperators);

//   const handleSearchAndFilter = async () => {
//     // Combine search term and filters
//     const query = {
//       searchQuery: searchTerm || "",
//       filters: filters.length > 0 ? filters : [],
//       pageLength: pageLength,
//     };

//     try {
//       const res = await deletedUsers(query);
//       setUser(res.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("Failed to fetch data. Please try again.");
//     }
//   };

//   // Trigger search and filter on searchTerm, filters, or pageLength change
//   useEffect(() => {
//     handleSearchAndFilter();
//   }, [searchTerm, filters, pageLength]);

//   // Add a new filter input row
//   const addFilter = () => {
//     setFilterInputs([...filterInputs, { field: "", operator: "", value: "" }]);
//   };

//   // Remove a specific filter input row
//   const removeFilter = (index: number) => {
//     const updatedFilters = [...filterInputs];
//     updatedFilters.splice(index, 1);
//     setFilterInputs(updatedFilters);
//   };

//   // Update available operators based on the selected field
//   const handleFieldChange = (index: number, field: string) => {
//     const updatedFilters = [...filterInputs];
//     updatedFilters[index].field = field;
//     setFilterInputs(updatedFilters);
//     setAvailableOperators(generalOperators);
//   };

//   const handleInputChange = (index: number, key: string, value: string) => {
//     const updatedFilters: any = [...filterInputs];
//     updatedFilters[index][key] = value;
//     setFilterInputs(updatedFilters);
//   };

//   const handleApplyFilters = () => {
//     // Validate and create filters
//     const newFilters = filterInputs
//       .filter((f) => f.field && f.operator && f.value)
//       .map((f) => {
//         let finalValue = f.value.trim();
//         if (f.operator === "Like") finalValue = `%${finalValue}%`;
//         return [f.field, f.operator, finalValue];
//       });

//     if (newFilters.length === 0) {
//       alert("Please fill in all filter fields.");
//       return;
//     }

//     setFilters(newFilters); // Set the new filters
//     setOpenFilter(false); // Close filter modal
//   };

//   const handleResetFilters = () => {
//     setFilters([]); // Clear all filters
//     setSearchTerm("");
//     setFilterInputs([{ field: "", operator: "", value: "" }]); // Reset filters
//   };

//   const permanantDelete = async (data: any) => {
//     const confirmDelete = confirm(
//       "This User will be deleted permanently. Are you sure you want to delete?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await updateUser(data._id, { ...data, orgId: null });

//       setUser((prevUsers) => prevUsers.filter((user) => user._id !== data._id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete the user. Please try again.");
//     }
//   };

//   const restoreUser = async (data: any) => {
//     const confirmRestore = confirm(
//       "Are you sure you want to restore the user?"
//     );
//     if (!confirmRestore) return;

//     try {
//       await updateUser(data._id, { ...data, deleted_at: null });

//       // Update the user list to reflect the restored user
//       setUser((prevUsers) => prevUsers.filter((user) => user._id !== data._id));
//     } catch (error) {
//       console.error("Error restoring user:", error);
//       alert("Failed to restore the user. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <input
//         className="border p-2"
//         value={searchTerm || ""}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search People..."
//       />
//       <div className="flex gap-4 w-full">
//         <button
//           className="bg-gray-400 p-2 rounded text-black w-40"
//           onClick={() => setOpenFilter(!openFilter)}
//         >
//           Filter
//         </button>
//         {filters.length > 0 && (
//           <button
//             className="bg-red-400 p-2 rounded text-white w-10"
//             onClick={handleResetFilters}
//           >
//             X
//           </button>
//         )}
//       </div>

//       {openFilter && (
//         <div className="py-4">
//           <div className="flex flex-col gap-4">
//             {/* Dynamically render filter inputs */}
//             {filterInputs.map((filter, index) => (
//               <div key={index} className="flex gap-2">
//                 <select
//                   value={filter.field}
//                   onChange={(e) => handleFieldChange(index, e.target.value)}
//                   className="border w-60 rounded p-2 outline-none focus:ring-2"
//                 >
//                   <option value="">Select Field</option>
//                   {usersFields.map((key) => (
//                     <option key={key} value={key}>
//                       {key}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={filter.operator}
//                   onChange={(e) =>
//                     handleInputChange(index, "operator", e.target.value)
//                   }
//                   className="border w-60 rounded p-2 outline-none focus:ring-2"
//                 >
//                   <option value="">Select Operator</option>
//                   {availableOperators.map((operator) => (
//                     <option key={operator} value={operator}>
//                       {operator}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   value={filter.value}
//                   onChange={(e) =>
//                     handleInputChange(index, "value", e.target.value)
//                   }
//                   className="border w-60 rounded p-2 outline-none focus:ring-2"
//                   placeholder="Enter filter value"
//                 />
//                 {index > 0 && (
//                   <button
//                     className="bg-red-500 p-2 rounded text-white"
//                     onClick={() => removeFilter(index)}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               className="bg-green-500 p-2 rounded text-white"
//               onClick={addFilter}
//             >
//               Add Filter
//             </button>
//             <div className="flex gap-4">
//               <button
//                 className="bg-blue-500 p-2 rounded text-white"
//                 onClick={handleApplyFilters}
//               >
//                 Apply Filters
//               </button>
//               <button
//                 className="bg-gray-400 p-2 rounded text-black"
//                 onClick={handleResetFilters}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Table
//         data={user}
//         className="w-full"
//         columns={[
//           { title: "User", dataIndex: "first_name" },
//           { title: "Designation", dataIndex: "designation" },
//           {
//             title: "Joining Date",
//             render: (data) => (
//               <div className="w-full flex justify-center">
//                 <div>
//                   {data.onboarding_date
//                     ? new Date(data.onboarding_date).toLocaleDateString()
//                     : "NULL"}
//                 </div>
//               </div>
//             ),
//           },
//           {
//             title: "Reporting Manager",
//             render: (data) => (
//               <div className="w-full flex justify-center">
//                 <div>
//                   {data.reporting_manager?.first_name
//                     ? data.reporting_manager?.first_name
//                     : "NULL"}
//                 </div>
//               </div>
//             ),
//           },
//           {
//             title: "Actions",
//             render: (data) => (
//               <div className="w-full flex gap-4 justify-center">
//                 <div className="border rounded-md p-2 cursor-pointer hover:bg-slate-100">
//                   <Link href={`/people/${data._id}`}>
//                     <Icon
//                       type="OutlinedEye"
//                       color="black"
//                       style={{ cursor: "pointer" }}
//                     />
//                   </Link>
//                 </div>

//                 <div
//                   className="border rounded-md p-2 cursor-pointer hover:bg-slate-100"
//                   onClick={() => {
//                     permanantDelete(data);
//                   }}
//                 >
//                   <Icon
//                     type="OutlinedBin"
//                     color="black"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </div>

//                 <div
//                   className="border rounded-md p-2 cursor-pointer hover:bg-slate-100"
//                   onClick={() => {
//                     restoreUser(data);
//                   }}
//                 >
//                   <Icon
//                     type="OutlinedReset"
//                     color="black"
//                     style={{ cursor: "pointer" }}
//                   />
//                 </div>
//               </div>
//             ),
//           },
//         ]}
//       />

//       {/* Pagination Control */}
//       <div className="flex w-full justify-center items-center gap-4 mt-4">
//         <button
//           className="bg-gray-200 p-2"
//           onClick={() => setPageLength((prev) => Math.max(prev - 10, 10))}
//         >
//           -
//         </button>
//         <p className="font-gilroyBold">{pageLength}</p>
//         <button
//           className="bg-gray-200 p-2"
//           onClick={() => setPageLength((prev) => prev + 10)}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { User } from "@/server/userActions";
import { SoftDeleteAsset } from "../../assets/_components/soft-delete-asset";
import { DeleteUser } from "../[id]/_components/delete-user";
import EditUser from "../[id]/_components/edit-user";
import { PermanentUserDelete } from "./permanent-user-delete";
import { RestoreUser } from "./restore-user";

const ITEMS_PER_PAGE = 5;
function DeletedUserTable({ users }: { users: User[] }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPeople = users?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);
  return (
    <>
      <div className="rounded-[21px] border border-[rgba(195,195,195,0.31)] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 px-6 flex flex-col gap-5">
        <div className=" flex gap-2 w-fit">
          <h1 className="text-xl font-gilroySemiBold">People</h1>
          <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
            {users?.length} People
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <Table
            data={currentPeople}
            checkboxSelection={{
              uniqueField: "_id",
              //logic yet to be done
              onSelectionChange: (e) => console.log(e),
            }}
            columns={[
              {
                title: "Name",
                render: (users: User) => (
                  <div
                    className="w-28 justify-start flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push(`/people/${users?._id}`)}
                  >
                    <img
                      src={
                        users?.image ||
                        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      }
                      alt="Profile Image"
                      className="size-10 object-cover rounded-full"
                    />

                    {/* Truncated Text */}
                    <div className="font-gilroySemiBold text-sm gap-1 flex whitespace-nowrap  text-black ">
                      {users?.first_name} {users?.last_name}
                    </div>
                  </div>
                ),
              },
              {
                title: "Role",
                dataIndex: "designation",
              },
              {
                title: "Joining Date",
                render: (data) => (
                  <div className="">
                    {data?.onboarding_date
                      ? new Date(data.onboarding_date).toLocaleDateString()
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "Reporting Manager",
                render: (record: User) => (
                  <div className=" whitespace-nowrap flex text-sm font-gilroyMedium text-[#6C6C6C] gap-1">
                    <h1>{record?.reporting_manager?.first_name}</h1>
                    <h1>{record?.reporting_manager?.last_name}</h1>
                  </div>
                ),
              },
              {
                title: "Team",
                render: (data) => (
                  <div className="">
                    {data?.onboarding_date
                      ? new Date(data.onboarding_date).toLocaleDateString()
                      : "N/A"}
                  </div>
                ),
              },

              // {
              //   title: "Assets assigned",
              //   render: (data: User) => (
              //     <div className="text-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
              //       {data?.devices?.length > 0
              //         ? `${data.devices.length} Assigned`
              //         : "N/A"}
              //     </div>
              //   ),
              // },
              {
                title: "",
                render: (record: User) => (
                  <div className="flex gap-8 justify-center items-center">
                    <PermanentUserDelete id={record?._id!}>
                      <Icons.table_delete className="size-6" />
                    </PermanentUserDelete>

                    <RestoreUser id={record?._id!}>
                      <div className="rounded-full text-white bg-black font-gilroySemiBold text-lg py-0.5 px-6">
                        Restore
                      </div>
                    </RestoreUser>
                  </div>
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={users?.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default DeletedUserTable;
