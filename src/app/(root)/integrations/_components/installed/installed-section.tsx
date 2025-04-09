"use client";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import {
  getUsersOfIntegration,
  IntegrationType,
} from "@/server/integrationActions";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { IntBack } from "../icons";
import ConnectionCard from "./installed-section-connect-card";
import UserByIntegrations from "./user-by-integrations";

export const InstalledSection = ({
  data,
  status: dataStatus,
}: {
  data: IntegrationType[];
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
  const filteredUserData = userData?.allUsers?.filter((user: any) =>
    user?.integrations?.some(
      (integration: any) => integration?.platform === selectedPlatform
    )
  );

  return (
    <>
      {selectedPlatform ? (
        <div className="flex flex-col gap-7">
          <div
            className="flex gap-2 items-center cursor-pointer w-fit"
            onClick={() => setSelectedPlatform("")}
          >
            <IntBack />
            <span className="text-gray-500 font-gilroyMedium text-lg">
              Installed
            </span>
          </div>

          <UserByIntegrations
            status={status}
            data={filteredUserData}
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
          {data && data.length > 0 && (
            <>
              <p className="text-lg font-gilroyMedium">Connected</p>
              <div className="grid justify-items-center gap-7 grid-cols-3">
                {data?.map((company) => {
                  const seatsCount =
                    userData?.allUsers?.filter((user: any) =>
                      user?.integrations?.some(
                        (integration: any) =>
                          integration?.platform === company.platform
                      )
                    ).length || 0;

                  return (
                    <div
                      key={company?._id}
                      onClick={() => setSelectedPlatform(company.platform)}
                      className="cursor-pointer"
                    >
                      <ConnectionCard
                        amount={company.price}
                        src={company?.companyLogo}
                        description={`${company?.description.slice(
                          0,
                          150
                        )}....`}
                        name={company?.platform}
                        seats={seatsCount}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {data && data.length === 0 && (
            <p className="text-lg font-gilroyMedium text-center">
              No Integrations connected yet :(
            </p>
          )}
        </div>
      )}
    </>
  );
};
