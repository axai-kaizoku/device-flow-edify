"use client";
import { buttonVariants } from "@/components/buttons/Button";
import { formatNumber } from "@/lib/utils";
import { ConnectedIntegrationsRes } from "@/server/integrationActions";
import Link from "next/link";
import ConnectionCard from "./installed-section-connect-card";

export const InstalledSection = ({
  data,
  status: dataStatus,
}: {
  data: ConnectedIntegrationsRes;
  status?: "error" | "success" | "pending";
}) => {
  return (
    <>
      <div className="flex flex-col gap-7">
        {/* {JSON.stringify(data)} */}
        {data && data?.data?.length > 0 && (
          <>
            <p className="text-lg font-gilroySemiBold pt-3">Connected</p>
            <div className="grid justify-items-center gap-7 grid-cols-3">
              {data?.data?.map((company) => {
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
