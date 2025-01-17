"use client";
import { SetStateAction, useEffect, useState } from "react";
import {
  getUsersByTeamId,
  User,
  UsersTeamResponse,
} from "@/server/userActions";
import { Table } from "@/components/wind/Table";
import Pagination from "@/app/(root)/teams/_components/pagination";

const TeamMembers = ({
  users,
  setUsers,
  id,
}: {
  users: UsersTeamResponse;
  setUsers: React.Dispatch<SetStateAction<UsersTeamResponse | null>>;
  id: string;
}) => {
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
      className="rounded-2xl flex flex-col"
      style={{ border: "1px solid #F6F6F6" }}
    >
      <div className="flex gap-3 p-3 items-center">
        <h2 className="text-lg pl-3 font-gilroySemiBold text-gray-800">
          Team Members
        </h2>

        <span className="bg-[#F9F5FF] font-gilroySemiBold text-[#6941C6] text-xs px-2 py-1 rounded-full">
          {data?.total
            ? `${data?.total} ${data?.total > 1 ? "Members" : "Member"}`
            : "N/A"}
        </span>
      </div>
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
                    className="flex items-center gap-3"
                    // onClick={() => router.push(`/people/${data._id}`)}
                  >
                    <img
                      src={
                        data?.image ??
                        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                      } // Default image if no profile_image exists
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
                render: (data: User) => (
                  <div className="truncate max-w-[150px]">
                    {data?.designation || "N/A"}
                  </div>
                ),
              },
              {
                title: "Joining Date",
                render: (data: User) => {
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
                render: (data: User) => (
                  <div className="text-center">
                    {data?.reporting_manager?.first_name || "-"}
                  </div>
                ),
              },
              {
                title: "Assets assigned",
                render: (data: User) =>
                  data?.devices && data?.devices > 0 ? (
                    <div className="flex justify-center items-center w-fit px-3 rounded-lg bg-[#ECFDF3] text-[#027A48]">
                      {`${data?.devices} Assigned`}
                    </div>
                  ) : (
                    <div>-</div>
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
