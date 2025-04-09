"use client";
import { buttonVariants } from "@/components/buttons/Button";
import { getUsersOfIntegration } from "@/server/integrationActions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RedArrowUp } from "./icons";
import SavingsDialog from "./savings-dialog";
import SeatsCard from "./seats-card";

export const TotalSpends = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user-by-integrations", "all-data"],
    queryFn: () => getUsersOfIntegration({}),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="rounded-2xl border p-6 flex justify-between w-full mb-3.5">
      <div className="flex flex-col justify-between pt-2">
        <h3 className="font-gilroySemiBold text-xl">Total Spends</h3>
        {(() => {
          const date = new Date();
          const currentMonthIndex = date.getMonth();
          const currentYear = date.getFullYear();

          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const currentMonth = monthNames[currentMonthIndex];
          const nextMonth = monthNames[(currentMonthIndex + 1) % 12];

          return (
            <p className="font-gilroyMedium text-lg text-[#7F7F7F]">{`${currentMonth} - ${nextMonth} ${currentYear}`}</p>
          );
        })()}

        <div className="flex items-end gap-1.5">
          <p className="flex items-end gap-1 font-gilroyBold text-4xl">
            {`$${data?.totalTeamSubscriptionCost ?? 0}.`}
            <span className="text-3xl">00</span>
          </p>
          {/* <p className="flex mb-0.5 items-end">
            <RedArrowUp />
            <span className="font-gilroyMedium text-[#FF0000]">25%</span>
          </p> */}
        </div>
      </div>
      {/* {JSON.stringify(data)} */}

      <div className="flex justify-end gap-6 flex-none w-[76%]">
        <div className="max-w-52 w-full h-36 rounded-xl flex flex-col justify-between bg-black text-white p-3.5">
          <span className="font-gilroyMedium">Can Save</span>
          <div className="font-gilroyBold text-3xl">
            {`$${data?.unmappedUsersCost ?? 0}`}
            <span className="font-gilroySemiBold text-xl">/Month</span>
          </div>
          <SavingsDialog>
            <span
              className={buttonVariants({
                className: "text-center w-full bg-white text-black h-9",
              })}
            >
              Optimize
            </span>
          </SavingsDialog>
        </div>

        <SeatsCard
          type="total"
          totalSeats={data?.totalSeats ?? 0}
          onClick={() => {
            router.push("/integrations/users?tab=totalseats");
          }}
        />

        <SeatsCard
          type="unmapped"
          onClick={() => {
            router.push("/integrations/users?tab=unmapped");
          }}
          totalSeats={data?.unmappedSeats ?? 0}
        />
        <SeatsCard type="unused" totalSeats={0} onClick={() => {}} />
      </div>
    </div>
  );
};
