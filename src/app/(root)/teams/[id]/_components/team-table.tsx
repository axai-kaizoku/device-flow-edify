"use client";
import { Table } from "@/components/wind/Table";
import { updateUser, User } from "@/server/userActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "../../_components/pagination";
import { useState } from "react";
import { Team } from "@/server/teamActions";
import { Icons } from "@/components/icons";
import EditUser from "@/app/(root)/people/[id]/_components/edit-user";
import { DeleteUser } from "@/app/(root)/people/[id]/_components/delete-user";
// Import EditUser component

const ITEMS_PER_PAGE = 6;
export default function TeamTable({ data }: { data: User[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalTeams = data?.length || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTeams = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <Table
        data={currentTeams}
        
        checkboxSelection={{
          uniqueField: "_id",
          //logic yet to be done
          onSelectionChange: (e) => console.log(e),
        }}
        columns={[
          {
            title: "Name",
            render: (data) => (
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push(`/people/${data._id}`)}
              >
                <img
                  src={data?.image || "/placeholder-image.png"} // Default image if no profile_image exists
                  alt={`${data?.first_name || "User"}'s Profile`}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <span>{data?.first_name || "N/A"}</span>
              </div>
            ),
          },
          { title: "Email", dataIndex: "email" },
          {
            title: "Role",
            render: (data) => (
              <div className="truncate max-w-[150px]">
                {data?.designation || "N/A"}
              </div>
            ),
          },
          {
            title: "Joining Date",
            render: (data) => (
              <div className="text-center">
                {data?.onboarding_date
                  ? new Date(data.onboarding_date).toLocaleDateString()
                  : "N/A"}
              </div>
            ),
          },
          {
            title: "Reporting Manager",
            render: (data) => (
              <div className="text-center">
                {data?.reporting_manager?.first_name || "N/A"}
              </div>
            ),
          },
          {
            title: "Assets assigned",
            render: (data) => (
              <div className="text-center rounded-lg bg-green-200 text-green-400">
                {`${data?.reporting_manager?.first_name || "N/A"} assigned`}
              </div>
            ),
          },
          {
            title: "Actions",
            render: (data) => (
              <div className="flex justify-center items-center gap-5">
                {/* <button
                  className="flex flex-col"
                  onClick={() => handleRemoveUser(data)}
                >
                  <Icons.table_delete className="size-6" />
                </button> */}
                <DeleteUser id={data?._id}>
                  <Icons.table_delete className="size-6" />
                </DeleteUser>
                <EditUser userData={data}>
                  <Icons.table_edit className="size-5" />
                </EditUser>
              </div>
            ),
          },
        ]}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        totalItems={totalTeams}
      />
    </>
  );
}
