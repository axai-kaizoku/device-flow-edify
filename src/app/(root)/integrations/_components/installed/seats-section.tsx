"use client";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import { Table } from "@/components/wind/Table";
import {
  IntegrationUsers,
  UserByIntegration,
} from "@/server/integrationActions";
import React, { useState } from "react";
import { IntBack } from "../icons";
import { useRouter } from "next/navigation";
import AllIntegrationsDisplay from "./all-integration-display";

interface UserByIntegrationsProps {
  data?:
    | IntegrationUsers["allUsers"]
    | IntegrationUsers["missingIntegrationUsers"];
  selectedPlatform?: string;
  onRemove?: (platform: string) => void;
  cost?: number;
  status?: "error" | "success" | "pending";
}

const SeatsSection: React.FC<UserByIntegrationsProps> = ({
  data,
  selectedPlatform,
  onRemove,
  cost,
  status,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  // Show loader if data is not yet available
  // if (!data?.length) {
  //   return (

  //   );
  // }

  // Find the integration matching the selected platform.
  // const integration = data?.find((item) =>
  //   item?.integrations?.some((i) => i?.platform === selectedPlatform)
  // );

  // // Assuming each user has one integration per platform, extract it.
  // const integrationData = integration?.integrations?.find(
  //   (i) => i?.platform === selectedPlatform
  // );

  return (
    <div className="flex flex-col ">
      {/* {integrationData?.platform && (
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-6">
            <img
              src={integrationData?.image ?? ""}
              alt={integrationData?.platform}
              className="w-28 h-28 object-cover"
            />
            <div className="flex flex-col gap-5">
              
              <div className="flex gap-5">
                <div className="flex gap-2 items-center">
                  <img
                    src="/media/integrations/purse.png"
                    className="w-5 h-5"
                    alt="Amount-logo"
                  />
                  <span className="text-sm font-gilroyMedium">$123/Month</span>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    src="/media/integrations/user.png"
                    className="w-5 h-5"
                    alt="User-logo"
                  />
                  <span className="text-sm font-gilroyMedium">
                    {data?.length} Seats
                  </span>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      )} */}
      <div
        className="flex gap-2 items-center mb-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <IntBack />
        <span className="text-gray-500 font-gilroyMedium text-lg">
          Installed
        </span>
      </div>

      <div>
        <div className="rounded-lg border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl px-3 font-gilroySemiBold capitalize">
              {selectedPlatform}
            </h1>
          </div>

          {status === "pending" ? (
            <div>
              <DeviceFlowLoader />
            </div>
          ) : null}

          {data?.length ? (
            <div className="flex flex-col gap-2">
              <Table
                data={data ?? []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                checkboxSelection={{
                  uniqueField: "_id",
                  onSelectionChange: setSelectedIds,
                }}
                columns={[
                  {
                    title: "Name",
                    render: (record: UserByIntegration) => (
                      <div className="w-28 flex items-center gap-2">
                        <img
                          src={
                            record?.image ??
                            "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                          }
                          alt="Device"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="font-gilroySemiBold text-sm text-black text-nowrap">
                          {record?.name ?? "Guest User"}
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
                          allIntegrations={filteredIntegrations}
                          showArrow={false}
                        >
                          <div className="flex items-center gap-2">
                            {firstThree.map((i, index) => (
                              <img
                                key={index}
                                src={i.image ?? ""}
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
                ]}
              />
            </div>
          ) : (
            <div className="p-4 flex items-center justify-center w-full h-[60vh]">
              <img
                src="/media/logo/no_reports_display.svg"
                alt="No Data"
                className="object-contain"
              />
            </div>
          )}
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
};

export { SeatsSection };
