"use client";
import { Table } from "@/components/wind/Table";
import {
  getUsersByTeamId,
  User,
  UsersTeamResponse,
} from "@/server/userActions";
import { useRouter } from "next/navigation";
import Pagination from "../../_components/pagination";
import { useEffect, useState } from "react";
import { RemoveTeamMember } from "./remove-team-member";
import MoveTeamMember from "./move-team-member";
import { teamIcons } from "../../icons";
import { Icons } from "@/components/icons";
import { Team } from "@/server/teamActions";
import AddTeamMember from "./add-team-member";

const TeamMembers = ({ teamData }: { teamData: Team }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<UsersTeamResponse>();

  useEffect(() => {
    const fetch = async () => {
      const res: UsersTeamResponse = await getUsersByTeamId(teamData?._id!, 1);
      setData(res);
    };
    fetch();
  }, []);

  const handlePageChange = async (page: number) => {
    const res: UsersTeamResponse = await getUsersByTeamId(teamData?._id!, page);
    setData(res);
    setCurrentPage(page);
  };

  return (
    <div
      className="rounded-2xl flex flex-col "
      style={{ border: "1px solid #F6F6F6" }}
    >
      {data?.users?.length === 0 ? (
        <div className="flex flex-col gap-6 justify-center items-center py-8">
          <teamIcons.no_team_display />
          <AddTeamMember teamData={teamData}>
            <div className="py-1.5 px-8 text-sm rounded-full text-white font-gilroySemiBold bg-black">
              Add members
            </div>
          </AddTeamMember>
        </div>
      ) : (
        <>
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
                        onClick={() => router.push(`/people/${data?._id}`)}
                      >
                        <img
                          src={
                            data?.image && data.image.length > 0
                              ? data?.image
                              : data?.gender === "Male"
                              ? "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                              : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                          }
                          alt={`${data?.first_name ?? "User"}'s Profile`}
                          className="w-10 h-10 rounded-full border object-cover"
                        />
                        <span>{data?.first_name || "-"}</span>
                      </div>
                    ),
                  },

                  {
                    title: "Email",
                    render: (data) => <div>{data?.email || "-"}</div>,
                  },
                  {
                    title: "Role",
                    render: (data) => <div>{data?.designation || "-"}</div>,
                  },
                  {
                    title: "Joining Date",
                    render: (record) => {
                      const onboardingDate = record?.onboarding_date;

                      // Check if onboardingDate is null, undefined, or empty
                      if (!onboardingDate) {
                        return <div>-</div>; // Return "-" for null, undefined, or empty value
                      }

                      const date = new Date(onboardingDate);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return <div>-</div>; // Return "-" for invalid date
                      }

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
                      <div>{data?.reporting_manager?.first_name || "-"}</div>
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
        </>
      )}
    </div>
  );
};

export default TeamMembers;
