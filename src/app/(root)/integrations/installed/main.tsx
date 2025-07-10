"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getConnectedIntegrations } from "@/server/integrationActions";
import { useQuery } from "@tanstack/react-query";
import { InstalledSection } from "../_components/installed/installed-section";
import { TotalSpends } from "../_components/total-spends";
import { usePathname } from "next/navigation";
import path from "path";

export default function InstalledPage() {
  const pathName = usePathname();

  const { data, status } = useQuery({
    queryKey: ["all-integrations", "installed"],
    queryFn: async () => {
      return await getConnectedIntegrations();
    },
  });

  return (
    <>
      {status === "pending" ? (
        <InstalledSkeleton />
      ) : (
        <>
          <section className="w-full h-[90vh] relative p-5 bg-white rounded-md border overflow-y-auto hide-scrollbar">
            <TotalSpends />

            <InstalledSection data={data} status={status} />
          </section>
        </>
      )}
    </>
  );
}

const InstalledSkeleton = () => (
  <section className="w-full h-fit relative p-5 bg-white rounded-md border overflow-y-auto hide-scrollbar">
    <div className="rounded-md border p-3 flex justify-between w-full mb-3.5">
      <div className="flex flex-col justify-start gap-y-5 pt-2">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="flex justify-end gap-3 flex-none w-[76%]">
        <Skeleton className="max-w-52 w-full h-32" />
        <Skeleton className="max-w-52 w-full h-32" />
        <Skeleton className="max-w-52 w-full h-32" />
        <Skeleton className="max-w-52 w-full h-32" />
      </div>
    </div>

    <div className="flex flex-col gap-5 w-full h-[60vh]">
      <section className="flex justify-between h-full">
        <div className="flex flex-col gap-6 py-4 pl-8 ml-5 h-full overflow-y-auto hide-scrollbar w-full">
          <section className="w-full flex flex-col items-start gap-3">
            <Skeleton className="h-6 w-24" />
            <div className="flex flex-wrap gap-3 xl:grid xl:justify-items-center xl:gap-5 xl:grid-cols-3 w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 max-w-[18rem] w-full" />
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  </section>
);
