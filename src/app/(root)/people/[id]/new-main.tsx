"use client";
import { GetAvatar } from "@/components/get-avatar";
import TabBar from "@/components/TabBar/tabbar";
import { userActivityLog } from "@/server/activityActions";
import { NewUserResponse } from "@/server/userActions";
import {
  Alert02Icon,
  Calendar03Icon,
  Call02Icon,
  CheeseCake02Icon,
  Mail01Icon,
  Tag01Icon,
  User03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "../../assets/[id]/_components/accordian";
import UserTicketsTable from "./_components/user-table-data";
import UserTimelineTable from "./_components/user-timeline-table";
import { memo } from "react";

function UserMain({ user }: { user: NewUserResponse }) {
  const router = useRouter();
  const sections = [
    {
      key: "subscriptions",
      show: user?.subscriptions?.filter((item) => item?.price > 0)?.length > 0,
    },
    {
      key: "devices",
      show: user?.devices?.length > 0,
    },
    {
      key: "about",
      show: true,
    },
    {
      key: "teams",
      show: !!user?.team,
    },
  ];
  const userId = user?._id;

  const { data: userTimeLineData, status } = useQuery({
    queryKey: ["user-timeline", userId],
    queryFn: async () => await userActivityLog(userId),
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const openTicketsCount =
    user?.tickets?.filter((ticket) => ticket?.status?.toLowerCase() === "open")
      .length || "";

  const tabs = [
    {
      id: "timeline",
      label: "Timeline",
      content: <UserTimelineTable data={userTimeLineData} />,
    },
    {
      id: "tickets",
      label: "Tickets",
      content: <UserTicketsTable data={user?.tickets} />,
      number: openTicketsCount,
    },
  ];
  const firstVisibleSection = sections.find((s) => s.show)?.key;

  return (
    <div className="rounded-[10px] flex h-[80vh] my-4 border border-[#0000001A] bg-white overflow-hidden ">
      <div className="w-[40%] h-full hide-scrollbar border border-r border-l-0 border-t-0 border-b-0 border-[rgba(0, 0, 0, 0.05)] overflow-y-auto">
        <div className="p-6 flex flex-col gap-6 mb-6">
          <div className="flex  gap-3 items-center">
            <GetAvatar name={user?.first_name} size={60} />
            <div className="flex flex-col gap-0.5">
              <h1 className="font-gilroySemiBold text-lg">
                {user?.first_name ?? "-"}
              </h1>
              <h3 className="capitalize text-[15px] text-gray-600 font-gilroyMedium">
                {user?.designation ?? "-"}
              </h3>
            </div>
            {user?.deleted_at === null ? (
              <span className="rounded-full -mt-6 text-center  font-gilroyMedium h-fit  bg-[#ECFDF3] text-[#027A48] py-0.5 px-2 text-xs">
                Active
              </span>
            ) : (
              <span className="rounded-full text-center -mt-5  font-gilroyMedium h-fit  bg-[#FFEFEF] text-[#FF0000] py-0.5 px-2 text-xs">
                Inactive
              </span>
            )}
          </div>
          <div className="">
            <div className="flex gap-3">
              <h1 className="text-[15px] text-black items-center text-nowrap font-gilroyMedium flex gap-2">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  className="text-[#808080] size-4"
                />
                Joined on
                <span className="pl-[1px]">
                  {user?.onboarding_date
                    ? new Date(user.onboarding_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "Not available"}
                </span>
              </h1>

              <h1 className="text-[15px] text-black  items-center font-gilroyMedium flex gap-2">
                <HugeiconsIcon
                  icon={Tag01Icon}
                  className="text-[#808080] size-4"
                />{" "}
                {user?.employment_type ?? "-"}
              </h1>
            </div>
            <h1 className="text-[15px] text-gray-600 mt-3  items-center font-gilroyMedium flex gap-2">
              <HugeiconsIcon
                icon={User03Icon}
                className="text-[#808080] size-4"
              />
              Reporting Manager:{" "}
              <span className="text-black capitalize">
                {user?.reporting_manager?.first_name ?? "Not available"}
              </span>
            </h1>
          </div>

          {/* Subscriptions */}
          {user?.subscriptions?.filter((item) => item?.price > 0)?.length >
            0 && (
            <Dropdown
              onFirst={firstVisibleSection === "subscriptions"}
              title="Subscriptions"
              headerClassName="bg-[#F6F6F6]"
            >
              <div className="flex flex-col gap-3 w-full mb-1">
                {user?.subscriptions
                  ?.filter((item) => item?.price > 0)
                  ?.map((item) => (
                    <Link
                      href={`/integrations/installed/${item?.platform}`}
                      key={item.id}
                    >
                      <div className="border-gray-200 border hover:border-black p-3 flex justify-between items-center rounded-md">
                        <div className="flex gap-2 items-center">
                          <img
                            src={item?.image}
                            alt={item?.platform}
                            className="size-10 rounded"
                          />
                          <div>
                            <h1 className="text-[15px] font-gilroyMedium">
                              {item?.platform}
                            </h1>
                            {/* <h3 className="text-gray-600 text-xs font-gilroyMedium line-clamp-1">
                              {item?.description}
                            </h3> */}
                          </div>
                        </div>
                        <span className="border border-[#2E8016] font-gilroySemiBold text-sm rounded-sm h-fit text-[#2E8016] px-2 py-0.5">
                          ₹{item?.price}/month
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </Dropdown>
          )}

          {/* Assigned Assets */}
          {user?.devices?.length > 0 && (
            <Dropdown
              onFirst={firstVisibleSection === "devices"}
              title="Assigned Assets"
              headerClassName="bg-[#F6F6F6]"
            >
              <div className="flex flex-col gap-2 mb-1">
                {user?.devices?.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-3 w-full mb-1 cursor-pointer"
                    onClick={() => router.push(`/assets/${item?._id}`)}
                  >
                    <div className="border-gray-200 hover:border-black  border p-3 flex justify-between items-center rounded-md">
                      <div className="flex gap-2">
                        <GetAvatar name={item?.custom_model} size={40} />
                        <div>
                          <h1 className="text-[15px] font-gilroyMedium">
                            {item?.custom_model}”
                          </h1>
                          <h3 className="text-gray-600 text-xs font-gilroyMedium">
                            {item?.serial_no ?? "-"} | {item?.ram ?? "-"} |{" "}
                            {item?.storage ?? "-"}
                          </h3>
                        </div>
                      </div>

                      {item.issues?.length > 0 && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation(); // prevent parent click
                            router.push("/issues");
                          }}
                          className="font-gilroySemiBold flex items-center justify-center gap-1 text-xs rounded-sm h-fit hover:bg-gray-100 hover:rounded-md p-1 text-[#FF0000]"
                        >
                          <HugeiconsIcon
                            icon={Alert02Icon}
                            className="text-[#FF0000] size-5"
                          />
                          {item.issues.length}{" "}
                          {item.issues.length === 1 ? "issue" : "issues"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Dropdown>
          )}

          <Dropdown
            onFirst={firstVisibleSection === "about"}
            title="About"
            headerClassName="bg-[#F6F6F6]"
          >
            <div className="space-y-3 mt-5">
              {[
                {
                  icon: Mail01Icon,
                  label: "Email:",
                  value: user?.email ?? "-",
                  valueColor: "text-[#025CE5]",
                },
                {
                  icon: Call02Icon,
                  label: "Phone:",
                  value: user?.phone ?? "-",
                },
                {
                  icon: User03Icon,
                  label: "Gender:",
                  value: user?.gender ?? "-",
                },
                {
                  icon: CheeseCake02Icon,
                  label: "Date of Birth:",
                  value: user?.date_of_birth
                    ? new Date(user.date_of_birth).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-",
                },
              ].map(({ icon, label, value, valueColor = "" }, index) => (
                <div key={index} className="flex  gap-3 pl-3">
                  <div className="flex items-start gap-1 min-w-28">
                    <HugeiconsIcon
                      icon={icon}
                      className="text-[#a09f9f] size-4"
                    />
                    <span className="text-[#a09f9f] font-gilroyMedium text-sm">
                      {label}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className={`text-sm font-gilroyMedium ${valueColor}`}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Dropdown>

          {/* Teams */}
          {user?.team && (
            <Dropdown
              onFirst={firstVisibleSection === "teams"}
              title="Teams"
              headerClassName="bg-[#F6F6F6]"
            >
              <div className="flex flex-col gap-3 w-full mb-4">
                <div
                  onClick={() => {
                    router.push(`/teams/${user?.team?._id}`);
                  }}
                  className="border-gray-200 hover:border-black cursor-pointer border p-3 flex justify-between items-center rounded-md"
                >
                  <div className="flex gap-2">
                    <GetAvatar name={user?.team?.title} />
                    <div>
                      <h1 className="text-[15px] font-gilroyMedium">
                        {user?.team?.title}
                      </h1>
                      <h3 className="text-gray-600 text-xs font-gilroyMedium">
                        {user?.team?.userCount}{" "}
                        <span className="pl-1">
                          {user?.team?.userCount === 1 ? "member" : "members"}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="w-[60%] h-full overflow-y-auto ">
        <h1 className="font-gilroySemiBold text-lg px-6 pt-6 pb-2">
          Activity Log
        </h1>
        <TabBar
          tabs={tabs}
          status={status}
          defaultActiveTab="timeline"
          className="mb-6"
          tabClassName="px-3 text-sm"
          activeTabClassName="font-gilroySemiBold"
        />
      </div>
    </div>
  );
}

export default memo(UserMain);
