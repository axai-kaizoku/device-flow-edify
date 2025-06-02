import {
  Alert01Icon,
  Calendar03Icon,
  Call02Icon,
  Mail01Icon,
  ShieldEnergyIcon,
  StarAward02Icon,
  Tag01Icon,
  User03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  TabSkelton,
  TimelineSkelton,
} from "@/app/(root)/(userRoutes)/_components/profile-main-skeleton";
import { formatDate } from "@/app/(root)/people/[id]/_components/user-timeline-table";
import { GetAvatar } from "@/components/get-avatar";
import TabBar from "@/components/TabBar/tabbar";
import { assetActivityLog } from "@/server/activityActions";
import { Device } from "@/server/deviceActions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Dropdown from "./accordian";
import DeviceDetailViewSkeltonLeft from "./device-detail-view-skelton-left";
import QCSection from "./qc-section";
import TicketsTable from "./tickets-section";
import { TimelineDemo } from "./timeline-section";
import Link from "next/link";

const NewDeviceView = ({ data, status }: { data: Device; status: string }) => {
  const { data: deviceTimeLineData, status: timeLineStatus } = useQuery({
    queryKey: ["device-timeline", data?._id],
    queryFn: async () => await assetActivityLog(data?._id),
    enabled: !!data?._id,
    staleTime: 0,
  });

  const openTicketsCount =
    data?.tickets?.filter((ticket) => ticket?.status?.toLowerCase() === "open")
      .length ?? 0;

  const tabs = [
    {
      id: "timeline",
      label: "Timeline",
      content: <TimelineDemo data={deviceTimeLineData} />,
    },
    {
      id: "tickets",
      label: "Tickets",
      content: <TicketsTable data={data?.tickets ?? []} />,
      ...(openTicketsCount > 0 ? { number: openTicketsCount } : {}),
    },
    {
      id: "qc",
      label: "QC Reports",
      content: <QCSection data={data?.qcDetails ?? []} />,
    },
  ];

  const sections = [
    {
      key: "device_profile",
      show: true,
    },
    {
      key: "assigne_info",
      show: true,
    },
    {
      key: "device_details",
      show: true,
    },
  ];
  const router = useRouter();
  const firstVisibleSection = sections.find((s) => s.show)?.key;
  const openIssues =
    data?.tickets?.filter(
      (ticket) => ticket?.status?.toLowerCase() === "open"
    ) || [];
  return (
    <>
      {/* {JSON.stringify(data?.qcDetails)} */}
      <div className="bg-white rounded-[10px] w-full border overflow-hidden border-[rgba(0, 0, 0, 0.10)]  mt-4 flex h-[100vh]">
        {/* Left Side */}
        {status === "pending" ? (
          <DeviceDetailViewSkeltonLeft />
        ) : (
          <>
            <div className="w-[40%] h-full hide-scrollbar border border-r border-l-0 border-t-0 border-b-0 border-[rgba(0, 0, 0, 0.05)] overflow-y-auto">
              <div className="p-6">
                {/* Name, serial no, image, status */}
                <div className="flex gap-3 items-center">
                  {/* Image */}
                  <GetAvatar
                    name={data?.custom_model || "-"}
                    size={60}
                    isDeviceAvatar
                  />
                  {/* Name, serial no */}
                  <div className="flex-col gap-1">
                    <div className="flex gap-3 items-center">
                      <div className="flex flex-col gap-0.5">
                        <h1 className="font-gilroySemiBold text-lg line-clamp-1">
                          {data?.custom_model || "-"}
                        </h1>
                        <h3 className="capitalize text-sm text-gray-600 font-gilroyMedium">
                          {data?.serial_no ?? "-"}
                        </h3>
                      </div>

                      {data?.deleted_at === null ? (
                        <span className="rounded-full text-center -mt-6  font-gilroyMedium h-fit  bg-[#ECFDF3] text-[#027A48] py-1 px-2 text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full text-center -mt-6  font-gilroyMedium h-fit  bg-[#FFEFEF] text-[#FF0000] py-0.5 px-2 text-xs">
                          Inactive
                        </span>
                      )}
                      {data?.is_temp_assigned === false ? (
                        <span className="text-xs font-gilroyMedium h-fit -mt-6  flex justify-center items-center rounded-full px-2 py-1 bg-[#F9F5FF] text-[#6941C6]">
                          Permanant
                        </span>
                      ) : (
                        <span className="text-xs font-gilroyMedium h-fit -mt-6  flex justify-center items-center rounded-full px-2 py-1 bg-[#F9F5FF] text-[#6941C6]">
                          Temporary
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 font-gilroyMedium text-sm"></p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 my-5">
                  <div className="flex gap-5 items-center text-nowrap">
                    <div className="flex gap-1 items-center">
                      <HugeiconsIcon
                        icon={User03Icon}
                        className="text-[#a09f9f] size-4"
                      />
                      <p className=" font-gilroyMedium text-sm ">
                        Assigned to:
                      </p>
                      <Link href={`/people/${data?.userId}`}>
                        <p className="text-sm font-gilroyMedium underline ">
                          {data?.userName || "-"}
                        </p>
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center">
                      <HugeiconsIcon
                        icon={ShieldEnergyIcon}
                        className="text-[#a09f9f] size-4"
                      />
                      {data?.warranty_status ? (
                        <p className="text-[#2E8016] text-xs  font-gilroyMedium">
                          In Warranty
                        </p>
                      ) : (
                        <p className="rounded-full text-center   font-gilroyMedium h-fit   text-[#FF0000]  text-sm">
                          Out of Warranty
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="flex gap-1 items-center">
                      <HugeiconsIcon
                        icon={Calendar03Icon}
                        className="text-[#a09f9f] size-4"
                      />
                      {/* Here we need to add createdAt,  */}
                      <p className="text-sm font-gilroyMedium leading-5">
                        Added on{" "}
                        {formatDate(data?.createdAt)
                          .split(",")
                          .slice(0, 2)
                          .join(",") || "-"}
                      </p>
                    </div>
                    {data?.device_condition && data.device_condition !== "" && (
                      <div className="flex gap-1 items-center">
                        <HugeiconsIcon
                          icon={Tag01Icon}
                          className="text-[#a09f9f] size-4"
                        />

                        {data.device_condition === "Excellent" ? (
                          <p className="text-[#2E8016] text-sm font-gilroyMedium">
                            Excellent
                          </p>
                        ) : data.device_condition === "Fair" ? (
                          <p className="text-yellow-400 text-sm font-gilroyMedium">
                            Fair
                          </p>
                        ) : data.device_condition === "Good" ? (
                          <p className="text-[#FF0000] text-sm font-gilroyMedium">
                            Good
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                {openIssues?.length > 0 && (
                  <Link href={`/assets/${data?._id}?tab=tickets`}>
                    <div className="bg-[#FFEDED] cursor-pointer px-2 py-3 gap-2 flex items-center rounded-[5px]">
                      <HugeiconsIcon
                        icon={Alert01Icon}
                        className="text-[#FF0000] size-4"
                      />
                      <p className="text-[#FF0000] text-sm  font-gilroyMedium">
                        {openIssues.length} Open{" "}
                        {openIssues.length === 1 ? "issue" : "issues"}
                      </p>
                    </div>
                  </Link>
                )}

                {/* Device Profile */}

                <Dropdown
                  title="Device Profile"
                  onFirst={firstVisibleSection === "device_profile"}
                  headerClassName="bg-[#F6F6F6] mt-4 text-sm"
                >
                  <div className="space-y-3 mt-3">
                    {[
                      {
                        label: "Device Type:",
                        value: data?.device_type?.trim() || "",
                      },
                      {
                        label: "Temporary Date:",
                        value: data?.duration
                          ? formatDate(data.duration)
                              .split(",")
                              .slice(0, 2)
                              .join(",")
                          : "",
                      },
                      {
                        label: "Device Condition:",
                        value:
                          data?.device_condition === "Excellent"
                            ? "Excellent"
                            : data?.device_condition === "Fair"
                            ? "Fair"
                            : data?.device_condition === "Good"
                            ? "Good"
                            : "",
                        valueColor: "text-[#2E8016]",
                      },
                    ]
                      .filter(({ value }) => value && value !== "-") // Only keep non-empty, meaningful values
                      .map(({ label, value, valueColor = "" }, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 pl-3"
                        >
                          <div className="flex items-start gap-2 min-w-[120px]">
                            <span className="text-[#a09f9f] font-gilroyMedium text-sm">
                              {label}
                            </span>
                          </div>
                          <p
                            className={`text-sm font-gilroyMedium ${valueColor}`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                  </div>
                </Dropdown>

                {/* Assignee Information */}
                {data?.userId !== null && (
                  <Dropdown
                    title="Assignee Information"
                    onFirst={firstVisibleSection === "assigne_info"}
                    headerClassName="bg-[#F6F6F6] mt-4 text-sm"
                  >
                    <div className="space-y-3 mt-3">
                      {[
                        {
                          icon: User03Icon,
                          label: "Name:",
                          value: data?.userName?.trim() || "",
                          className: "underline",
                        },
                        {
                          icon: Mail01Icon,
                          label: "Email:",
                          value: data?.email?.trim() || "",
                          className: "text-[#025CE5]",
                        },
                        {
                          icon: Call02Icon,
                          label: "Phone:",
                          value: data?.phone?.trim() || "",
                        },
                        {
                          icon: StarAward02Icon,
                          label: "Designation:",
                          value: data?.designation?.trim() || "",
                        },
                      ]
                        .filter(({ value }) => value && value !== "-")
                        .map(({ icon, label, value, className = "" }, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 pl-3"
                          >
                            <div className="min-w-[160px] flex items-center gap-2 ">
                              <HugeiconsIcon
                                icon={icon}
                                className="text-[#a09f9f] size-4"
                              />
                              <span className="text-[#a09f9f] font-gilroyMedium text-sm ">
                                {label}
                              </span>
                            </div>
                            <p
                              className={`text-sm font-gilroyMedium text-black ${className}`}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                    </div>
                  </Dropdown>
                )}

                {/* Device Details */}

                <Dropdown
                  title="Device Details"
                  onFirst={firstVisibleSection === "device_details"}
                  headerClassName="bg-[#F6F6F6] mt-4 text-sm"
                >
                  <div className="space-y-3 mt-3">
                    {[
                      {
                        label: "Model Name:",
                        value: data?.custom_model?.trim() || "",
                      },
                      {
                        label: "Serial Number:",
                        value: data?.serial_no?.trim() || "",
                      },
                      {
                        label: "Brand:",
                        value: data?.brand?.trim() || "",
                      },
                      {
                        label: "Processor:",
                        value: data?.processor?.trim() || "",
                      },
                      {
                        label: "OS:",
                        value: data?.os?.trim() || "",
                      },
                      {
                        label: "Storage:",
                        value:
                          Array.isArray(data?.storage) &&
                          data?.storage?.length > 0
                            ? data?.storage.join(", ")
                            : "",
                      },
                      {
                        label: "Purchased On:",
                        value: data?.device_purchase_date
                          ? formatDate(data.device_purchase_date)
                              .split(",")
                              .slice(0, 2)
                              .join(",")
                          : "",
                      },
                      {
                        label: "Warranty Expiry:",
                        value: data?.warranty_expiary_date
                          ? formatDate(data.warranty_expiary_date)
                              .split(",")
                              .slice(0, 2)
                              .join(",")
                          : "",
                      },
                    ]
                      ?.filter(({ value }) => value && value !== "-")
                      ?.map(({ label, value }, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 pl-3"
                        >
                          <div className="min-w-[140px]">
                            <span className="text-[#a09f9f] font-gilroyMedium text-sm ">
                              {label}
                            </span>
                          </div>
                          <p className="text-[15px] font-gilroyMedium ">
                            {value}
                          </p>
                        </div>
                      ))}
                  </div>
                </Dropdown>
              </div>
            </div>
          </>
        )}

        {/* Right Side */}
        {timeLineStatus === "pending" ? (
          <div className="flex flex-col m-7 gap-5">
            <TabSkelton />
            <TimelineSkelton />
          </div>
        ) : (
          <div className="w-[60%] overflow-y-auto">
            <h1 className="font-gilroySemiBold text-lg px-6 pt-6 pb-3">
              Activity Log
            </h1>
            <TabBar
              status={timeLineStatus}
              tabs={tabs}
              defaultActiveTab="timeline"
              className="mb-6"
              tabClassName="px-3 text-sm"
              activeTabClassName="font-gilroySemiBold"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default NewDeviceView;
