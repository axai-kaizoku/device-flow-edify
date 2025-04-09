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
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import EditTableIcon from "@/icons/EditTableIcon";
import AllIntegrationsDisplay from "@/app/(root)/integrations/_components/installed/all-integration-display";

const TeamMembers = ({ teamData }: { teamData: Team }) => {
  const router = useRouter();

  const [data, setData] = useState<UsersTeamResponse>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when starting fetch
      try {
        const res: UsersTeamResponse = await getUsersByTeamId(
          teamData?._id!,
          1
        );
        setData(res);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="rounded-[5px] flex flex-col "
      style={{ border: "1px solid #F6F6F6" }}
    >
      {!isLoading && data?.users?.length === 0 ? (
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
          {/* {JSON.stringify(data)} */}
          <>
            <div className="flex flex-col">
              <Table
                data={data?.users ?? []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                isLoading={isLoading}
                // checkboxSelection={{
                //   uniqueField: "_id",
                //   //logic yet to be done
                //   onSelectionChange: handleSelectionChange,
                // }}
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
                    render: (user: User) =>
                      user?.devices && user?.devices?.length > 0 ? (
                        <div className="flex justify-center items-center w-fit px-3 rounded-lg bg-[#ECFDF3] text-[#027A48]">
                          {`${user?.devices?.length} Assigned`}
                        </div>
                      ) : (
                        <div>-</div>
                      ),
                  },
                  {
                    title: "Subscriptions",
                    render: (record: User) => {
                      // const filteredIntegrations = (
                      //   record?.subscriptions ?? []
                      // ).filter((i) => i.platform !== selectedPlatform);
                      const integrations = record?.integrations.filter(
                        (int) => int.image
                      );

                      if (integrations?.length === 0) {
                        return <span className="text-gray-400">-</span>;
                      }

                      const firstThree = integrations?.slice(0, 3);
                      const extraCount = integrations?.length - 3;

                      return (
                        <AllIntegrationsDisplay
                          data={record}
                          allIntegrations={integrations}
                        >
                          <div className="flex items-center gap-2">
                            {firstThree?.map((i, index) => (
                              <img
                                key={index}
                                src={i?.image ?? ""}
                                className="size-8 object-cover rounded-full"
                                alt="Integration"
                              />
                            ))}

                            {extraCount > 0 && (
                              <span className="text-sm text-gray-500 font-gilroySemiBold">
                                +{extraCount}
                              </span>
                            )}
                          </div>
                        </AllIntegrationsDisplay>
                      );
                    },
                  },
                  {
                    title: "Actions",
                    render: (data) => (
                      <div className="flex justify-start items-center gap-5 2xl:gap-10 -ml-2">
                        <RemoveTeamMember userData={data}>
                          <DeleteTableIcon className="size-6" />
                        </RemoveTeamMember>
                        <MoveTeamMember userData={data}>
                          <EditTableIcon className="size-5" />
                        </MoveTeamMember>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default TeamMembers;
