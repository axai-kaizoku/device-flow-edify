"use client";
import AllIntegrationsDisplay from "@/app/(root)/integrations/_components/installed/all-integration-display";
import { buttonVariants } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "@/components/wind/Table";
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import { Team } from "@/server/teamActions";
import { getUsersByTeamId, User } from "@/server/userActions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AddTeamMember from "./add-team-member";
import MoveTeamMember from "./move-team-member";
import { RemoveTeamMember } from "./remove-team-member";

const TeamMembers = ({
  teamData,
  status,
  selectedIds,
  setSelectedIds,
  handleSelectionChange,
}: {
  teamData: Team;
  status: string;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  handleSelectionChange: (selected: string[]) => void;
}) => {
  const router = useRouter();

  // const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // const handleSelectionChange = (selected: string[]) => {
  //   setSelectedIds(selected);
  // };

  const { data, status: userStatus } = useQuery({
    queryKey: ["get-users-by-team-id", teamData?._id],
    queryFn: () => getUsersByTeamId(teamData?._id, 1),
  });

  return (
    <div
      className="rounded-[5px] flex flex-col "
      style={{ border: "1px solid #F6F6F6" }}
    >
      {status !== "pending" && data?.users?.length === 0 ? (
        <div className="flex flex-col  justify-center items-center py-4">
          <img
            src="/media/no_data/people.svg"
            alt="No-People Logo"
            className="h-[53vh]"
          />
          {teamData?.deleted_at === null && (
            <AddTeamMember teamData={teamData}>
              <div className={buttonVariants({ variant: "primary" })}>
                <div className=" group-hover:text-black text-nowrap text-sm font-gilroyMedium">
                  Add Members
                </div>
              </div>
            </AddTeamMember>
          )}
        </div>
      ) : (
        <>
          {userStatus === "pending" ? (
            <div className="flex gap-3 p-3 items-center">
              <Skeleton className="h-4 w-32 ml-3" />

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ) : (
            <div className="flex gap-3 p-3 items-center">
              <h2 className="text-base pl-3 font-gilroyMedium text-gray-800">
                Team Members
              </h2>

              <span className="bg-[#F9F5FF] font-gilroySemiBold text-[#6941C6] text-xs px-2 py-1 rounded-full">
                {data?.total
                  ? `${data?.total} ${data?.total > 1 ? "Members" : "Member"}`
                  : "N/A"}
              </span>
            </div>
          )}
          {/* {JSON.stringify(data)} */}

          {/* <TeamTable data={users} />
           */}
          <>
            <div className="flex flex-col">
              <Table
                data={data?.users ?? []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                isLoading={userStatus === "pending"}
                checkboxSelection={{
                  uniqueField: "_id",
                  onSelectionChange: handleSelectionChange,
                }}
                columns={[
                  {
                    title: "Name",
                    render: (data) => (
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => router.push(`/people/${data?._id}`)}
                      >
                        <GetAvatar name={data?.first_name ?? ""} />

                        <div className="relative group">
                          <div className="font-gilroySemiBold text-sm text-black truncate max-w-[150px]">
                            {data?.first_name?.length! > 12
                              ? `${data?.first_name!.slice(0, 12)}...`
                              : data?.first_name}
                          </div>
                          <div className="absolute left-0 mt-1 hidden w-max max-w-xs p-2 bg-white text-black text-xs rounded shadow-lg border group-hover:block">
                            {data?.first_name ?? "-"}
                          </div>
                        </div>
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
                      const integrations = record?.subscriptions?.filter(
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
                          <div className="flex items-center gap-2 -space-x-5">
                            {firstThree?.map((i, index) => (
                              <div
                                key={index}
                                className="flex justify-center items-center p-1.5 bg-white rounded-full border"
                              >
                                <img
                                  src={i.image ?? ""}
                                  width={16}
                                  height={16}
                                  className=" object-contain "
                                  alt="Integration"
                                />
                              </div>
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
                    title: "",
                    render: (data) => (
                      <div className="flex justify-start items-center gap-5 2xl:gap-10 -ml-2">
                        <RemoveTeamMember userData={data}>
                          <DeleteTableIcon className="size-6" />
                        </RemoveTeamMember>
                        <MoveTeamMember userData={data}>
                          {/* <EditTableIcon className="size-5" /> */}
                          <span
                            className={buttonVariants({
                              variant: "outlineTwo",
                            })}
                          >
                            Move
                          </span>
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
