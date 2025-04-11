"use client";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import {
  ConnectedIntegrationsRes,
  getUsersOfIntegration,
  IntegrationType,
} from "@/server/integrationActions";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { IntBack } from "../icons";
import ConnectionCard from "./installed-section-connect-card";
import UserByIntegrations from "./user-by-integrations";
import { buttonVariants } from "@/components/buttons/Button";
import Link from "next/link";

export const InstalledSection = ({
  data,
  status: dataStatus,
}: {
  data: ConnectedIntegrationsRes;
  status?: "error" | "success" | "pending";
}) => {
  // Manage the selected platform via query state so it persists in the URL if needed.
  const [selectedPlatform, setSelectedPlatform] = useQueryState<string>(
    "platform",
    {
      defaultValue: "",
    }
  );

  const {
    data: userData,
    status,
    error,
  } = useQuery({
    queryKey: ["user-by-integrations", selectedPlatform],
    queryFn: () => getUsersOfIntegration({ platform: selectedPlatform }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // If selectedPlatform is "total", show all data; otherwise, filter by the chosen platform.
  // const filteredUserData = userData?.allUsers?.filter((user: any) =>
  //   user?.integrations?.some(
  //     (integration: any) => integration?.platform === selectedPlatform
  //   )
  // );

  return (
    <>
      {selectedPlatform ? (
        <div className="flex flex-col gap-7">
          <div
            className="flex gap-2 items-center cursor-pointer hover:underline w-fit"
            onClick={() => setSelectedPlatform("")}
          >
            <IntBack />
            <span className="text-gray-500 font-gilroyMedium text-base">
              Installed
            </span>
          </div>

          <UserByIntegrations
            status={status}
            data={userData}
            selectedPlatform={selectedPlatform}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          {dataStatus === "pending" ? (
            <div>
              <DeviceFlowLoader />
            </div>
          ) : null}
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
                    <div
                      key={company?._id}
                      onClick={() => setSelectedPlatform(company.platform)}
                      className="cursor-pointer"
                    >
                      <ConnectionCard
                        amount={(company?.totalPrice).toFixed(1)}
                        src={company?.companyLogo}
                        description={`${company?.description?.slice(
                          0,
                          70
                        )}....`}
                        name={company?.platform}
                        seats={company?.userCount}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {data && data.length === 0 && (
            <div className="flex  font-gilroySemiBold flex-col gap-6 my-5  justify-center items-center ">
              <img
                src="/media/no_data/Integrations.svg"
                alt="No-Integration Logo"
              />
              <Link href={"/integration/discover"}>
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
      )}
    </>
  );
};
