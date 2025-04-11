"use client";
import { CombinedContainer } from "@/components/container/container";

import DeviceFlowLoader from "@/components/deviceFlowLoader";
import { getTeamById, Team } from "@/server/teamActions";
import { useQuery } from "@tanstack/react-query";
import TeamActions from "./_components/team-action";
import TeamHeader from "./_components/team-header";
import TeamMembers from "./_components/team-members";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamPageProps {
  params: { id: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  // const data: Team = await getTeamById(params.id);
  const { data, status } = useQuery<Team>({
    queryKey: ["fetch-team-by-id", params?.id],
    queryFn: () => getTeamById(params?.id),
    refetchOnWindowFocus: false,
  });

  return (
    <CombinedContainer title="Teams">
      <div className="flex flex-col hide-scrollbar gap-4 sticky top-0 z-50 p-3 rounded-lg border border-[#0000001A] bg-white">
        <div className="text-[#7F7F7F] flex w-full text-nowrap text-sm font-gilroySemiBold">
          <TeamActions team={data} />
        </div>
      </div>

      <div className="  p-3 mt-4 border border-gray-200 bg-white  rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          {status === "pending" ? (
            <TeamHeaderSkeleton />
          ) : (
            <TeamHeader
              image={data?.image}
              title={data?.title ?? "-"}
              description={data?.description ?? "-"}
              manager={data.manager}
            />
          )}
        </div>
        <TeamMembers teamData={data} status={status} />
      </div>
    </CombinedContainer>
  );
}

function TeamHeaderSkeleton() {
  return (
    <div className="flex gap-4 pl-3 items-center">
      {/* Team image */}
      <Skeleton className="size-16 rounded-full" />

      {/* Text content */}
      <div className="flex flex-col gap-y-2">
        {/* Title */}
        <Skeleton className="h-5 w-40" />

        {/* Reporting manager line */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    </div>
  );
}
