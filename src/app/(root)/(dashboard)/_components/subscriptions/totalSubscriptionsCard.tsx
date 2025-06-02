"use client";
import { buttonVariants } from "@/components/buttons/Button";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cell, Pie, PieChart } from "recharts";
import { PlatformCount, Subscriptions } from "./interface";
import { Badge } from "@/components/ui/badge";

export default function TotalSubscriptionsCard({
  integrationData,
}: {
  integrationData: Subscriptions;
}) {
  const COLORS = ["#7086FD", "#F7B64F", "#63bc48", "#FF928A"];
  const router = useRouter();

  const data = integrationData?.platformCounts?.map(
    (response: PlatformCount) => {
      return { name: response.platform, value: response.count };
    }
  );

  if (!integrationData || !integrationData?.platformCounts?.length) {
    return (
      <div className="w-[50%]  bg-white  rounded-md border border-black/10 flex flex-col justify-center items-center px-3 py-5 gap-6 lg:p-7">
        <img
          src="/media/dashboard/subscription-empty.webp"
          width={200}
          height={150}
        />
        <div className="w-full">
          <p className="text-black text-lg font-gilroySemiBold text-center">
            No subscriptions yet
          </p>
          <p className="text-gray-400 text-sm font-gilroyMedium text-center">
            You haven’t integrated any app yet
          </p>
        </div>

        <button
          onClick={() => {
            router.push("/integrations/discover");
          }}
          className="bg-black cursor-pointer px-3 py-2 text-sm rounded-[6px] text-white font-gilroyMedium"
        >
          Start Integration
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-[50%]">
      <div className="w-full bg-white rounded-[10px] border border-black/10  flex flex-col justify-start px-3 py-5 lg:p-7">
        <div className="flex gap-2 items-center">
          <span className="text-black font-gilroy text-sm font-gilroySemiBold ">
            Subscriptions
          </span>
          <Badge className="bg-[#F9F5FF] text-[#6941C6] font-gilroySemiBold">
            {integrationData?.platformCounts?.length} Subscriptions
          </Badge>
        </div>

        <div className="flex gap-2">
          <div className="relative w-[150px] h-[150px] flex justify-center items-center">
            <PieChart width={150} height={150}>
              <Pie
                data={data}
                cx={64}
                cy={75}
                innerRadius={55}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth="2.19207"
                  />
                ))}
              </Pie>
            </PieChart>

            {/* Centered Text */}
            <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 text-sm font-gilroyMedium text-black">
              {integrationData?.totalSeats} Seats
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="flex mt-3 flex-col gap-4 w-full items-center">
              {integrationData?.platformCounts?.map(
                (response: PlatformCount, index: number) => {
                  return (
                    <div className="flex gap-2 w-full items-center">
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          background: COLORS[index % COLORS.length],
                          borderRadius: 100,
                        }}
                      />
                      <span className="text-black font-gilroySemiBold text-xs xl:text-sm ">
                        {response?.platform}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex flex-col mt-3 gap-4 w-full items-center">
              {integrationData?.platformCounts?.map(
                (response: PlatformCount) => {
                  return (
                    <div className="flex gap-4 w-full items-center">
                      <span className="text-black font-gilroySemiBold text-xs xl:text-sm  ">
                        ₹{formatNumber(response?.price ?? 0)}/Month
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex flex-col mt-3 gap-4 w-full items-center">
              {integrationData?.platformCounts?.map(
                (response: PlatformCount) => {
                  return (
                    <div className="flex gap-4 w-full items-center">
                      <span className="text-black font-gilroySemiBold text-xs xl:text-sm ">
                        {response?.count} Seats
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[70px] bg-white rounded-[10px] border border-black/10 flex  p-3">
        <div className="relative flex overflow-x-hidden w-full">
          <div className="py-3 animate-marquee whitespace-nowrap w-full flex">
            <div className="flex items-center gap-2 w-full">
              <img
                src="media/integrations-companies/slack-icon.webp "
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Slack
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/drop-box-icon.webp "
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                DropBox
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/figma-icon.webp "
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Figma
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gmail-icon.webp "
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Gmail
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gsuite-icon.webp "
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Gsuite
              </span>
            </div>
          </div>

          <div className="absolute top-0 py-3 animate-marquee2 whitespace-nowrap flex">
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/slack-icon.webp"
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Slack
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/drop-box-icon.webp"
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                DropBox
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/figma-icon.webp"
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Figma
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gmail-icon.webp"
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Gmail
              </span>
            </div>
            <div className="flex items-center gap-2 w-full mx-4 ">
              <img
                src="media/integrations-companies/gsuite-icon.webp"
                className="size-3"
              />
              <span className="text-black font-gilroySemiBold text-xs ">
                Gsuite
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center -mr-2 items-center px-1"
          style={{
            borderRadius: 10,
            background:
              "linear-gradient(270deg, #FFF 74.27%, rgba(255, 255, 255, 0.00) 103.5%)",
            width: 150,
          }}
        >
          <Link
            href="/integrations/installed"
            className={buttonVariants({
              variant: "primary",
              className: "h-8 w-fit rounded text-xs",
            })}
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
