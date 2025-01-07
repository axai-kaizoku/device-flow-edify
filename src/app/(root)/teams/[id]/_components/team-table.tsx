"use client";
import { Table } from "@/components/wind/Table";
import { User } from "@/server/userActions";
import { useRouter } from "next/navigation";
import Pagination from "../../_components/pagination";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { RemoveTeamMember } from "./remove-team-member";
import MoveTeamMember from "./move-team-member";

const ITEMS_PER_PAGE = 5;
export default function TeamTable({ data }: { data: User[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalTeams = data?.length || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTeams = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <div className="flex flex-col">
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
                    src={
                      data?.image ??
                      "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                    }
                    alt={`${data?.first_name ?? "User"}'s Profile`}
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
              render: (data) => {
                const date = new Date(data?.onboarding_date!);
                const formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                return <div>{formattedDate}</div>;
              },
            },
            {
              title: "Reporting Manager",
              render: (data) => (
                <div>{data?.reporting_manager?.first_name || "N/A"}</div>
              ),
            },
            {
              title: "Assets assigned",
              render: (data: User) => (
                <div className="text-center w-fit px-2 2xl:px-3 2xl:py-1 font-gilroySemiBold rounded-full bg-[#ECFDF3] text-[#027A48]">
                  {data?.devices?.length! > 0
                    ? `${data.devices!.length} Assigned`
                    : "N/A"}
                </div>
              ),
            },
            {
              title: "Actions",
              render: (data) => (
                <div className="flex justify-start items-center gap-5 2xl:gap-10 -ml-2">
                  <RemoveTeamMember userData={data}>
                    <Icons.table_delete className="size-6" />
                  </RemoveTeamMember>
                  <MoveTeamMember userData={data}>
                    <Icons.table_edit className="size-5" />
                  </MoveTeamMember>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="my-4">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          totalItems={totalTeams}
        />
      </div>
    </>
  );
}
