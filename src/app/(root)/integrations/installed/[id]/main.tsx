"use client";

import { ActionBar } from "@/components/action-bar/action-bar";
import { buttonVariants } from "@/components/buttons/Button";
import {
  getUsersOfIntegration,
  IntegrationUsers,
} from "@/server/integrationActions";
import { useQuery } from "@tanstack/react-query";
import { RemoveIntegration } from "../../_components/installed/remove-integration.dialog";
import UserByIntegrations from "../../_components/installed/user-by-integrations";

export const SingleInstalledIntegration = ({
  params,
}: {
  params: { id: string };
}) => {
  const platform = decodeURI(params?.id);

  const { data: integration, status } = useQuery({
    queryKey: ["user-by-integrations", platform],
    queryFn: () => getUsersOfIntegration({ platform: platform }),
  });

  let integrationData: IntegrationUsers["allUsers"][0]["integrations"][0];

  for (const user of integration?.allUsers || []) {
    const match = user.integrations?.find((i) => i?.platform === platform);
    if (match) {
      integrationData = match;
      break;
    }
  }
  return (
    <>
      <div className="flex flex-col gap-4 hide-scrollbar overflow-hidden">
        <ActionBar showBackBtn>
          <div className="w-full flex justify-end">
            <RemoveIntegration
              id={integrationData?.id}
              platform={integrationData?.platform}
            >
              <span
                className={buttonVariants({
                  variant: "outlineTwo",
                })}
              >
                Remove
              </span>
            </RemoveIntegration>
          </div>
        </ActionBar>

        <UserByIntegrations
          status={status}
          data={integration}
          selectedPlatform={platform}
          integrationData={integrationData}
        />
      </div>
    </>
  );
};
