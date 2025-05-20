"use client";
import { ActionBar } from "@/components/action-bar/action-bar";
import { Button, buttonVariants } from "@/components/buttons/Button";
import { formatNumber } from "@/lib/utils";
import {
  ConnectedIntegrationsRes,
  getUsersOfIntegration,
} from "@/server/integrationActions";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import ConnectionCard from "./installed-section-connect-card";
import UserByIntegrations from "./user-by-integrations";
import { RemoveIntegration } from "./remove-integration.dialog";

export const InstalledSection = ({
  data,
  status: dataStatus,
}: {
  data: ConnectedIntegrationsRes;
  status?: "error" | "success" | "pending";
}) => {
  // Manage the selected platform via query state so it persists in the URL if needed.
  // @ts-ignore
  // const [selectedPlatform, setSelectedPlatform] = useQueryState<string>(
  //   "platform",
  //   {
  //     defaultValue: "",
  //   }
  // );

  // const {
  //   data: userData,
  //   status,
  //   error,
  // } = useQuery({
  //   queryKey: ["user-by-integrations", selectedPlatform],
  //   queryFn: () => getUsersOfIntegration({ platform: selectedPlatform }),
  //   // staleTime: 1000,
  // });

  // If selectedPlatform is "total", show all data; otherwise, filter by the chosen platform.
  // const filteredUserData = userData?.allUsers?.filter((user: any) =>
  //   user?.integrations?.some(
  //     (integration: any) => integration?.platform === selectedPlatform
  //   )
  // );

  return (
    <>
      {/* {selectedPlatform ? (
        <div className="flex flex-col gap-7">
          <ActionBar>
            <div className="flex justify-between w-full items-center">
              <div
                className="rounded-md cursor-pointer border border-gray-300 hover:border-black p-2.5"
                onClick={() => setSelectedPlatform("")}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                <span className="sr-only">Back Button</span>
              </div>
              <RemoveIntegration
              // id={integrationData?.id ?? ""}
              // platform={integrationData?.platform}
              >
                <span
                  className={buttonVariants({
                    variant: "outlineTwo",
                    // className:
                    // "rounded-md text-sm bg-white h-9 text-black  w-fit font-gilroyMedium border hover:border-black",
                  })}
                >
                  Remove
                </span>
              </RemoveIntegration>
            </div>
          
          </ActionBar>

          <UserByIntegrations
            status={status}
            data={userData}
            selectedPlatform={selectedPlatform}
          />
        </div>
      ) : ( */}
      <div className="flex flex-col gap-7">
        {/* {JSON.stringify(data)} */}
        {data && data?.data?.length > 0 && (
          <>
            <p className="text-lg font-gilroySemiBold pt-3">Connected</p>
            <div className="grid justify-items-center gap-7 grid-cols-3">
              {data?.data?.map((company) => {
                // const seatsCount =
                //   userData?.allUsers?.filter((user: any) =>
                //     user?.integrations?.some(
                //       (integration: any) =>
                //         integration?.platform === company.platform
                //     )
                //   ).length || 0;

                return (
                  <Link
                    key={company?._id}
                    href={`/integrations/installed/${company?.platform}`}
                  >
                    <ConnectionCard
                      amount={formatNumber(company?.totalPrice ?? 0)}
                      src={company?.companyLogo}
                      description={`${company?.description}`}
                      name={company?.platform}
                      seats={company?.userCount}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}
        {data && data?.data?.length === 0 && (
          <div className="flex  font-gilroySemiBold flex-col gap-6 my-5  justify-center items-center ">
            <img
              src="/media/no_data/Integrations.svg"
              alt="No-Integration Logo"
            />
            <Link href={"/integrations/discover"}>
              <button
                className={buttonVariants({
                  variant: "primary",
                  className: "w-full",
                })}
              >
                Discover
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};
