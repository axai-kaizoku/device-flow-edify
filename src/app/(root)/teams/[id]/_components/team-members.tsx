"use client";
import { Table } from "@/components/wind/Table";
import {
  getUsersByTeamId,
  User,
  UserResponse,
  UsersTeamResponse,
} from "@/server/userActions";
import { useRouter } from "next/navigation";
import Pagination from "../../_components/pagination";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { RemoveTeamMember } from "./remove-team-member";
import MoveTeamMember from "./move-team-member";

const TeamMembers = ({ id }: { id: string }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<UsersTeamResponse>();

  useEffect(() => {
    const fetch = async () => {
      const res: UsersTeamResponse = await getUsersByTeamId(id, 1);
      setData(res);
    };
    fetch();
  }, []);

  const handlePageChange = async (page: number) => {
    const res: UsersTeamResponse = await getUsersByTeamId(id, page);
    setData(res);
    setCurrentPage(page);
  };

  return (
    <div
      className="rounded-2xl flex flex-col "
      style={{ border: "1px solid #F6F6F6" }}
    >
      <div className="flex gap-3 p-3 items-center">
        <h2 className="text-lg pl-3 font-gilroySemiBold text-gray-800">
          Team Members
        </h2>

        <span className="bg-[#F9F5FF] font-gilroySemiBold text-[#6941C6] text-xs px-2 py-1 rounded-full">
          {data?.users.length
            ? `${data.users.length} ${
                data.users.length > 1 ? "Members" : "Member"
              }`
            : "N/A"}
        </span>
      </div>
      {/* <TeamTable data={users} />
       */}

      <>
        <div className="flex flex-col">
          <Table
            data={data?.users ?? []}
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
            current_page={currentPage}
            total_pages={data?.total_pages!}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    </div>
  );
};

export default TeamMembers;
