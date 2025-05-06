"use client";
import DeviceFlowLoader from "@/components/deviceFlowLoader";

import { Table } from "@/components/wind/Table";
import {
  deleteIntegrationById,
  IntegrationUsers,
  UserByIntegration,
} from "@/server/integrationActions";
import React, { Suspense, useState } from "react";
import AllIntegrationsDisplay from "./all-integration-display";
import { useRouter } from "next/navigation";
import { RemoveIntegration } from "./remove-integration.dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  UserIcon,
  Wallet01FreeIcons,
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/buttons/Button";
import { Icons } from "@/app/(root)/people/icons";

interface UserByIntegrationsProps {
  data?: IntegrationUsers;
  selectedPlatform?: string;
  status?: "error" | "success" | "pending";
}

const UserByIntegrations: React.FC<UserByIntegrationsProps> = ({
  data: totalIntegrationData,
  selectedPlatform,
  status,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const router = useRouter();
  const users = totalIntegrationData?.allUsers;

  // Show loader if data is not yet available
  // if (!data?.length) {
  //   return (
  //     <div className="p-4 flex items-center justify-center w-full h-[60vh]">
  //       <img
  //         src="/media/logo/no_reports_display.svg"
  //         alt="No Data"
  //         className="object-contain"
  //       />
  //     </div>
  //   );
  // }

  // Find the integration matching the selected platform.
  const integration = users?.find((item) =>
    item?.integrations?.some((i) => i?.platform === selectedPlatform)
  );

  // Assuming each user has one integration per platform, extract it.
  const integrationData = integration?.integrations?.find(
    (i) => i?.platform === selectedPlatform
  );

  return (
    <div className="flex flex-col ">
      {status === "pending" ? (
        <IntegrationHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center mb-6 ">
          <div className="flex gap-6 items-center w-full">
            <img
              src={integrationData?.image ?? ""}
              alt={integrationData?.platform}
              className="w-28 h-28 object-cover"
            />
            <div className="flex flex-col gap-5 w-full">
              <h1 className="text-3xl font-gilroyBold">
                {integrationData?.platform}
              </h1>
              <div className="flex gap-5 justify-between w-full">
                <div className="flex gap-5">
                  <div className="flex gap-2 items-center">
                    <HugeiconsIcon
                      icon={Wallet01FreeIcons}
                      className="text-neutral-400 size-4"
                    />
                    {/* {JSON.stringify(totalIntegrationData)} */}
                    <span className="text-sm font-gilroyMedium">{`₹${formatNumber(
                      totalIntegrationData?.platformTotalCost ?? 0
                    )}/Month`}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HugeiconsIcon
                      icon={UserIcon}
                      className="text-neutral-400 size-4"
                    />

                    <span className="text-sm font-gilroyMedium">
                      {users?.length} Seats
                    </span>
                  </div>
                </div>
                <RemoveIntegration
                  id={integrationData?.id ?? ""}
                  platform={integrationData?.platform}
                >
                  <span
                    className={buttonVariants({
                      className:
                        "rounded-md text-sm bg-white h-9 text-black  w-fit font-gilroyMedium border hover:border-black",
                    })}
                  >
                    Remove
                  </span>
                </RemoveIntegration>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {JSON.stringify(data)} */}
      <div>
        <div className="rounded-lg border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-base font-gilroyMedium pl-6">Members</h1>
          </div>

          {/* {status === "pending" ? (
            <div>
              <DeviceFlowLoader />
            </div>
          ) : null} */}
          {/* {JSON.stringify(data)} */}
          {users?.length !== 0 ? (
            <div className="flex flex-col gap-2">
              <Table
                isLoading={status === "pending"}
                data={users}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                // checkboxSelection={{
                //   uniqueField: "_id",
                //   onSelectionChange: setSelectedIds,
                // }}
                columns={[
                  {
                    title: "Name",
                    render: (record: UserByIntegration) => (
                      <div className="w-28 flex items-center gap-2">
                        {record?.image && record?.image?.length > 0 ? (
                          <img
                            src={record?.image}
                            alt={record?.name}
                            className="size-10 object-cover rounded-full flex-shrink-0"
                          />
                        ) : (
                          <GetAvatar
                            name={record?.first_name ?? record?.name ?? "Guest"}
                          />
                        )}

                        <div className="relative group">
                          <div className="font-gilroySemiBold text-sm text-black truncate max-w-[150px]">
                            {(() => {
                              const name =
                                record?.first_name ?? record?.name ?? "Guest";
                              const displayName =
                                name.length > 12
                                  ? `${name.slice(0, 12)}...`
                                  : name;
                              return displayName;
                            })()}
                          </div>
                          <div className="absolute left-0 mt-1 hidden w-max max-w-xs p-2 bg-white text-black text-xs rounded shadow-lg border group-hover:block">
                            {record?.first_name ?? record?.name ?? "Guest"}
                          </div>
                        </div>
                      </div>
                    ),
                  },

                  {
                    title: "Role",
                    render: (record) => <div>{record?.designation ?? "-"}</div>,
                  },
                  {
                    title: "Reporting Manager",
                    render: (record) => (
                      <div>{record?.reporting_manager ?? "-"}</div>
                    ),
                  },
                  {
                    title: "Team",
                    render: (record) => <div>{record?.teamName ?? "-"}</div>,
                  },
                  {
                    title: "Joining Date",
                    render: (record) => {
                      const rawDate = record?.onboarding_date;
                      const diagDate = rawDate ? new Date(rawDate) : null;
                      const isValidDate =
                        diagDate && !isNaN(diagDate.getTime());

                      const formattedDiag = isValidDate
                        ? diagDate.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-";

                      return <div>{formattedDiag}</div>;
                    },
                  },
                  {
                    title: "Other Integrations",
                    render: (record: UserByIntegration) => {
                      const filteredIntegrations = (
                        record?.integrations ?? []
                      ).filter((i) => i.platform !== selectedPlatform);

                      if (filteredIntegrations.length === 0) {
                        return <span className="text-gray-400">-</span>;
                      }

                      const firstThree = filteredIntegrations.slice(0, 3);
                      const extraCount = filteredIntegrations.length - 3;

                      return (
                        <AllIntegrationsDisplay
                          data={record}
                          isIntegrationFilter
                          allIntegrations={filteredIntegrations}
                        >
                          <div className="flex items-center gap-2 -space-x-5">
                            {firstThree.map((i, index) => (
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
                ]}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6 justify-center items-center py-8">
              <Icons.no_people_display />
            </div>
          )}

          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
};

export default UserByIntegrations;

import { Skeleton } from "@/components/ui/skeleton";
import { GetAvatar } from "@/components/get-avatar";
import { formatNumber } from "@/lib/utils";

function IntegrationHeaderSkeleton() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-6 items-center w-full">
        <Skeleton className="w-28 h-28 rounded-md" />
        <div className="flex flex-col gap-5 w-full">
          <Skeleton className="h-8 w-1/3" /> {/* Title */}
          <div className="flex gap-5 justify-between w-full">
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <Skeleton className="size-4 rounded-full" /> {/* Icon */}
                <Skeleton className="h-4 w-20" /> {/* Price */}
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="size-4 rounded-full" /> {/* Icon */}
                <Skeleton className="h-4 w-16" /> {/* Seats */}
              </div>
            </div>
            <Skeleton className="h-9 w-24 rounded-md" /> {/* Remove Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
